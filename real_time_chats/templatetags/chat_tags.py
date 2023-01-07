from django import template

register = template.Library()

@register.filter
def in_thread(msgs, thread):
    thread_msgs =  msgs.filter(thread=thread)
    if(thread_msgs):
        return thread_msgs[len(thread_msgs) - 1].message
    else:
        return ""
