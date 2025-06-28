# auth-backend

This is a simple authentication system built using Node.js, Express, TypeScript, Prisma (MySQL), JWT, and Zod validation.

# HOW TO RUN THIS PROJECT LOCALLY
Follow these Steps

1. Clone the Repository
```bash
git clone https://github.com/Deepak-kumar4/auth-backend.git
cd auth-backend
```
2. Install Dependencies
   
```bash
npm install
```

3. Setup Environment Variable
   Create a `.env` file in the root folder and add:
```env
DATABASE_URL="mysql://root:yourPassword@localhost:3306/authdb"
JWT_SECRET="yourVerySecretKey"

where authdb is the database name created in MySQL
```
example:
DATABASE_URL="mysql://root:xyz12345@localhost:3306/authdb"
JWT_SECRET=supersecretkey123

4. Setup mySQL Database
   Make sure MySQL is installed and running.
   Create a database called `authdb`.
```sql
CREATE DATABASE authdb;
```

5. Run Prism
```bash
npx prisma generate
npx prisma migrate dev --name init
```

6. Start the Development Server
``bash
npm run dev
```
Server will start at: `http://localhost:3000`

Now Test the API with Postman
``
7. Signup Endpoints

```
POST http://localhost:3000/auth/signup
```
**Body (JSON):**
```json
{
  "name": "Deepak",
  "email": "deepak@example.com",
  "password": "secret123"
}
```

8. Login Endpoints
```
POST http://localhost:3000/auth/login
```

**Body (JSON):**
```json
{
  "email": "deepak@example.com",
  "password": "secret123"
}
```

Response will be like this 
**Response:**
```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE"
}
```
9. Get Current User (Protected)
In **Headers**, add:

| Key           | Value                      |
|---------------|----------------------------|
| Authorization | Bearer `your_token_here`   |

---

### ✅ Success Response

```json
{
  "user": {
    "id": 1,
    "name": "Deepak",
    "email": "deepak@example.com"
  }
}
```

---






