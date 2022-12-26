import logging

from django.contrib.auth.decorators import login_required
from django.conf import settings
import redis
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework import status

from online_supermarket_api.const import LOGIN_EXCLUDED_PATHS, STAFF_EXCLUSIVE_PATHS

session_storage = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT)
logging.basicConfig(level=logging.DEBUG)

def login_exempt(path, method):
    return any([path.startswith(item[0]) and (method in item[1] or not len(item[1])) for item in LOGIN_EXCLUDED_PATHS.items()])

def staff_satisfied(path, method, is_staff):
    is_staff_path = any([path.startswith(item[0]) and (method in item[1] or not len(item[1])) for item in STAFF_EXCLUSIVE_PATHS.items()])
    if is_staff_path:
        return is_staff
    return True


class LoginRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)

    def process_view(self, request, view_func, view_args, view_kwargs):
        try:
            session_id = request.COOKIES.get('session_id')
            user_id = session_storage.get(session_id)
            user = User.objects.get(id=user_id)
        except:
            user = None

        if user and staff_satisfied(request.path, request.method, user.is_staff):
            return

        if login_exempt(request.path, request.method):
            return

        return HttpResponse('User is not logged in!', status=status.HTTP_401_UNAUTHORIZED)