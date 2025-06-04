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
