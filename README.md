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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0ZXBoXzMwIiwiaWF0IjoxNTUyMzgwMzk1LCJleHAiOjE1NTI0NjY3OTV9.aKCf8zNXcq40A1bRR8Nvh-Qf_EtpTDXc7WC9R_66CeY"
}
```

---

## **REGISTER - USER**

_Method Url:_ `/api/users/register`

_HTTP method:_ **[POST]**

#### Body

| name        | type   | required | description                     |
| ----------- | ------ | -------- | ------------------------------- |
| `firstname` | String | Yes      |                                 |
| `lastname`  | String | Yes      |                                 |
| `username`  | String | Yes      | Must be unique                  |
| `password`  | String | Yes      |                                 |
| `email`     | String | No       | Must be unique                  |
| `phone`     | String | Yes      | Must be unique                  |
| `user_type` | String | Yes      | Must be 'caretaker' or 'mother' |
| `location`  | String | No       |                                 |

_example:_

```
{
          firstname: "Minnie",
          lastname: "Mouse",
          phone: 3245665432,
          user_type: "mother",
          location: "0.328972, 32.574276",
          username: "minnie_2393",
          password: "password",
          email: minnie@email.com,
          price: 100
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
        "lastname": "Mouse",
        "username": "newusername",
        "email": "minnie@email.com",
        "phone": 2223355435,
        "user_type": "mother",
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
        "lastname": "Zboncak",
        "username": "Dayton64",
        "email": "Trace_Reilly50@gmail.com",
        "phone": "1-485-911-3004",
        "user_type": "mother",
        "location": "-24.2511, -39.4241"
    },
    {
        "user_id": 2,
        "firstname": "Lisa",
        "lastname": "Wilkinson",
        "username": "Abe9",
        "email": "Juwan.Altenwerth@hotmail.com",
        "phone": "695.154.7255 x77744",
        "user_type": "mother",
        "location": "31.9658, 98.2388"
    },
    {
        "user_id": 3,
        "firstname": "Rachel",
        "lastname": "Beatty",
        "username": "Claire.OKon81",
        "email": "Anissa_Parker@hotmail.com",
        "phone": "167-347-5242",
        "user_type": "mother",
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
    "lastname": "Beatty",
    "username": "Claire.OKon81",
    "email": "Anissa_Parker@hotmail.com",
    "phone": "167-347-5242",
    "user_type": "mother",
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

| name             | type    | required |
| ---------------- | ------- | -------- |
| `user_id`        | Integer | Yes      |
| `driver_id`      | Integer | Yes      |
| `review_content` | String  | Yes      |
| `rating`         | Integer | Yes      |

_example:_

```
{
	"user_id": 1,
	"driver_id": 2,
	"review_content": "Id est prima erant nobis. Ut odio alia mediocritatem mel.",
	"rating": 3
}
```

#### Response

##### 201 (Created)

```
{
    "message": "Review added successfully.",
    "review": {
        "review_id": 10,
        "review_content": "Id est prima erant nobis. Ut odio alia mediocritatem mel. Cum quis assum id. At mel prima labore, no hendrerit liberavisse vim.",
        "rating": 3,
        "user_id": 1,
        "driver_id": 2,
        "created_at": "2019-03-12 09:17:50"
    }
}
```

---

## **ADD A RIDE**

_Method Url:_ `/api/drivers/create-ride`

_Protected Route_

_HTTP method:_ **[POST]**

#### Body

| name        | type    | required |
| ----------- | ------- | -------- |
| `user_id`   | Integer | Yes      |
| `driver_id` | Integer | Yes      |

_example:_

```
{
	"user_id": 1,
	"driver_id": 2,
}
```

#### Response

##### 201 (Created)

```
{
  "message": "Ride successfully created."
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
