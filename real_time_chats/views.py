from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Threads, Messages
from django.contrib.auth.models import User
from django.views import View
from django.db.models import Q
from django.core.exceptions import PermissionDenied
from social.models import UserProfile
from django.core import serializers

# Create your views here.


def ThreadList(request):
    user = User.objects.get(username=request.user.username)
    criterion1 = Q(user1= user)
    criterion2 = Q(user2=user)
    threads = Threads.objects.filter(criterion1 | criterion2)
    msgs = Messages.objects.all()
    return render(request, "real/newChatUi.html", {"threads": threads, "msgs": msgs})


def ThreadView(request):
    if request.is_ajax and request.method == "GET":
        pk =  request.GET.get("pk")
        thread = Threads.objects.get(pk=pk)
        user = User.objects.get(username=request.GET.get("username"))
    
        msgs = Messages.objects.filter(thread=thread)
        msgs_json = []
        for msg in msgs:
            msgs_json.append([msg.author.username, msg.message,  msg.timesince, msg.read, f"{msg.author.profile.picture.url}", msg.pk])

        if thread.user1.username == user.username or thread.user2.username == user.username:
            return JsonResponse({'status': 200, 'msgs': msgs_json})
        else:
            return JsonResponse({'status': 403})

    # user = User.objects.get(userna
    # me=request.user.username)
    # thread = Threads.objects.get(pk=pk)
    # if thread.user1.username == user.username or thread.user2.username == user.username:
    #     messsages = Messages.objects.filter(thread=thread)
    #     if thread.user1 == user:
    #         return render(request, "real/index.html", {"msgs": messsages, "status": UserProfile.objects.get(user=thread.user2).online})
    #     else:
    #         return render(request, "real/index.html", {"msgs": messsages, "status": UserProfile.objects.get(user=thread.user1).online})
    # else:
    #     raise PermissionDenied()




def createMessage(request):
    if request.method == "POST":
        username = request.POST['author']
        msg = request.POST['msg']
        pk = request.POST['pk']

        msg = Messages.objects.create(message = msg, author = User.objects.get(username=username), thread = Threads.objects.get(pk=pk))

        

        return JsonResponse({'status': 200, 'id': msg.id, 'timesince': msg.timesince})
    

def deleteMessage(request):
    pass

def createChat(request):
    threads = Threads.objects.all()
    user1 = request.POST['user1']
    user2 = request.POST['user2']
    user1 = User.objects.get(username=user1)
    user2 = User.objects.get(username=user2)



    try:
        thread = Threads.objects.get(user1= user1, user2 = user2)
        return JsonResponse({"thread": thread.pk})
    except Threads.DoesNotExist:
        try: 
            thread2 = Threads.objects.get(user1 = user2, user2=user1)
            return JsonResponse({"thread": thread.pk})
        except Threads.DoesNotExist:

            Threads.objects.create(user1= user1, user2= user2)
            thread = Threads.objects.get(user1= user1, user2=user2)
            pk = thread.pk
            return JsonResponse({"thread": pk})
        

   



def deleteChat(request):
    pass

def readMsg(request):
    msg = Messages.objects.get(id=request.POST.get('msg'))
    msg.read = True
    msg.save()
    return JsonResponse({'status': 200})

