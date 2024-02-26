
from django.contrib import admin
from django.urls import path
from auapp.views import ulogin, usignup, uhome, ulogout, urnp

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", uhome, name="uhome"),
    path("ulogin", ulogin, name="ulogin"),
    path("usignup", usignup, name="usignup"),
    path("ulogout", ulogout, name="ulogout"),
    path("urnp", urnp, name="urnp"),
]
