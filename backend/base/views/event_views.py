from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Event
from base.serializers import EventSerializer
from rest_framework import status
import datetime

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def eventList(request):
    query = request.query_params.get('keyword')
    print('query:', query)
    if query == None:
        query = ''

    # If name contains any value inside of query then its going to filter and return the product
    events = Event.objects.filter(title__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(events, 12)

    try:
        events = paginator.page(page)
    except PageNotAnInteger:
        events = paginator.page(1)
    except EmptyPage:
        events = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = EventSerializer(events, many=True)
    return Response({'events':serializer.data, 'page':page, 'pages':paginator.num_pages})

@api_view(['GET'])
def event_detail(request, pk):
    event = Event.objects.get(_id=pk)
    serializer = EventSerializer(event)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createEvent(request):
    user = request.user

    # Get the current date and time
    now = datetime.datetime.now()

    # Format the date and time using strftime() method
    date_time_str = now.strftime("%Y-%m-%d %H:%M:%S")

    event = Event.objects.create(
        user = user,
        title='Sample Name',
        date = date_time_str,
        event_description='',
        location='',
    )
    
    serializer = EventSerializer(event, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateEvent(request, pk):
    data = request.data
    event = Event.objects.get(_id=pk)

    event.title = data['title']
    event.location = data['location']
    event.date = data['date']
    event.event_description = data['event_description']
    
    event.save()
    
    serializer = EventSerializer(event, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteEvent(request, pk):
    event = Event.objects.get(_id=pk)
    event.delete()
    return Response('Event has been deleted.')

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    event_id = data['event_id']
    event = Event.objects.get(_id=event_id)

    event.image = request.FILES.get('image')
    event.save()

    return Response('Image was uploaded.')
