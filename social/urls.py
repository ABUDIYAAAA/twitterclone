from django.urls import path
from .views import PostListView, PostDetialView, PostEditView, PostDeleteView, CommentDeleteView, ProfileView, ProfileEditView, AddFollower, RemoveFollower, AddLike, RemoveLike, UserSearch, ListFollowers, AddCommentLike, RemoveCommentLike, CommentReplyView, PostNotification, FollowNotification, RemoveNotification, online_true
from . import views
urlpatterns = [
    path('', PostListView.as_view(), name='post_list'),
    path('post/<int:pk>', PostDetialView.as_view(), name='post_detail'),
    path('post/edit/<int:pk>', PostEditView.as_view(), name='post_edit'),
    path('post/delete/<int:pk>', PostDeleteView.as_view(), name='post_delete'),
    path('post/<int:post_pk>/comment/delete/<int:pk>/',
         CommentDeleteView.as_view(), name='comment_delete'),
    path('post/<int:pk>/like', AddLike.as_view(), name='like'),
    path('post/<int:pk>/dislike', RemoveLike.as_view(), name='dislike'),
    path('profile/<int:pk>', ProfileView.as_view(), name='profile'),
    path('profile/edit/<int:pk>', ProfileEditView.as_view(), name='profile_edit'),
    path('profile/<int:pk>/followers/add',
         AddFollower.as_view(), name='add_follower'),
    path('profile/<int:pk>/followers/remove',
         RemoveFollower.as_view(), name='remove_follower'),
    path('search/', UserSearch.as_view(), name='search'),
    path('profile/<int:pk>/followers',
         ListFollowers.as_view(), name='list_followers'),
    path('post/<int:post_pk>/comment/<int:pk>/like',
         AddCommentLike.as_view(), name='comment_like'),
    path('post/<int:post_pk>/comment/<int:pk>/dislike',
         RemoveCommentLike.as_view(), name='comment_dislike'),
    path('post/<int:post_pk>/comment/<int:pk>/reply',
         CommentReplyView.as_view(), name='comment_reply'),
    path('notification/<int:notification_pk>/post/<int:post_pk>',
         PostNotification.as_view(), name='post_notifcation'),
    path('notification/<int:notification_pk>/follow/<int:profile_pk>',
         FollowNotification.as_view(), name='follow_notification'),
    path('notification/delete/<int:notification_pk>',
         RemoveNotification.as_view(), name='notification_remove'),
     path('profile/online/true', views.online_true, name='online'),
     path('profile/online/false', views.online_false, name="offline")

]
