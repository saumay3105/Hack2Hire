
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("task_automation.urls")),
    path("", include("projects.urls")),
    # path("", include("auth.urls")),  # Added from auth-feature branch
    path("auth/", include('djoser.urls')),
    path("auth/", include('djoser.urls.jwt')),
    path("auth/", include('djoser.social.urls')),

]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]