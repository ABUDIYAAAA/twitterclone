from django import forms
from .models import Messages


class MessageForm(forms.ModelForm):
    message = forms.CharField(
        label='',
        widget=forms.Textarea(attrs={
            'rows': 1,
            'placeholder': 'Say something!',
            'style': 'border-radius: 10px; width: 75%'
        })
    )

    image = forms.ImageField(label='', required=False)

    class Meta:
        model = Messages
        fields = ['message', 'image']
