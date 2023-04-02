from django.shortcuts import render
from django.shortcuts import redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

from django.core.mail import send_mail
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator

from django.http import HttpResponse


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def send_confirmation_email(request, user):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    current_site = get_current_site(request)
    domain = current_site.domain
    path = reverse('activate_account', kwargs={'uidb64': uid, 'token': token})
    activation_link = f'http://{domain}{path}'

    subject = 'Account Activation'
    message = f'Hi {user.first_name},\n\nPlease click the link below to activate your account:\n\n{activation_link}'
    from_email = 'mimikostudio@gmail.com' 
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list, fail_silently=False)

# @api_view(['POST'])
# def registerUser(request):
#     data = request.data

#     try:
#         user = User.objects.create(
#             first_name = data['name'],
#             username = data['email'],
#             email = data['email'],
#             password = make_password(data['password'])
#         )

#         user.is_active = False # Set the user's is_active field to False
#         user.save()

#         # Send the confirmation email
#         send_confirmation_email(request, user)

#         serializer = UserSerializerWithToken(user, many=False)
#         return Response(serializer.data)
#     except:
#         message = {'detail': 'User with this email already exists.'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def registerUser(request):
    data = request.data

    user, created = User.objects.get_or_create(
        username=data['email'],
        email=data['email'],
        defaults={
            'first_name': data['name'],
            'password': make_password(data['password']),
        }
    )

    if not created:
        message = {'detail': 'User with this email already exists.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    user.is_active = False  # Set the user's is_active field to False
    user.save()

    # Send the confirmation email
    send_confirmation_email(request, user)

    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)

def activate_account(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        # Replace 'https://your-app-url.com/login' with the actual URL of your app's login page
        return redirect('http://localhost:3000/login')
    else:
        return HttpResponse('Activation link is invalid.')

@api_view(['POST'])
def password_reset(request):
    data = request.data
    email = data.get('email')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'detail': 'User with this email does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    current_site = get_current_site(request)
    domain = current_site.domain
    path = reverse('password_reset_confirm', kwargs={'uidb64': uid, 'token': token})
    reset_link = f'http://{domain}{path}'

    subject = 'Password Reset Request'
    message = f'Hi {user.first_name},\n\nPlease click the link below to reset your password:\n\n{reset_link}'
    from_email = 'mimikostudio@gmail.com'
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list, fail_silently=False)

    return Response({'detail': 'Password reset email sent.'})

# @api_view(['POST'])
# def password_reset_confirm(request, uidb64, token):
#     try:
#         uid = force_str(urlsafe_base64_decode(uidb64))
#         user = User.objects.get(pk=uid)
#     except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#         user = None

#     if user is not None and default_token_generator.check_token(user, token):
#         new_password = request.data.get('password')
#         user.password = make_password(new_password)
#         user.save()
#         return Response({'detail': 'Password has been reset successfully.'})
#     else:
#         return Response({'detail': 'Password reset link is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

def password_reset_confirm(request, uidb64, token):
    # Replace the URL below with the URL of your React app
    react_app_url = 'http://localhost:3000/password-reset-confirm?uidb64=%7Buidb64%7D&token=%7Btoken%7D'
    return redirect(react_app_url)

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