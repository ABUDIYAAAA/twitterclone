from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Threads, Messages
from django.contrib.auth.models import User
from django.views import View
from django.db.models import Q
from django.core.exceptions import PermissionDenied

# Create your views here.


def ThreadList(request):
    user = User.objects.get(username=request.user.username)
    criterion1 = Q(user1= user)
    criterion2 = Q(user2=user)
    threads = Threads.objects.filter(criterion1 | criterion2)
    msgs = Messages.objects.all()
    return render(request, "real/threads.html", {"threads": threads, "msgs": msgs})


def ThreadView(request, pk):
    user = User.objects.get(username=request.user.username)
    thread = Threads.objects.get(pk=pk)
    if thread.user1.username == user.username or thread.user2.username == user.username:
        messsages = Messages.objects.filter(thread=thread)
        return render(request, "real/index.html", {"msgs": messsages})
    else:
        raise PermissionDenied()




def createMessage(request):
    if request.method == "POST":
        username = request.POST['author']
        msg = request.POST['msg']
        pk = request.POST['pk']

        msg = Messages.objects.create(message = msg, author = User.objects.get(username=username), thread = Threads.objects.get(pk=pk))

        

        return JsonResponse({'status': 200, 'id': msg.id})
    

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
    msg = Messages.objects.get(id=request.POST['msg'])
    msg.read = True
    msg.save()
    return JsonResponse({'status': 200})