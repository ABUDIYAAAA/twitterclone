# Generated by Django 3.2 on 2022-08-20 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('real_time_chats', '0003_alter_messages_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='messages',
            name='read',
            field=models.BooleanField(default=False),
        ),
    ]
