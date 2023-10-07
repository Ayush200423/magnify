from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from services.users import update_next_update
from .utils import checkProductAddEligibility, createOrder, delete_redis_key, editCurrentPrice, editOrders, editStagingPrice, get_from_redis, getMostRecentOrder, getProduct, getProducts, getOrders, getProfitStats, createProduct, createExpectedData, deleteProduct, appendOrder, set_redis_cache
from .serializers import CreateProductSerializer, EditProductSerializer, ExpectedDataSerializer, ProductSerializer, OrderSerializer, PricesSerializer, ProductUpdateSerializer, UpdateOrderSerializer
from services.optimizer import Optimizer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['verified'] = user.verified
        token['active'] = (user.plan != None) and (user.update_duration != None)
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
        

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def products(request):
    if request.method == 'GET':
        products = getProducts(user=request.user)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        criteriaSerializer = CreateProductSerializer(data=request.data)
        if criteriaSerializer.is_valid():
            if checkProductAddEligibility(user=request.user):
                product = createProduct(user=request.user, data=request.data)
                createExpectedData(product=product)
                createOrder(product=product)
                serializer = ProductSerializer(product, many=False)
                delete_redis_key(user=request.user)
                return Response(serializer.data)
            else:
                return Response({'status', 'limit reached'}, status=400)
        else:
            return Response(criteriaSerializer.errors, status=400)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def modifyProducts(request, id):
    if request.method == 'PUT':
        criteriaSerializer = EditProductSerializer(data=request.data)
        if criteriaSerializer.is_valid():
            product = getProduct(user=request.user, id=id)
            serializer = ProductUpdateSerializer(instance=product, data=request.data)
            if serializer.is_valid():
                serializer.save()
                editStagingPrice(product=product, staging_price=request.data['staging_price'])
                expected_data = editCurrentPrice(product=product)
                if expected_data:
                    editOrders(product=product)
                    update_next_update(user=request.user)
                delete_redis_key(user=request.user)
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=400)
        else:
            return Response(criteriaSerializer.errors, status=400)
    
    if request.method == 'DELETE':
        product = deleteProduct(user=request.user, id=id)
        serializer = ProductSerializer(product)
        delete_redis_key(user=request.user)
        return Response(serializer.data)


# POST METHOD ACCESSIBLE TO CLIENTS --------->
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def orders(request, id):
    if request.method == 'GET':
        data = getOrders(user=request.user, id=id)
        serializer = OrderSerializer(data, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = UpdateOrderSerializer(data=request.data)
        if serializer.is_valid():
            order = appendOrder(user=request.user, data=request.data, id=id)
            if not order:
                return Response({"Error": "Not using current order data"}, status=400)
            delete_redis_key(user=request.user)
            newSerialized = OrderSerializer(order, many=False)
            return Response(newSerialized.data)
        else:
            return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def statistics(request):
    expected_profit, expected_sold, expected_revenue, previous_profit, previous_sold, previous_revenue, most_profit_product = getProfitStats(user=request.user)
    if previous_profit != 0 and expected_profit != 0:
        return Response({
            "expected_profit": expected_profit,
            "profit_difference": ((expected_profit - previous_profit) / previous_profit) * 100,
            "expected_sold": expected_sold,
            "sold_difference": ((expected_sold - previous_sold) / previous_sold) * 100,
            "expected_revenue": expected_revenue,
            "revenue_difference": ((expected_revenue - previous_revenue) / previous_revenue) * 100,
            "most_profit": most_profit_product
        })
    
    return Response({"Status": "Previous order not in database"}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def pricesActivate(request):
    user = request.user
    optimizer = Optimizer(user=user)
    optimizer.migrate_staging_to_active()
    return Response({"Status": "Successful"}, status=200)


# ACCESSIBLE TO CLIENTS -------------->

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def prices(request):
    user = request.user
    contained_value = get_from_redis(user=user)
    if contained_value:
        response_data = contained_value
    else:
        products = getProducts(user=user)
        response_data = []
        for product in products:
            data = {}
            expected_data = product.expecteddata
            order = getMostRecentOrder(product=product)
            data['product_id'] = product.id
            data['price'] = expected_data.price
            data['orders'] = {
                "price": order.price,
                "quantity": order.quantity
            }
            response_data.append(data)
        
        set_redis_cache(user=user, data=response_data)

    return Response({str(user.id): response_data}, status=200)