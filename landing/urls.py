from django.urls import path
from landing.views import Index
from . import views

urlpatterns = [
    path('', Index.as_view(), name='index'),
    path('login', views.login_social, name='login')

]
