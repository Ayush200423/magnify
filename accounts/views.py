from random import randint
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import AccountSerializer, EditAccountFreeSerializer, EditAccountSettingsSerializer, InitializePasswordResetSerializer, OTPSerializer, ResetPasswordSerializer, UserSerializer
from .utils import change_password, prep_reset_password_email, prep_verify_email, verify_user

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'Registered': 'Success'}, status=status.HTTP_200_OK)
    return Response({'Errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# GET METHOD ACCESSIBLE TO CLIENTS --------->
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_account(request):
    serializer = AccountSerializer(request.user, many=False, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)
    
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_account_free(request):
    user = request.user
    data = request.data
    serializer = EditAccountFreeSerializer(instance=user, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_account_settings(request):
    user = request.user
    data = request.data
    serializer = EditAccountSettingsSerializer(instance=user, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def reset_password_email(request):
    serializer = InitializePasswordResetSerializer(data=request.data)

    if serializer.is_valid():
        prep_reset_password_email(data=request.data)
        return Response({'status': 'successful'}, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['POST'])
def commit_password(request):
    serializer = ResetPasswordSerializer(data=request.data)

    if serializer.is_valid():
        change_password(data=request.data)
        return Response({'status': 'successful'}, status=status.HTTP_202_ACCEPTED)
    else:
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_email(request):
    user = request.user
    prep_verify_email(user=user)
    return Response({'status': 'successful'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_otp(request):
    user = request.user
    serializer = OTPSerializer(data=request.data, context={'user': user})
    if serializer.is_valid():
        verify_user(user=user)
        return Response({'status': 'verified'}, status=status.HTTP_202_ACCEPTED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)