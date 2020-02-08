from django.views.generic import TemplateView

from shop.models import Product

class HomeTemplateView(TemplateView):
    template_name = 'frontend/index.html'

    def get_context_data(self, **kwargs):
        context = {
            'products': Product.objects.all().order_by('-created_at')
        }
        return super().get_context_data(**context)



class SignUpTemplateView(TemplateView):
    template_name = 'users/signup.html'


class LoginTemplateView(TemplateView):
    template_name = 'users/login.html'
