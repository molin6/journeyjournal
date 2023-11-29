from django.shortcuts import render
import requests
from django.shortcuts import render

def list_trips(request):
    response = requests.get('http://127.0.0.1:5000/trips')
    trips = response.json() if response.status_code == 200 else []
    return render(request, 'frontend/list_trips.html', {'trips': trips})

