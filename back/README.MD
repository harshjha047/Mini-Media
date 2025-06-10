# Authentication API Documentation

## Base URL
```
/api/auth
```

---

## Endpoints

### `POST /register`
#### Description:
Registers a new user with name, username, email, and password.

#### Request Body:
```json
{
  "name": "string",
  "username": "string",
  "email": "string",
  "password": "string"
}
```
- All fields are **required**.
- Password must be at least 6 characters.

#### Response:
- **201 Created**:
  ```json
  {
    "success": true,
    "user": {
      "_id": "string",
      "name": "string",
      "username": "string",
      "email": "string",
      ...
    }
  }
  ```
- **400 Bad Request**: Missing required fields.
- **409 Conflict**: Email already in use.
- **500 Internal Server Error**: Registration failure.

---

### `GET /login`
#### Description:
Logs in an existing user with email and password. Responds with user data and sets an HTTP-only cookie token.

#### Request Body:
```json
{
  "email": "string",
  "password": "string"
}
```
- Both fields are **required**.

#### Response:
- **200 OK**:
  ```json
  {
    "success": true,
    "user": {
      "_id": "string",
      "name": "string",
      "username": "string",
      "email": "string",
      ...
    }
  }
  ```
- **400 Bad Request**: Missing fields.
- **401 Unauthorized**: Invalid credentials.
- **500 Internal Server Error**: Login failure.

---

### `POST /logout`
#### Description:
Logs out the user by clearing the cookie.

#### Response:
- **200 OK**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```
- **500 Internal Server Error**: Logout failure.

---

## User Schema
```json
{
  "name": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "bio": "string (optional, max 150 characters)",
  "avatar": "string (URL or file name)",
  "followers": ["ObjectId"],
  "following": ["ObjectId"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## Example
### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "username": "johnd",
    "email": "john@example.com",
    "password": "secret123"
  }'
```

### Login
```bash
curl -X GET http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secret123"
  }'
```

### Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout
```
# Post API Documentation

## Base URL
```
/api/posts
```

---

## Endpoints

### `POST /create`
#### Description:
Create a new post with a caption and optional image upload.

#### Headers:
- `Authorization: Bearer <token>`

#### Form Data:
- `caption` (string, required)
- `file` (image, optional)

#### Response:
- **201 Created**:
  ```json
  {
    "success": true,
    "message": "Post created successfully.",
    "post": {
      "_id": "string",
      "caption": "string",
      "image": "string",
      "createdBy": "userId",
      "createdAt": "timestamp",
      ...
    }
  }
  ```
- **400 Bad Request**: Caption missing.
- **404 Not Found**: User not found.
- **500 Internal Server Error**: Server error while creating post.

#### Example:
```bash
curl -X POST http://localhost:3000/api/posts/create \
  -H "Authorization: Bearer <token>" \
  -F "caption=My first post!" \
  -F "file=@/path/to/image.jpg"
```

---

### `POST /:postId/comment`
#### Description:
Add a comment to a specific post.

#### Headers:
- `Authorization: Bearer <token>`

#### Request Body:
```json
{
  "text": "Nice post!"
}
```

#### Response:
- **200 OK**:
  ```json
  {
    "success": true,
    "message": "Comment added successfully.",
    "comments": [
      {
        "user": "userId",
        "text": "Nice post!",
        "createdAt": "timestamp"
      },
      ...
    ]
  }
  ```
- **400 Bad Request**: Missing text field.
- **401 Unauthorized**: Invalid or missing token.
- **404 Not Found**: Post not found.
- **500 Internal Server Error**: Failed to add comment.

#### Example:
```bash
curl -X POST http://localhost:3000/api/posts/1234567890abcdef/comment \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{ "text": "Nice post!" }'
```

---

### `PUT /:postId/like`
#### Description:
Toggle like/unlike status on a post.

#### Headers:
- `Authorization: Bearer <token>`

#### Response:
- **200 OK**:
  ```json
  {
    "success": true,
    "liked": true,
    "likeCount": 5,
    "message": "Post liked"
  }
  ```
  or
  ```json
  {
    "success": true,
    "liked": false,
    "likeCount": 4,
    "message": "Post unliked"
  }
  ```
- **401 Unauthorized**: Invalid or missing token.
- **404 Not Found**: Post not found.
- **500 Internal Server Error**: Something went wrong.

#### Example:
```bash
curl -X PUT http://localhost:3000/api/posts/1234567890abcdef/like \
  -H "Authorization: Bearer <token>"
