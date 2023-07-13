from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
import requests
import json

# Remember api.py works just like views.py (shows the content and manages the functionality)
# Creation of Token (with every new user registration a new token will be generated)

# Register API Page


# Register API


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):

        # request_url1 = 'https://emailvalidation.abstractapi.com/v1/?api_key=c914a44cc6744674b1ccbf221cc3f349&email=' + request.data['email']
        # response1 = requests.get(request_url1)
        # result1 = json.loads(response1.content)
        # print(result1)

        request_url = 'https://ipgeolocation.abstractapi.com/v1/?api_key=3896a49ac077493ebc121829f9c2ea87'
        response = requests.get(request_url)
        result = json.loads(response.content)
        # print(result)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


# Login API


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })

# Get User API


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
