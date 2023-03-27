from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Event
from base.serializers import EventSerializer
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def eventList(request):

    query = request.query_params.get('keyword')
    print('query:', query)
    if query == None:
        query = ''

    # If name contains any value inside of query then its going to filter and return the product
    events = Event.objects.filter(title__icontains=query) # setting variable for query

    page = request.query_params.get('page')
    paginator = Paginator(events, 10)

    try:
        events = paginator.page(page)
    except PageNotAnInteger:
        events = paginator.page(1)
    except EmptyPage:
        events = paginator.page(paginator.num_pages)
    
    if page == None:
        page = 1
    
    page = int(page)


    # Creating serializer. Serializer -> Wraps our model and turns it into JSON format
    serializer = Event(events, many=True) # many=True -> Serializing many products
    return Response({'events':serializer.data, 'page':page, 'pages':paginator.num_pages})

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createEvent(request):
    user = request.user

    event = Event.objects.create(
        user=user,
        title='Sample Name',
        date = '0',
        event_description='',
        location='',
    )
    
    serializer = Event(event, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateEvent(request, pk):
    data = request.data
    event = Event.objects.get(_id=pk)

    event.name = data['name']
    event.price = data['price']
    event.category = data['category']
    event.countInStock = data['countInStock']
    event.description = data['description']
    
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