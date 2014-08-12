from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import HttpResponse
from models import Favorite


# Create your views here.
def angular(request):
    return render(request, "angular.html")


def home(request):
    return render(request, "index.html")


@csrf_exempt
def add_favorite(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print data
        Favorite.objects.get_or_create(
            title = data['title'],
            poster = data['poster'],
            movieID = data['movieID']
        )
        # return HttpResponse(content_type='application/json')