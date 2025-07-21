from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('users.urls')),     # 👈 this line is needed!
    path('notes/', include('notes.urls')),
]
