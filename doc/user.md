# User API Specification

## Register User

Endpoint: POST /api/users/register

Request Body:

```json
{
    "username": "azka",
    "password": "rahasia",
    "name" : "Azka Ramadhan"
}
```
Response Body (Success) :

```json
{
    "data": {
        "username": "azka",
        "name": "Azka Ramadhan"
    }
}
```

Response Body (Failed):

```json
{
    "errors": "Username must not blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body:

```json
{
    "username": "azka",
    "password": "rahasia",
}
```
Response Body (Success) :

```json
{
    "data": {
        "username": "azka",
        "name": "Azka Ramadhan",
        "token": "uuid"
    }
}
```

Response Body (Failed):

```json
{
    "errors": "Username or Password worng, ..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data": {
        "username": "azka",
        "name": "Azka Ramadhan",
    }
}
```

Response Body (Failed):

```json
{
    "errors": "Unauthorized, ..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :
- X-API-TOKEN : token

Request Body:

```json
{
    "password": "rahasia",
    "name": "M Azka Ramadhan"
}
```

Response Body (Success) :

```json
{
    "data": {
        "password": "rahasia",
        "name": "M Azka Ramadhan",
    }
}
```

Response Body (Failed):

```json
{
    "errors": "Unauthorized, ..."
}
```

## Logout User
Endpoint : DELETE /api/users/current

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data": "Logout Success!"
}
```

Response Body (Failed):

```json
{
    "errors": "Unauthorized"
}
```
