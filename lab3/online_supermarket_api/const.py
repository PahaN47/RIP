from enum import Enum


class SellingStatus(Enum):
    PENDING = 'pending'
    PAID = 'paid'
    DELIVERED = 'delivered'
    CANCELED = 'canceled'
