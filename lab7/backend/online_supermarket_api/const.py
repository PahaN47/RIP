from enum import Enum


class SellingStatus(Enum):
    PENDING = 'pending'
    PAID = 'paid'
    DELIVERED = 'delivered'
    CANCELED = 'canceled'


LOGIN_EXCLUDED_PATHS = [
    '/product',
    '/auth/login',
    '/auth/create'
]