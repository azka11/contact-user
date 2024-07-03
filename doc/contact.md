# Contact API Specification

## Create Contact
Endpoint : POST /api/contacts

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
    "first_name" : "Azka",
    "last_name" : "Ramadhan",
    "email" : "azka@example.com",
    "phone" : "08823456789"
}
```

Response Body (Success) :

```json
{
    "data" : {
        "id" : 1,
        "first_name" : "Azka",
        "last_name" : "Ramadhan",
        "email" : "azka@example.com",
        "phone" : "08823456789"
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "Failed create contact, ..."
}
```

## Get Contact
Endpoint : GET /api/contacts/:id

Request Header :
- X-API-TOKEN : token


Response Body (Success) :

```json
{
    "data": {
        "id" : 1,
        "first_name" : "Azka",
        "last_name" : "Ramadhan",
        "email" : "azka@example.com",
        "phone" : "08823456789"
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "Contact is not found, ..."
}
```

## Update Contact
Endpoint : PUT /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
    "first_name" : "Azka",
    "last_name" : "Ramadhan Asik",
    "email" : "azka@example.com",
    "phone" : "08823456789"
}
```

Response Body (Success) :

```json
{
    "data": {
        "id": 1,
        "first_name" : "Azka",
        "last_name" : "Ramadhan Asik",
        "email" : "azka@example.com",
        "phone" : "08823456789"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Failed to update contact, ..."
}
```

## Remove Contact
Endpoint : DELETE /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data": "Remove Contact Success!"
}
```

Response Body (Failed) :

```json
{
    "errors": "Failed to remove contact"
}
```

## Search Contact
Endpoint : GET /api/contacts

Query Parameter :
- name : string, contact first name or contact last name, optional
- phone : string, contact phone, optional
- email : string, contact email, optional
- page : number, default 1
- size : number, default 10

Response Body (Success) :

```json
{
    "data": [
        {
            "id": 1,
            "first_name" : "Azka",
            "last_name" : "Ramadhan Asik",
            "email" : "azka@example.com",
            "phone" : "08823456789"
        },
        {
            "id": 2,
            "first_name" : "Luca",
            "last_name" : "Asik",
            "email" : "luca@example.com",
            "phone" : "088999999"
        }
    ],
    
    "paging" : {
        "page" : 1,
        "total_page" : 10,
        "size" : 10
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Unauthorized, ..."
}
```