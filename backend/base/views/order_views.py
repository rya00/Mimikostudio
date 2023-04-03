import requests
from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.shortcuts import redirect
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer

from rest_framework import status
from datetime import datetime

from django.conf import settings
from base.models import Order
from decouple import config

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    
    orderItems = data['orderItems'] 
 
    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) Create order
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice'],
        )
        
        # (2) Create shipping address
        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country'],
        )

        # (3) Create order items and set order to order items relationship
        for i in orderItems:
            product = Product.objects.get(_id = i['product'])

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url,
            )

            # (4) Update product stock

            product.countInStock -= item.qty
            product.save()


        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateOrderToPaid(request, pk):
#     order = Order.objects.get(_id=pk)

#     order.isPaid = True
#     order.paidAt = datetime.now()
#     order.save()
    
#     return Response('Order was paid.')


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)
    
    if request.method == 'PUT':
        token = request.data.get('token')
        amount = request.data.get('amount')
        
        print(f"Received token: {token}, amount: {amount}")

        if not token or not amount:
            return Response({'error': 'Token and amount are required'})

        headers = {
            'Authorization': f"Key {settings.test_secret_key_8921b846637245d19e633c274f08213a}"
        }
        payload = {
            'token': token,
            'amount': amount,
        }

        try:
            response = requests.post('https://khalti.com/api/v2/payment/verify/', data=payload, headers=headers)
            print(f"Khalti API response status: {response.status_code}")
            if response.status_code == 200:
                response_json = response.json()
                print(f"Khalti API response JSON: {response_json}")
                if response_json.get('idx'):
                    order.isPaid = True
                    order.paidAt = datetime.now()
                    order.transaction_id = response_json.get('idx')
                    order.save()
                    return Response({'message': 'Order was paid.'})
                else:
                    return Response({'error': 'Payment verification failed'})
            else:
                return Response({'error': 'Khalti API request failed'})
        except Exception as e:
            return Response({'error': str(e)})

    return Response({'error': 'Invalid request method'})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)
    
    if request.method == 'PUT':
        token = request.data.get('token')
        amount = request.data.get('amount')

        if not token or not amount:
            return Response({'error': 'Token and amount are required'})

        headers = {
            'Authorization': f"Key {settings.test_secret_key_8921b846637245d19e633c274f08213a}"
        }
        payload = {
            'token': token,
            'amount': amount,
        }

        try:
            response = requests.post('https://khalti.com/api/v2/payment/verify/', data=payload, headers=headers)
            if response.status_code == 200:
                response_json = response.json()
                if response_json.get('idx'):
                    order.isPaid = True
                    order.paidAt = datetime.now()
                    order.transaction_id = response_json.get('idx')
                    order.save()
                    return Response({'message': 'Order was paid.'})
                else:
                    return Response({'error': 'Payment verification failed'})
            else:
                return Response({'error': 'Khalti API request failed'})
        except Exception as e:
            return Response({'error': str(e)})

    return Response({'error': 'Invalid request method'})

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()
    
    return Response('Order was delivered.')