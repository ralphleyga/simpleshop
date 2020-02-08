from django.urls import path

from .views import (
    HomeTemplateView,
    SignUpTemplateView,
    LoginTemplateView
    )

urlpatterns = [
    path('', HomeTemplateView.as_view(), name='home'),
    path('sign-up', SignUpTemplateView.as_view(), name='signup'),
    path('login', LoginTemplateView.as_view(), name='login'),
]
