from django.shortcuts import render
import requests


def home(request):
    return render(request, 'frontend/home.html')

def list_trips(request):
    response = requests.get('http://127.0.0.1:5000/trips')
    data = response.json()  # Fetching the data from the API

    return render(request, 'frontend/list_trips.html', {'trips': data})


