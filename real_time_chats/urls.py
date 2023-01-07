from django.urls import path
from . import views
from .views import createChat
urlpatterns = [
    path('', views.ThreadList, name="real-chat-threads"),
    path('chat/<int:pk>', views.ThreadView, name="real-chat-list"),
    path('create/msg', views.createMessage, name="create-chat-msg"),
    path('chat/create', views.createChat, name="thread-create"),
    path('msg/read', views.readMsg, name="msg-read"),
]
