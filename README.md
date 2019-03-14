## Server is live on:

https://rideforlife.herokuapp.com/

# AUTH ROUTES

## **REGISTER - DRIVER**

_Method Url:_ `/api/drivers/register`

_HTTP method:_ **[POST]**

#### Body

| name           | type    | required | description    |
| -------------- | ------- | -------- | -------------- |
| `firstname`    | String  | Yes      |                |
| `lastname`     | String  | Yes      |                |
| `username`     | String  | Yes      | Must be unique |
| `password`     | String  | Yes      |                |
| `email`        | String  | No       | Must be unique |
| `phone`        | String  | Yes      | Must be unique |
| `vehicle_type` | String  | Yes      |                |
| `location`     | String  | No       |                |
| `price`        | Integer | No       |                |

_example:_

```
{
          firstname: "Steph",
          lastname: "Curry",
          phone: 5543322345,
          vehicle_type: "motorcycle",
          location: "0.328972, 32.574276",
          username: "steph_30",
          password: "password",
          email: email@email.com,
          price: 100
        }
```

#### Response

##### 201 (Created)

> If you successfully register a driver the endpoint will return an HTTP response with a status code `201` and a body as below.

```
{
    "message": "Registration Successful",
    "driver": {
        "driver_id": 1,
        "firstname": "Steph",
        "lastname": "Curry",
        "username": "steph_30",
        "email": "email@email.com",
        "phone": "5543322345",
        "vehicle_type": "motorcycle",
        "location": "0.328972, 32.574276"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRJRUtMOkZPVURGSkwiLCJ0eXBlIjoidXNlciIsImlhdCI6MTU1MjYwMjgyNCwiZXhwIjoxNTUyNjg5MjI0fQ.29ExsUzyuJvcuCGr0OfCWVscKKogbVkLdTFPQ0_g_M8"
}
```

---

## **REGISTER - USER**

_Method Url:_ `/api/users/register`

_HTTP method:_ **[POST]**

#### Body

| name        | type   | required | description    |
| ----------- | ------ | -------- | -------------- |
| `firstname` | String | No       |                |
| `phone`     | String | Yes      | Must be unique |
| `location`  | String | No       |                |

_example:_

```
{
          firstname: "Minnie",
          phone: "3245665432",
          location: "0.328972, 32.574276",
        }
```

#### Response

##### 201 (Created)

> If you successfully register a user the endpoint will return an HTTP response with a status code `201` and a body as below.

```
{
    "message": "Registration Successful",
    "user": {
        "user_id": 8,
        "firstname": "Minnie",
        "phone": 2223355435,
        "location": "54.5468, 45.5644"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld3VzZXJuYW1lIiwidHlwZSI6Im1vdGhlciIsImlhdCI6MTU1MjM4MDc4NiwiZXhwIjoxNTUyNDY3MTg2fQ.ejsVbLjfPvuW-rJ70RyhDPyGu4GbLY8gFSwXRUXoubU"
}
```

---

## **LOGIN**

_Drivers Method Url:_ `/api/drivers/login`  
_Users Method Url:_ `/api/users/login`

_HTTP method:_ **[POST]**

#### Body

| name             | type   | required | description                                                           |
| ---------------- | ------ | -------- | --------------------------------------------------------------------- |
| `userLoginQuery` | String | Yes      | Must match a username, phone number, or email in the database         |
| `password`       | String | Yes      | Must match a password in the database corresponding to above username |

_example:_

```
{
  userLoginQuery: "steph_30",
  password: "password"
}
```

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "message": "Steph logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMCwidXNlcm5hbWUiOiJzdGVwaF8zMCIsInR5cGUiOiJkcml2ZXIiLCJpYXQiOjE1NTI0MjE0ODUsImV4cCI6MTU1MjUwNzg4NX0.CDUFFKWBJfYSUIckaVhwJh1jUV26tGBQXRWaZwly-Ic"
}
```

---

# USERS ROUTES

## **GET USERS**

_Method Url:_ `/api/users`

_HTTP method:_ **[GET]**

#### Response

##### 200 (OK)

```
[
    {
        "user_id": 1,
        "firstname": "Tracy",
        "phone": "1-485-911-3004",
        "location": "-24.2511, -39.4241"
    },
    {
        "user_id": 2,
        "firstname": "Lisa",
        "phone": "695.154.7255 x77744",
        "location": "31.9658, 98.2388"
    },
    {
        "user_id": 3,
        "firstname": "Rachel",
        "phone": "167-347-5242",
        "location": "-66.7115, -38.2318"
    }
]
```

---

## **GET USER BY ID**

_Method Url:_ `/api/users/:id`

_HTTP method:_ **[GET]**

#### Response

##### 200 (OK)

```
    {
    "user_id": 3,
    "firstname": "Rachel",
    "phone": "167-347-5242",
    "location": "-66.7115, -38.2318"
}
```

---

## **UPDATE USER**

_Method Url:_ `/api/users/:id`

_Protected Route_ | User Only

_HTTP method:_ **[PUT]**

#### Response

##### 202 (Accepted)

```
{
    "message": "Update successful"
}
```

---

## **DELETE USER**

_Method Url:_ `/api/users/:id`

_Protected Route_ | User Only

_HTTP method:_ **[DELETE]**

#### Response

##### 202 (Accepted)

```
{
    "message": "User account removed successfully"
}
```

---

# DRIVER ROUTES

## **GET DRIVERS**

_Method Url:_ `/api/drivers`

_HTTP method:_ **[GET]**

#### Response

##### 200 (OK)

```
[
    {
        "driver_id": 1,
        "firstname": "Frank",
        "lastname": "Cartwright",
        "username": "Myrtis15",
        "email": "Afton_Steuber55@gmail.com",
        "phone": "064-978-5932 x1406",
        "vehicle_type": "motorcycle",
        "location": "61.9036, 108.5482",
        "price": 200
    },
    {
        "driver_id": 2,
        "firstname": "Mike",
        "lastname": "Windler",
        "username": "Merle.Kuphal4",
        "email": "Jayme.Mayert21@hotmail.com",
        "phone": "319.631.4677 x6196",
        "vehicle_type": "motorcycle",
        "location": "-34.1678, -159.5809",
        "price": 69
    },
    {
        "driver_id": 3,
        "firstname": "Jaunita",
        "lastname": "Barton",
        "username": "Norberto56",
        "email": "Ubaldo_Beer@gmail.com",
        "phone": "516.191.0496",
        "vehicle_type": "motorcycle",
        "location": "-79.9312, 11.2167",
        "price": 66
    },
]
```

---

## **GET DRIVER BY ID**

_Method Url:_ `/api/drivers/:id`

_HTTP method:_ **[GET]**

#### Response

##### 200 (OK)

```
    {
    "driver_id": 1,
    "firstname": "Frank",
    "lastname": "Cartwright",
    "username": "Myrtis15",
    "email": "Afton_Steuber55@gmail.com",
    "phone": "064-978-5932 x1406",
    "vehicle_type": "motorcycle",
    "location": "61.9036, 108.5482",
    "total_rides": 2,
    "reviews": [
        {
            "user_id": 2,
            "review_content": "Id est prima erant nobis. Ut odio alia mediocritatem mel. Cum quis assum id. At mel prima labore, no hendrerit liberavisse vim.",
            "rating": 3
        },
        {
            "user_id": 4,
            "review_content": "Id est prima erant nobis. Ut odio alia mediocritatem mel. Cum quis assum id. At mel prima labore, no hendrerit liberavisse vim.",
            "rating": 5
        }
    ]
}
```

---

## **ADD A DRIVER REVIEW**

_Method Url:_ `/api/drivers/:id/review`

_Protected Route_: User Only

_HTTP method:_ **[POST]**

#### Body

| name             | type    | required                |
| ---------------- | ------- | ----------------------- |
| `user_id`        | Integer | No                      |
| `driver_id`      | Integer | Yes (Added Dynamically) |
| `ride_id`        | Integer | Yes                     |
| `review_content` | String  | No                      |
| `rating`         | Integer | No                      |

_example:_

```
{
	"ride_id": 1,
	"user_id": 1,
	"review_content": "This is a new review",
	"rating": 3

}
```

#### Response

##### 201 (Created)

```
{
    "message": "Review added successfully.",
    "review": {
        "review_id": 16,
        "review_content": "This is a new review",
        "rating": 3,
        "user_id": 1,
        "driver_id": 1,
        "ride_id": 1,
        "created_at": "2019-03-14T08:32:30.885Z"
    }
}
```

---

## **CREATE A RIDE**

_Method Url:_ `/api/drivers/create-ride`

_Protected Route_

_HTTP method:_ **[POST]**

#### Body

| name             | type    | required |
| ---------------- | ------- | -------- |
| `user_id`        | Integer | No       |
| `driver_id`      | Integer | Yes      |
| `user_phone`     | String  | Yes      |
| `first_name`     | String  | No       |
| `start_location` | String  | No       |
| `end_location`   | String  | NO       |

_example:_

```
{
	"user_id": 1,
	"driver_id": 2,
}

or

{
    "user_phone": "4328990987",
    "driver_id": 2
}
```

#### Response

##### 201 (Created)

```
{
    "message": "Ride successfully created.",
    "ride": {
        "ride_id": 10,
        "user_id": 2,
        "driver_id": 1,
        "start_location": null,
        "end_location": null,
        "created_at": "2019-03-14 01:49:26"
    },
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMCwidXNlcm5hbWUiOiJzdGVwaF8zMCIsInR5cGUiOiJkcml2ZXIiLCJpYXQiOjE1NTI0MjE0ODUsImV4cCI6MTU1MjUwNzg4NX0.CDUFFKWBJfYSUIckaVhwJh1jUV26tGBQXRWaZwly-Ic"
}
```

---

## **UPDATE DRIVER**

_Method Url:_ `/api/drivers/:id`

_Protected Route_: Driver Only

_HTTP method:_ **[PUT]**

#### Response

##### 202 (Accepted)

```
{
    message: "Update successful"
}
```

---

## **DELETE DRIVER**

_Method Url:_ `/api/drivers/:id`

_Protected Route_: Driver Only

_HTTP method:_ **[DELETE]**

#### Response

##### 202 (Accepted)

```
{
    "message": "Driver account removed successfully"
}
```

---
