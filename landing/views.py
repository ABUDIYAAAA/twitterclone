from django.shortcuts import render
from django.views import View

class Index(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'landing/maintainance.html')


def login_social(request):
    return render(request, "landing/login.html")
