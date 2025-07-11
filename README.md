# 🔐 JWT Authentication Practice

This project demonstrates basic JWT (JSON Web Token) authentication in a Node.js backend.  
It includes user registration and login with hashed passwords using `bcrypt`.  
On login, a JWT is generated and sent to the client for secure access.  
Protected routes require a valid JWT in the Authorization header.  
Middleware handles token verification and access control.  
API endpoints are tested using **Thunder Client** in VS Code.  
The project is useful for learning backend authentication.  
Built using Express.js and Node.js.  
Easy to extend with refresh tokens and role-based auth.  
Lightweight and beginner-friendly code structure.

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/jwt-auth-practice.git
cd jwt-auth-practice
npm install
npm start
🧪 API Testing
Open VS Code and launch Thunder Client

Test endpoints:

POST /register

POST /login

GET /protected (add Bearer token in headers)
