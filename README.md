# Travelo-Media-IT
## Tech Stacks: MERN
### Key Points:
- This is an informative website for Travelo Media IT Solutions. 
- Basically, the website will contain all the company's services.
- A section that will have its portfolio.
- A  section for contact us through which service seeker will make contact.
- 

 Routes/URL Endpoint:
 # USER APIs:
 ## POST/api/v1/user/add-user
 - It is a user RTEGISTER API

### Req Body:
```
{
    "name": "Abhishek Kumar",
    "phone": "9310194009",
    "email": "abc123@gmail.com",
    "password": "abc@123"
}
```
### Res Body:
```
{
    "resData": {
        "status": true,
        "message": "User created successfully",
        "data": {
            "name": "Abhishek Kumar",
            "phone": "9310194009",
            "email": "abc123@gmail.com",
            "isAdmin": false,
            "avatar": "https://res.cloudinary.com/travelo/image/upload/v1622133397/avatar/avatar_cugq40.png",
            "_id": "65279e1e39ce12e52a999035",
            "createdAt": "2023-10-12T07:19:58.019Z",
            "updatedAt": "2023-10-12T07:19:58.019Z",
            "__v": 0
        }
    }
}
```

