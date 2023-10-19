# Travelo-Media-IT, APIs Documentations
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

### Request Body:
```
{
    "name": "Abhishek Kumar",
    "phone": "9310194009",
    "email": "abc123@gmail.com",
    "password": "abc@123"
}
```
### Response Body:
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
## POST/api/v1/user/login
- User login  API
- User will login using registered Email & Password
- HTTP STATUS CODE 200

- ### Request Body:
  ```
  {
    "email":"abc123@gmail.com",
    "password":"abc@123"
  }
  ```

  
  ### Response:
```
{
    "status": true,
    "message": "User logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1Mjc5ZTFlMzljZTEyZTUyYTk5OTAzNSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNjk3MDk1NjA4LCJleHAiOjE2OTcwOTU5MDh9.VWZgaBMmpA4B1kOedtyQTjHe3qlfBSu5zzBn8cW7csQ"
}
```
## POST/api/v1/user/update-user/:user_id
- User will update the personal details

