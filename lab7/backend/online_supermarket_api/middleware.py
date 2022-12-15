from django.contrib.auth.decorators import login_required
from django.conf import settings
import redis
from django.http import HttpResponse
from rest_framework import status

from online_supermarket_api.const import LOGIN_EXCLUDED_PATHS

session_storage = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT)

def login_exempt(path):
    return any(path.startswith(ex) for ex in LOGIN_EXCLUDED_PATHS)


class LoginRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)

    def process_view(self, request, view_func, view_args, view_kwargs):
        session_id = request.COOKIES.get('session_id')
        if session_id and session_storage.get(session_id):
            return

        if login_exempt(request.path):
            return

        return HttpResponse('User is not logged in!', status=status.HTTP_401_UNAUTHORIZED)