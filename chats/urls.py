from django.urls import path
from . import views
from .views import ChatView, MessageEdit, MessageDelete, MessageCreate

urlpatterns = [
    path('', views.index, name='chats_list'),
    path('userchat/<int:pk>', ChatView.as_view(),  name='chat'),
    path('message/edit/<int:pk>/', MessageEdit.as_view(), name='message_edit'),
    path('message/delet/<int:pk>/', MessageDelete.as_view(), name='message_delete'),
    path('userchat/create/<int:pk>', MessageCreate.as_view(), name= 'chat_create'),
]
