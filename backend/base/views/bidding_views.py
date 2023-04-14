from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import BiddingProduct, Bid
from base.serializers import BiddingProductSerializer, BidSerializer
from rest_framework import status
from datetime import datetime, time

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from decimal import Decimal, InvalidOperation
from django.core.mail import send_mail
import datetime

@api_view(['GET'])
def bidding_product_list(request):

    query = request.query_params.get('keyword')
    print('query:', query)
    if query == None:
        query = ''

    # If name contains any value inside of query then its going to filter and return the product
    bidding_products = BiddingProduct.objects.filter(bidding_name__icontains=query) # setting variable for query

    page = request.query_params.get('page')
    paginator = Paginator(bidding_products, 12)

    try:
        bidding_products = paginator.page(page)
    except PageNotAnInteger:
        bidding_products = paginator.page(1)
    except EmptyPage:
        bidding_products = paginator.page(paginator.num_pages)
    
    if page == None:
        page = 1
    
    page = int(page)


    # Creating serializer. Serializer -> Wraps our model and turns it into JSON format
    serializer = BiddingProductSerializer(bidding_products, many=True) # many=True -> Serializing many products
    return Response({'bidding_products':serializer.data, 'page':page, 'pages':paginator.num_pages})

@api_view(['GET'])
def bidding_product_detail(request, pk):
    bidding_product = BiddingProduct.objects.get(_id=pk)
    serializer = BiddingProductSerializer(bidding_product)
    return Response(serializer.data)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def createProductBid(request, pk):
#     user = request.user
#     bidding_product = BiddingProduct.objects.get(_id=pk)
#     data = request.data

#     if bidding_product.end_time < timezone.now():
#         content = {'detail': 'Bidding has ended for this product.'}
#         return Response(content, status=status.HTTP_400_BAD_REQUEST)
#     if 'amount' not in data:
#         content = {'detail': 'Amount is required.'}
#         return Response(content, status=status.HTTP_400_BAD_REQUEST)
#     amount = data['amount']
#     try:
#         decimal_amount = Decimal(amount)
#     except InvalidOperation:
#         content = {'detail': 'Invalid amount.'}
#         return Response(content, status=status.HTTP_400_BAD_REQUEST)
#     if decimal_amount < bidding_product.minimum_price or decimal_amount <= bidding_product.current_price:
#         content = {'detail': 'Invalid amount.'}
#         return Response(content, status=status.HTTP_400_BAD_REQUEST)
#     bid = Bid.objects.create(bidding_product=bidding_product, bidder=user, amount=decimal_amount)
#     bidding_product.current_price = decimal_amount
#     bidding_product.highest_bidder = user
    
#     # Increment the number of bids on the product by 1
#     bidding_product.numberBids = Bid.objects.filter(bidding_product=bidding_product).count()

#     bidding_product.save()
#     serializer = BidSerializer(bid)
    
#     data = serializer.data

#     return Response(data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductBid(request, pk):
    user = request.user
    bidding_product = BiddingProduct.objects.get(_id=pk)
    data = request.data

    # Set the bidding end time to the end of the bidding date
    # Convert time.max to a timezone-aware time object
    bidding_end_time = timezone.make_aware(datetime.combine(bidding_product.end_time, time.max))

    if bidding_end_time < timezone.now():
        content = {'detail': 'Bidding has ended for this product.'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    if 'amount' not in data:
        content = {'detail': 'Amount is required.'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    amount = data['amount']
    print(f"amount: {amount}")

    # Check if the amount is a valid number
    if not isinstance(amount, (int, float)):
        try:
            amount = float(amount)
        except ValueError:
            content = {'detail': 'Invalid amount.'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # Check if the amount has more than 6 digits
    if len(str(amount).replace('.', '')) > 6:
        content = {'detail': 'Amount should not have more than 6 digits.'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    try:
        decimal_amount = Decimal(amount)
    except InvalidOperation:
        content = {'detail': 'Invalid amount.'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    if decimal_amount < bidding_product.minimum_price or decimal_amount <= bidding_product.current_price:
        content = {'detail': 'Invalid amount.'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    bid = Bid.objects.create(bidding_product=bidding_product, bidder=user, amount=decimal_amount)
    bidding_product.current_price = decimal_amount
    bidding_product.highest_bidder = user
    
    # Increment the number of bids on the product by 1
    bidding_product.numberBids = Bid.objects.filter(bidding_product=bidding_product).count()

    bidding_product.save()
    serializer = BidSerializer(bid)
    
    # Check if the bidding time has ended and send an email to the highest bidder
    if bidding_end_time < timezone.now():
        highest_bid = Bid.objects.filter(bidding_product=bidding_product).order_by('-amount').first()
        if highest_bid:
            highest_bidder = highest_bid.bidder
            send_mail(
                'You won the bidding for {}'.format(bidding_product.bidding_name),
                'Congratulations! You placed the highest bid for {}. The bidding has ended and you have won the item.'.format(bidding_product.bidding_name),
                'mimikostudio@gmail.com',
                [highest_bidder.email],
                fail_silently=False,
            )

    data = serializer.data

    return Response(data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createBidding(request):
    user = request.user

    # Get the current date and time
    now = datetime.datetime.now()

    # Format the date and time using strftime() method
    date_time_str = now.strftime("%Y-%m-%d %H:%M:%S")

    bidding_product = BiddingProduct.objects.create(
        user=user,
        bidding_name='Sample Name',
        minimum_price=0,
        end_time=date_time_str,
        bidding_description=''
    )
    
    serializer = BiddingProductSerializer(bidding_product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_bidding_product(request, pk):
    bidding_product = get_object_or_404(BiddingProduct, _id=pk)
    serializer = BiddingProductSerializer(bidding_product, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_bidding_product(request, pk):
    bidding_product = BiddingProduct.objects.get(_id=pk)
    bidding_product.delete()
    return Response('Item has been deleted.')

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    bidding_product_id = data['bidding_product_id']
    bidding_product = BiddingProduct.objects.get(_id=bidding_product_id)

    bidding_product.image = request.FILES.get('image')
    bidding_product.save()

    return Response('Image was uploaded.')