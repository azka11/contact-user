# Address API Specification

## Create Address
Endpoint : POST /api/contacts/:idContact/addresses

Request Header :
- X-API-TOKEN : token

Request Body : 
```json
{
    "street": "Jalan yuk" ,
    "city": "Kota Kenangan" ,
    "province": "Malang Sekali" ,
    "country": "Indonesia",
    "postal_code": "110022"
}
```

Response Body (Success) : 
```json
{
    "data" : {
        "id" : 1,
        "street": "Jalan yuk" ,
        "city": "Kota Kenangan" ,
        "province": "Malang Sekali" ,
        "country": "Indonesia",
        "postal_code": "110022"
    }
}
```

Response Body (Failed) :
```json
{
    "errors" : "Failed to create address"
}
```

## Get Address
Endpoint : GET /api/contacts/:idContact/addresses/:idAddress

Request Header :
- X-API-TOKEN : token

Response Body (Success) : 
```json
{
    "data" : {
        "id" : 1,
        "street": "Jalan yuk" ,
        "city": "Kota Kenangan" ,
        "province": "Malang Sekali" ,
        "country": "Negara Api",
        "postal_code": "110022"
    }
}
```

Response Body (Failed) :
```json
{
    "errors" : "Address is Not Found"
}
```

## Update Address
Endpoint : PUT /api/contacts/:idContact/addresses/:idAddress

Request Header :
- X-API-TOKEN : token

Request Body : 
```json
{
        "street": "Jalanin aja dulu" ,
        "city": "Kota Kenangan" ,
        "province": "Malang Sekali" ,
        "country": "Negara Api",
        "postal_code": "110022"
}
```

Response Body (Success) : 
```json
{
    "data" : {
        "id": 1,
        "street": "Jalanin aja dulu" ,
        "city": "Kota Kenangan" ,
        "province": "Malang Sekali" ,
        "country": "Negara Api",
        "postal_code": "110022"
    }
}
```

Response Body (Failed) :
```json
{
    "errors" : "Failed Update Address, ..."
}
```

## Remove Address
Endpoint : DELETE /api/contacts/:idContact/addresses/:idAddress

Request Header :
- X-API-TOKEN : token

Response Body (Success) : 
```json
{
    "data" : "Remove Address Suceess!"
}
```

Response Body (Failed) :
```json
{
    "errors" : "Failed to Remove Address"
}
```

## List Address  
Endpoint : GET /api/contacts/:idContact/address

Request Header :
- X-API-TOKEN : token


Response Body (Success) : 
```json
{
    "data" : [
        {
            "id": 1,
            "street": "Jalanin aja dulu" ,
            "city": "Kota Kenangan" ,
            "province": "Malang Sekali" ,
            "country": "Negara Api",
            "postal_code": "110022"
        },
        {
            "id": 2,
            "street": "Jalanin aja dulu" ,
            "city": "Kota Kenangan" ,
            "province": "Malang Sekali" ,
            "country": "Negara Api",
            "postal_code": "110022"
        },
    ]
}
```

Response Body (Failed) :
```json
{
    "errors" : "Contact is not found"
}
```