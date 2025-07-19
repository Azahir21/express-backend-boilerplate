# Express Backend Boilerplate

A **beginner-friendly**, production-ready RESTful API boilerplate using Express.js, TypeScript, Prisma ORM, JWT authentication, and Swagger documentation.

> 🎯 **Perfect for newcomers** who want to learn modern Node.js backend development with best practices built-in!

## 🚀 Features

- **🏗️ Clean Architecture**: Easy-to-understand Repository, Service, Controller pattern with dependency injection
- **🔐 JWT Authentication**: Secure login system with role-based access control (admin/user)
- **📊 Database**: PostgreSQL with Prisma ORM (modern database toolkit)
- **📚 Auto Documentation**: Interactive Swagger/OpenAPI documentation that updates automatically
- **🔒 Built-in Security**: Helmet, CORS, rate limiting, and input validation
- **📝 Smart Logging**: Structured logging with Winston to track what's happening
- **🔧 Type Safety**: Full TypeScript support with strict type checking
- **🐳 Docker Ready**: Production-ready Docker setup with one-command deployment
- **🔄 Hot Reload**: Development server automatically restarts when you make changes
- **✅ Data Validation**: Request validation using Joi to ensure data integrity
- **🧪 Testing Setup**: Jest testing framework ready to use
- **📋 Code Quality**: ESLint, Prettier, and pre-commit hooks for clean code

## 🎓 How This Boilerplate Works

### 📊 Data Flow Explained (For Beginners)

When someone makes a request to your API, here's exactly what happens:

```
1. 📨 HTTP Request → 2. 🛡️ Middleware → 3. 🎯 Controller → 4. 🧠 Service → 5. 💾 Repository → 6. 🗄️ Database → 7. 📤 Response
```

**Step-by-Step Breakdown:**

1. **📨 HTTP Request arrives** (e.g., user wants to login)
2. **🛡️ Middleware checks** authentication, validates data, handles CORS
3. **🎯 Controller receives** the request and extracts user data
4. **🧠 Service processes** business logic (e.g., "is this password correct?")
5. **💾 Repository handles** database operations (e.g., "find user in database")
6. **🗄️ Database returns** the data (user information)
7. **📤 Response flows back** through the same chain to the user

### 🏗️ Architecture Made Simple

```
📁 Your API Structure:
├── 🛣️ routes/          → "Which URLs your API responds to"
├── 🎮 controllers/     → "Handles HTTP requests and responses"
├── 🧠 services/        → "Your business logic lives here"
├── 💾 repositories/    → "Talks to the database"
├── 📋 models/          → "Defines what your data looks like"
├── 🛡️ middleware/      → "Security, validation, and logging"
├── 🔧 utils/           → "Helper functions you'll use everywhere"
└── 🔌 container/       → "Manages dependencies (like a smart organizer)"
```

## 📁 Project Structure

```
express-backend-boilerplate/
├── .env.example                # 🔧 Copy this to .env and add your settings
├── .gitignore                  # 🚫 Tells Git what files to ignore
├── docker-compose.yaml         # 🐳 One-command setup with Docker
├── Dockerfile                  # 🐳 Docker configuration for your app
├── Makefile                   # 🚀 Simple commands (make dev, make test)
├── nodemon.json               # 🔄 Hot reload configuration
├── package.json               # 📦 All your Node.js dependencies
├── tsconfig.json              # 🔧 TypeScript configuration
├── logs/                      # 📝 Application logs are stored here
│   ├── combined.log           # 📄 All logs
│   └── error.log              # ❌ Only error logs
├── prisma/                    # 🗄️ Database setup and migrations
│   ├── schema.prisma          # 📋 Database table definitions
│   └── migrations/            # 🔄 Database version history
└── src/                       # 💻 All your application code
    ├── index.ts               # 🚪 The entry point - starts your API
    ├── config/                # ⚙️ Configuration settings
    │   └── config.ts          # 📝 Environment variables setup
    ├── container/             # 🔌 Dependency injection magic
    │   └── container.ts       # 🗂️ Manages all your app dependencies
    ├── controllers/           # 🎮 Handle HTTP requests
    │   └── auth.controller.ts # 🔐 Login/register request handling
    ├── database/              # 🗄️ Database setup and seeding
    │   ├── database.ts        # 🔗 Prisma client connection
    │   └── seed.ts            # 🌱 Sample data for testing
    ├── middleware/            # 🛡️ Request processing pipeline
    │   ├── auth.middleware.ts      # 🔐 Check if user is logged in
    │   ├── errorHandler.ts         # ❌ Handle errors gracefully
    │   └── validation.middleware.ts # ✅ Validate incoming data
    ├── models/                # 📋 TypeScript type definitions
    │   └── user.model.ts      # 👤 User data structure
    ├── repositories/          # 💾 Database operations
    │   └── user.repository.ts # 👤 User database queries
    ├── routes/                # 🛣️ API endpoint definitions
    │   ├── admin.routes.ts    # 👑 Admin-only endpoints
    │   └── auth.routes.ts     # 🔐 Login/register endpoints
    ├── services/              # 🧠 Business logic
    │   └── auth.service.ts    # 🔐 Authentication business rules
    ├── types/                 # 📝 TypeScript type definitions
    │   └── auth.types.ts      # 🔐 Authentication types
    └── utils/                 # 🔨 Helper functions
        ├── apiError.ts        # ❌ Custom error handling
        ├── asyncHandler.ts    # 🔄 Async error wrapper
        ├── logger.ts          # 📝 Winston logging setup
        └── validation.ts      # ✅ Joi validation schemas
```

## 🚀 Getting Started (Step by Step)

### Prerequisites (What You Need First)

- **Node.js 20+** → [Download here](https://nodejs.org) (JavaScript runtime)
- **PostgreSQL 13+** → [Download here](https://postgresql.org) (Database)
- **Docker & Docker Compose** → [Download here](https://docker.com) (Optional but recommended)

### 🎯 Quick Start (Recommended for Beginners)

**Option 1: Docker (Easiest - Everything is set up for you!)**

```bash
# 1. Get the code
git clone https://github.com/Azahir21/express-backend-boilerplate.git
cd express-backend-boilerplate

# 2. Set up your environment variables
cp .env.example .env
# Edit .env file with your settings (see Configuration section below)

# 3. Start everything with one command!
make dev

# 4. Open your browser and go to:
# http://localhost:8080/swagger (to see your API documentation)
# http://localhost:8080/ping (to test if it works)
```

**Option 2: Local Development (More control)**

```bash
# 1. Get the code
git clone https://github.com/Azahir21/express-backend-boilerplate.git
cd express-backend-boilerplate

# 2. Install all dependencies
npm install

# 3. Set up your environment variables
cp .env.example .env
# Edit .env file with your database details

# 4. Generate Prisma client (connects to database)
npm run prisma:generate

# 5. Set up the database
npm run prisma:migrate  # Creates all tables
npm run db:seed         # Adds sample data (including admin user)

# 6. Start your API server
npm run dev

# 7. Test it works:
# Open http://localhost:8080/swagger in your browser
```

## ⚙️ Configuration (Environment Variables)

Create a `.env` file and customize these settings:

```bash
# 🗄️ Database Settings (where your data is stored)
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# 🔐 Security Settings (keep these secret!)
JWT_SECRET=your-secret-key-change-this-in-production  # Used to encrypt tokens
JWT_EXPIRES_IN=72h                                   # How long login tokens last

# 🚀 Server Settings
SERVER_PORT=8080           # What port your API runs on
SERVER_ENV=development     # development or production

# 👑 Default Admin User (created automatically)
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=admin123
```

### 🗄️ Database Setup Made Simple

This boilerplate uses **Prisma** - think of it as a smart translator between your code and database.

The database structure is defined in `prisma/schema.prisma`:

```prisma
model User {
  id        Int      @id @default(autoincrement())  // Auto-generated unique ID
  username  String   @unique                        // Must be unique
  email     String   @unique                        // Must be unique
  password  String                                  // Encrypted password
  role      String   @default("user")               // "user" or "admin"
  createdAt DateTime @default(now())                // When account was created
  updatedAt DateTime @updatedAt                     // When last updated
  deletedAt DateTime?                               // For soft deletion

  @@map("users")  // Table name in database
}
```

## 📚 API Documentation & Testing

### 🌐 Interactive Documentation

Once your server is running, visit these URLs:

- **Swagger UI**: `http://localhost:8080/swagger`
  - 🎮 Interactive API playground - test endpoints directly!
- **Health Check**: `http://localhost:8080/ping`
  - 🔍 Quick test to see if your server is running

### 🧪 Quick Test - Is It Working?

```bash
# Test the health check
curl http://localhost:8080/ping

# Expected response:
{"status": "OK", "message": "Server is running", "timestamp": "2024-01-15T10:30:00.000Z"}
```

## 🔐 Authentication System (How Login Works)

### 📋 Available Endpoints

| Method | Endpoint                | What It Does            | Need Login? | Need Admin? |
| ------ | ----------------------- | ----------------------- | ----------- | ----------- |
| POST   | `/api/v1/auth/register` | Create new user account | ❌          | ❌          |
| POST   | `/api/v1/auth/login`    | Login and get token     | ❌          | ❌          |
| GET    | `/api/v1/auth/profile`  | Get your user info      | ✅          | ❌          |
| GET    | `/api/v1/admin/test`    | Admin-only test         | ✅          | ✅          |

### 🎯 How to Use the Authentication System

#### 1. 📝 Register a New User

```bash
curl -X POST "http://localhost:8080/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**What happens:**

- Password gets encrypted and stored safely
- User account is created with "user" role
- You get a success message

#### 2. 🔑 Login to Get Your Token

```bash
curl -X POST "http://localhost:8080/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

**Response:**

```json
{
  "status": "OK",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-15T12:00:00.000Z",
      "updatedAt": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

**💡 Save that `token` - you'll need it for protected endpoints!**

#### 3. 🔒 Access Protected Endpoints

```bash
curl -X GET "http://localhost:8080/api/v1/auth/profile" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 👑 Default Admin Account

For testing, there's a pre-created admin account:

- **Username:** `admin`
- **Password:** `admin123`
- **Email:** `admin@example.com`

## 🛠️ Development Commands (Your Toolkit)

### 📜 Available Scripts

```bash
# 🚀 Running the server
npm run dev              # Start development server with hot reload
npm run build           # Build the project for production
npm run start           # Start production server

# 📦 Dependencies & Database
npm install             # Install all dependencies
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Run database migrations
npm run prisma:deploy   # Deploy migrations to production
npm run prisma:studio   # Open Prisma Studio (database GUI)
npm run db:seed         # Seed the database with sample data

# 🧪 Testing & Quality
npm run test            # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
npm run lint            # Run ESLint (check code quality)
npm run lint:fix        # Fix ESLint errors automatically
npm run format          # Format code with Prettier
```

### 🐳 Docker Commands (Simplified)

```bash
make help               # Show all available commands
make dev                # Start in development mode
make prod               # Start in production mode
make build              # Build Docker images
make up                 # Start all services
make down               # Stop all services
make logs               # View application logs
make shell              # Access container shell
make migrate            # Run database migrations
make seed               # Seed the database
make clean              # Clean up Docker resources
```

## 📈 Adding New Features (Step-by-Step Guide)

Let's say you want to add a "Posts" feature where users can create blog posts:

### 1. 🗄️ Update Database Schema

```prisma
// prisma/schema.prisma (add this to your existing schema)
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("posts")
}

// Also update User model to include posts relationship
model User {
  // ...existing fields...
  posts     Post[]   // Add this line
}
```

### 2. 📝 Create TypeScript Types

```typescript
// src/types/post.types.ts
export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface PostResponse {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### 3. 💾 Create Repository (Database Operations)

```typescript
// src/repositories/post.repository.ts
import { PrismaClient } from "@prisma/client";
import { CreatePostRequest, PostResponse } from "../types/post.types";

export class PostRepository {
  constructor(private prisma: PrismaClient) {}

  async createPost(postData: CreatePostRequest, authorId: number): Promise<PostResponse> {
    return await this.prisma.post.create({
      data: {
        title: postData.title,
        content: postData.content,
        authorId: authorId,
      },
    });
  }

  async getUserPosts(authorId: number): Promise<PostResponse[]> {
    return await this.prisma.post.findMany({
      where: { authorId },
      orderBy: { createdAt: "desc" },
    });
  }
}
```

### 4. 🧠 Create Service (Business Logic)

```typescript
// src/services/post.service.ts
import { PostRepository } from "../repositories/post.repository";
import { CreatePostRequest, PostResponse } from "../types/post.types";

export class PostService {
  constructor(private postRepository: PostRepository) {}

  async createPost(postData: CreatePostRequest, authorId: number): Promise<PostResponse> {
    // Add any business logic here (validation, processing, etc.)
    if (!postData.title.trim()) {
      throw new Error("Post title cannot be empty");
    }

    return await this.postRepository.createPost(postData, authorId);
  }

  async getUserPosts(authorId: number): Promise<PostResponse[]> {
    return await this.postRepository.getUserPosts(authorId);
  }
}
```

### 5. 🎮 Create Controller (Handle HTTP Requests)

```typescript
// src/controllers/post.controller.ts
import { Request, Response } from "express";
import { PostService } from "../services/post.service";
import { asyncHandler } from "../utils/asyncHandler";

export class PostController {
  constructor(private postService: PostService) {}

  createPost = asyncHandler(async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const authorId = req.user?.id; // From auth middleware

    const post = await this.postService.createPost({ title, content }, authorId);

    res.status(201).json({
      status: "OK",
      message: "Post created successfully",
      data: post,
    });
  });

  getUserPosts = asyncHandler(async (req: Request, res: Response) => {
    const authorId = req.user?.id; // From auth middleware

    const posts = await this.postService.getUserPosts(authorId);

    res.json({
      status: "OK",
      message: "Posts retrieved successfully",
      data: posts,
    });
  });
}
```

### 6. 🛣️ Create Routes (API Endpoints)

```typescript
// src/routes/post.routes.ts
import { Router } from "express";
import { container } from "../container/container";
import { PostController } from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const postController = container.get(PostController);

// Protected routes (require authentication)
router.post("/", authMiddleware, postController.createPost);
router.get("/my-posts", authMiddleware, postController.getUserPosts);

export { router as postRoutes };
```

### 7. 🔌 Register Routes in Main App

```typescript
// src/index.ts (add this to your existing routes)
import { postRoutes } from "./routes/post.routes";

// Add this with your other routes
app.use("/api/v1/posts", postRoutes);
```

### 8. 🔄 Run Database Migration

```bash
# Generate and apply the migration
npm run prisma:migrate

# Or if using Docker
make migrate
```

Now you have a complete Posts feature! 🎉

## 🧪 Testing Your API

### 🎯 Manual Testing with Swagger

1. **Start your server:** `npm run dev` or `make dev`
2. **Open Swagger:** `http://localhost:8080/swagger`
3. **Try the endpoints:**
   - Click on an endpoint
   - Click "Try it out"
   - Fill in the data
   - Click "Execute"

### 🤖 Automated Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode (re-runs when files change)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

**Example test:**

```typescript
// src/controllers/__tests__/auth.controller.test.ts
describe("Auth Controller", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "testpass123",
    });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("OK");
  });
});
```

## 🚀 Deployment (Going Live)

### 🐳 Docker Deployment (Recommended)

```bash
# 1. Build your application
make build

# 2. Start in production mode
make prod

# 3. Run database migrations
make migrate

# 4. Your API is now live at http://your-server:8080
```

### 🖥️ Manual Deployment

```bash
# 1. Install dependencies
npm install

# 2. Build the application
npm run build

# 3. Run database migrations
npm run prisma:deploy

# 4. Start production server
npm start
```

## 🏗️ Architecture Deep Dive

### 🔄 Request Lifecycle (What Happens When Someone Calls Your API)

```
📨 HTTP Request (e.g., POST /api/v1/auth/login)
     ↓
🛡️ Middleware (CORS, Auth, Validation)
     ↓
🛣️ Route (matches /api/v1/auth/login to login function)
     ↓
🎮 Controller (extracts username/password, calls service)
     ↓
🧠 Service (business logic: "check if password is correct")
     ↓
💾 Repository (database query: "find user by username")
     ↓
🗄️ Database (PostgreSQL returns user data)
     ↓
📤 Response (success/error flows back to user)
```

### 🧩 Component Responsibilities

- **🛣️ Routes** → "Which function handles this URL?"
- **🎮 Controllers** → "Extract data from request, call service, format response"
- **🧠 Services** → "Business rules and logic"
- **💾 Repositories** → "How to get/save data from database"
- **📋 Models** → "TypeScript types and data structures"
- **🛡️ Middleware** → "Security, validation, logging, error handling"
- **🔌 Container** → "Manages dependencies (like a smart organizer)"

### 🔌 Dependency Injection Made Simple

Think of the container as a smart organizer that creates and manages all your app components:

```typescript
// src/container/container.ts
class Container {
  // The container creates everything in the right order
  // and makes sure each component gets what it needs

  private prisma = new PrismaClient();
  private userRepository = new UserRepository(this.prisma);
  private authService = new AuthService(this.userRepository);
  private authController = new AuthController(this.authService);
}
```

## 📋 Best Practices & Tips

### ✅ Code Quality Tips

1. **Use TypeScript everywhere for safety**

   ```typescript
   // Good: Type-safe function
   function getUser(userId: number): Promise<User | null> {
     return userRepository.findById(userId);
   }
   ```

2. **Handle errors gracefully**

   ```typescript
   // Good: Proper error handling
   try {
     const user = await userService.createUser(userData);
     res.json({ status: "OK", data: user });
   } catch (error) {
     logger.error("Failed to create user:", error);
     res.status(500).json({ status: "ERROR", message: "Internal server error" });
   }
   ```

3. **Validate all input data**
   ```typescript
   // Good: Validate before processing
   const schema = Joi.object({
     username: Joi.string().min(3).max(20).required(),
     email: Joi.string().email().required(),
     password: Joi.string().min(6).required(),
   });
   ```

### 🔒 Security Best Practices

1. **Never store plain text passwords** (use bcrypt)
2. **Always validate input data** with Joi schemas
3. **Use environment variables** for secrets
4. **Implement rate limiting** to prevent abuse
5. **Keep JWT secrets secure** and rotate them

### 📈 Performance Tips

1. **Use database indexes** for frequently queried fields
2. **Implement pagination** for large datasets
3. **Cache frequently accessed data**
4. **Use async/await** properly
5. **Monitor your API performance**

## 🆘 Troubleshooting

### ❌ Common Issues & Solutions

**Problem:** `Cannot find module` errors
**Solution:** Run `npm install` and make sure you're in the project directory

**Problem:** Database connection error
**Solution:** Check your `DATABASE_URL` in `.env` file and ensure PostgreSQL is running

**Problem:** JWT token invalid
**Solution:** Check if `JWT_SECRET` in `.env` matches between token creation and validation

**Problem:** Prisma client errors
**Solution:** Run `npm run prisma:generate` to regenerate the client

### 🔍 Debugging Tips

1. **Check the logs:**

   ```bash
   # Local development
   tail -f logs/combined.log

   # Docker
   make logs
   ```

2. **Test individual components:**

   ```bash
   # Test database connection
   npm run prisma:studio

   # Test specific endpoint
   curl -v http://localhost:8080/ping
   ```

3. **Use the debugger:**
   ```typescript
   console.log("Debug info:", { userId, userData });
   // Or use proper debugger
   debugger;
   ```

## 🤝 Contributing

Want to improve this boilerplate? Here's how:

1. **Fork the repository** on GitHub
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Make your changes** and test them
4. **Commit your changes:** `git commit -m 'Add some amazing feature'`
5. **Push to the branch:** `git push origin feature/amazing-feature`
6. **Open a Pull Request** and describe what you've added

### 🐛 Found a Bug?

1. Check if the issue already exists
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment details

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help, please:

1. **Check the API documentation:** `http://localhost:8080/swagger`
2. **Look through existing issues:** [GitHub Issues](https://github.com/Azahir21/express-backend-boilerplate/issues)
3. **Create a new issue** if needed
4. **Join our community discussions**

## 🙏 Acknowledgments

This boilerplate is built on top of amazing open-source projects:

- **[Express.js](https://expressjs.com/)** → Fast, unopinionated web framework for Node.js
- **[Prisma](https://www.prisma.io/)** → Next-generation ORM that makes database access easy
- **[TypeScript](https://www.typescriptlang.org/)** → Typed JavaScript for better development experience
- **[Swagger/OpenAPI](https://swagger.io/)** → Interactive API documentation
- **[JWT](https://jwt.io/)** → Secure JSON Web Tokens for authentication
- **[Jest](https://jestjs.io/)** → Delightful JavaScript testing framework
- **[Winston](https://github.com/winstonjs/winston)** → Universal logging library for Node.js

---

**🎉 Happy coding! If this boilerplate helped you, consider giving it a star ⭐**

**💬 Questions? Open an issue or discussion - we're here to help!**

**Made with ❤️ by the community**
