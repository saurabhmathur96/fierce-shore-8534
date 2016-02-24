# News app
## Routes
- /api/login/
- /api/news/
- /api/register

## Demo

### Register a user account

```
curl -X POST http://localhost:3000/api/register --data "username=saurabh123&password=123"
# {
#   "message":"Registration Successful"
# }
```

### Login

```
curl -X POST http://localhost:3000/api/login --data "username=saurabh123&password=123"
# {
#   "message":"login Successful",
#    "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InNh..."
#  }
```

### Post a news item

```
curl -X POST http://localhost:3000/api/news/ -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InNh..." --data "content=hello"
# {
#   "message":"News Item added",
#   "item": {
#     "content":"hello",
#     "username":"saurabh123",
#     "updated_at":"2016-02-24T19:43:34.005Z"
#   }
#  }

```

### List all news items

```
curl http://localhost:3000/api/news/ -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InNh..."
# {
#   "items":[
#     {
#       "_id":"56ce081cdaf7e65c720a0f72",
#       "content":"hello",
#       "username":"saurabh123"
#    }
#   ]
# }
```
