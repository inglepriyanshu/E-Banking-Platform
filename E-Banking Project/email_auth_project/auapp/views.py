from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from random import *
from django.core.mail import send_mail


def urnp(request):
	if request.user.is_authenticated:
		return redirect("uhome")
	else:
		if request.method == "POST":
			un = request.POST.get("un")
			try:
				usr = User.objects.get(username=un)
				pw = ""
				text = "0123456789"
				for i in range(1, 5):
					pw = pw + text[randrange(len(text))]
				print(pw)
				usr = User.objects.get(username=un)
				usr.set_password(pw)
				usr.save()
				subject = "Welcome to Indian Bank"
				text = "Ur new password is" + str(pw)
				from_email = "sai.tester24jan24@gmail.com"
				to_email = [str(un)]
				send_mail(subject, text, from_email, to_email)
				return redirect("ulogin")
			except User.DoesNotExist:
				msg = "Email does not exists"
				return render(request, "urnp.html", {"msg":msg})
		else:
			return render(request, "urnp.html")
def uhome(request):
	if request.user.is_authenticated:
		return render(request, "uhome.html")
	else:
		return redirect("ulogin")

def ulogin(request):
	if request.user.is_authenticated:
		return redirect("uhome")
	else:
		if request.method == "POST":
			un = request.POST.get("un")
			pw = request.POST.get("pw")
			usr = authenticate(username = un, password = pw)
			if usr is None:
				msg = "Login Denied"
				return render(request, "ulogin.html", {"msg":msg})
			else:
				login(request, usr)
				return redirect("uhome")
		else:
			return render(request, "ulogin.html")

def usignup(request):
	if request.user.is_authenticated:
		return redirect("uhome")
	else:
		if request.method == "POST":
			un = request.POST.get("un")
			try:
				usr = User.objects.get(username=un)
				msg = "Email already reg"
				return render(request, "usignup.html", {"msg":msg})
			except User.DoesNotExist:
				pw = ""
				text = "0123456789"
				for i in range(1, 5):
					pw = pw + text[randrange(len(text))]
				print(pw)
				usr = User.objects.create_user(username=un, password=pw)
				usr.save()
				subject = "Welcome to Indian Bank"
				text = "Ur password is" + str(pw)
				from_email = "sai.tester24jan24@gmail.com"
				to_email = [str(un)]
				send_mail(subject, text, from_email, to_email)
				return redirect("ulogin")
		else:
			return render(request, "usignup.html")

def ulogout(request):
	logout(request)
	return redirect("ulogin")		


