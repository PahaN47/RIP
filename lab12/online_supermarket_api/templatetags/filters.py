from django import template
import math

register = template.Library()


@register.filter
def multiply(value, arg):
    result = value * arg
    if math.floor(result) == result:
        return int(result)
    return result


@register.filter
def to_range(value):
    return range(value)
