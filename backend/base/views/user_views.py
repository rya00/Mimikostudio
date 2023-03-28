from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

from django.core.mail import EmailMessage

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# def send_verification_email(user_email):
#     subject = 'Please verify your email'
#     message = 'Thank you for registering. Please click the link to verify your email.'
#     from_email = 'mimikostudio@gmail.com'
#     recipient_list = [user_email]
#     send_mail(subject, message, from_email, recipient_list, fail_silently=False)

# @api_view(['POST'])
# def registerUser(request):
#     data = request.data

#     try:
#         user = User.objects.create(
#             first_name=data['name'],
#             username=data['email'],
#             email=data['email'],
#             password=make_password(data['password'])
#         )
#         serializer = UserSerializerWithToken(user, many=False)
#         send_mail(
#             'Welcome to Mimikostudio!',
#             'Thank you for registering with us. Please click the link below to verify your account:\nhttp://localhost:3000/verify/' + str(serializer.data['id']) + '/',
#             'mimikostudio@gmail.com',
#             [data['email']],
#             fail_silently=False,
#         )
#         return Response(serializer.data)
#     except:
#         message = {'detail': 'User with this email already exists'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email']
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def registerUser(request):
#     data = request.data

#     try:
#         user = User.objects.create(
#             first_name=data['name'],
#             username=data['email'],
#             email=data['email'],
#             password=make_password(data['password'])
#         )

#         send_verification_email(user.email)

#         serializer = UserSerializerWithToken(user, many=False)
#         return Response(serializer.data)
#     except:
#         message = {'detail': 'User with this email already exists.'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user 
    # Returning back a new token
    serializer = UserSerializerWithToken(user, many=False) 

    data = request.data
    user.first_name = data['name']
    user.username_name = data['email']
    user.email_name = data['email']
    if data['password'] != '':
        user.password = make_password(data['password'])
    
    user.save()

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user 
    serializer = UserSerializer(user, many=False) 
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk) 

    data = request.data
    user.first_name = data['name']
    user.username_name = data['email']
    user.email_name = data['email']
    user.is_staff = data['isAdmin']
    
    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(response, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()

    return Response('User has been deleted')