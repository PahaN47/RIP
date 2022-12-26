from enum import Enum


class SellingStatus(Enum):
    PENDING = 'pending'
    PAID = 'paid'
    DELIVERED = 'delivered'
    CANCELED = 'canceled'


LOGIN_EXCLUDED_PATHS = {
    '/product': ['GET'],
    '/auth/login': ['POST'],
    '/auth/create': ['POST']
}

STAFF_EXCLUSIVE_PATHS = {
    '/selling': ['DELETE'],
    '/product': ['POST', 'DELETE', 'PATCH'],
    '/selling-product': ['POST', 'PATCH', 'DELETE']
}
