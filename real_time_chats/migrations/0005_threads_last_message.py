# Generated by Django 3.2 on 2022-09-10 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('real_time_chats', '0004_messages_read'),
    ]

    operations = [
        migrations.AddField(
            model_name='threads',
            name='last_message',
            field=models.TextField(default=''),
        ),
    ]