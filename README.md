# Momo Blog - Full-Stack Blogging Platform

A modern, feature-rich blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates comprehensive full-stack development skills including authentication, RESTful API design, database management, and responsive UI/UX.

![Momo Blog](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Features

### Frontend
- **React 19** with modern hooks and functional components
- **React Router** for client-side routing
- **Responsive Design** - Mobile-first approach with CSS Grid and Flexbox
- **Dark Mode** - Toggle between light and dark themes with persistent preference
- **Context API** for state management (authentication)
- **Axios** for HTTP requests with interceptors

### Backend
- **RESTful API** built with Express.js
- **JWT Authentication** - Secure token-based authentication
- **MongoDB** with Mongoose ODM
- **Password Hashing** using bcrypt
- **Protected Routes** - Middleware-based authorization
- **Error Handling** - Centralized error handling middleware

### Core Functionality
- **User Authentication**
  - Register new accounts with validation
  - Login/Logout functionality
  - JWT token management
  - Protected routes and API endpoints

- **Blog Post Management**
  - Create, Read, Update, Delete (CRUD) operations
  - Rich text content support
  - Image uploads (URL-based)
  - Tags for categorization
  - Draft/Published status
  - Post likes system
  - View count tracking

- **Comments System**
  - Add comments to posts
  - Edit and delete own comments
  - Author attribution with avatars
  - Real-time comment updates

- **Search & Pagination**
  - Full-text search across posts
  - Tag-based filtering
  - Pagination for large datasets
  - Efficient database queries with indexes

- **User Profiles**
  - Customizable user avatars
  - User bio and information
  - View user's posts

## 🛠️ Tech Stack

### Frontend
- React 19.1.0
- React Router DOM 7.13.2
- Axios 1.13.6
- CSS3 (Custom styling with CSS variables)

### Backend
- Node.js
- Express.js 5.2.1
- MongoDB (via Mongoose 9.3.3)
- JWT (jsonwebtoken 9.0.3)
- bcryptjs 3.0.3
- CORS 2.8.6

### Development Tools
- Nodemon (auto-restart server)
- Concurrently (run frontend and backend simultaneously)
- Create React App

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd momo-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/momo-blog
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=development
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**

   Make sure MongoDB is running on your system:
   ```bash
   # macOS (via Homebrew)
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod

   # Windows
   net start MongoDB
   ```

## 🚀 Running the Application

### Development Mode (Recommended)

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- React development server on `http://localhost:3000`

### Production Mode

1. **Build the React app**
   ```bash
   npm run build
   ```

2. **Start the backend server**
   ```bash
   npm run server
   ```

### Run Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm start
```

## 📁 Project Structure

```
momo-blog/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── models/
│   │   ├── User.js            # User model
│   │   ├── Post.js            # Blog post model
│   │   └── Comment.js         # Comment model
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── posts.js           # Post CRUD routes
│   │   └── comments.js        # Comment routes
│   ├── middleware/
│   │   └── auth.js            # Authentication middleware
│   └── server.js              # Express server setup
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Navigation component
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── Home.js            # Home page with post list
│   │   ├── Login.js           # Login page
│   │   ├── Register.js        # Registration page
│   │   ├── CreatePost.js      # Create/Edit post page
│   │   ├── PostDetail.js      # Single post view
│   │   ├── MyPosts.js         # User's posts dashboard
│   │   └── *.css              # Page-specific styles
│   ├── context/
│   │   └── AuthContext.js     # Authentication context
│   ├── utils/
│   │   └── api.js             # Axios configuration
│   ├── App.js                 # Main app component
│   └── index.css              # Global styles
├── public/
├── .env                       # Environment variables (not in git)
├── .env.example               # Example environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Posts
- `GET /api/posts` - Get all posts (with pagination and search)
- `GET /api/posts/:id` - Get single post by ID
- `POST /api/posts` - Create a new post (protected)
- `PUT /api/posts/:id` - Update a post (protected)
- `DELETE /api/posts/:id` - Delete a post (protected)
- `POST /api/posts/:id/like` - Like/Unlike a post (protected)
- `GET /api/posts/user/:userId` - Get posts by user

### Comments
- `GET /api/comments/post/:postId` - Get comments for a post
- `POST /api/comments` - Create a comment (protected)
- `PUT /api/comments/:id` - Update a comment (protected)
- `DELETE /api/comments/:id` - Delete a comment (protected)
- `POST /api/comments/:id/like` - Like/Unlike a comment (protected)

## 🎨 Features Showcase

### Authentication System
- Secure password hashing with bcrypt
- JWT token generation and validation
- Protected routes on both frontend and backend
- Automatic token refresh and error handling

### Advanced Search & Filtering
- MongoDB text indexes for full-text search
- Tag-based filtering
- Pagination with customizable page size
- Optimized database queries

### Responsive Design
- Mobile-first CSS approach
- Breakpoints for tablet and desktop
- Flexible grid layouts
- Touch-friendly UI elements

### Dark Mode
- System preference detection
- Persistent user preference
- Smooth transitions
- CSS variables for theme management

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🚀 Deployment

### Deploying to Production

1. **Environment Setup**
   - Set `NODE_ENV=production`
   - Update `MONGODB_URI` to production database
   - Generate a strong `JWT_SECRET`
   - Update `REACT_APP_API_URL` to production API URL

2. **Build the application**
   ```bash
   npm run build
   ```

3. **Deploy Backend**
   - Platforms: Heroku, DigitalOcean, AWS EC2, Railway
   - Ensure MongoDB is accessible
   - Set environment variables

4. **Deploy Frontend**
   - Platforms: Vercel, Netlify, GitHub Pages
   - Update API URL to point to production backend

### MongoDB Atlas (Recommended)
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in `.env`

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT authentication with expiration
- Protected API routes with middleware
- CORS configuration
- Input validation and sanitization
- XSS protection through React's built-in escaping
- Environment variable management

## 🎯 Future Enhancements

- [ ] Rich text editor (Quill.js or TinyMCE)
- [ ] Image upload to cloud storage (Cloudinary/AWS S3)
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social media integration
- [ ] Post categories
- [ ] Admin dashboard
- [ ] Analytics and insights
- [ ] Markdown support
- [ ] Code syntax highlighting
- [ ] Notifications system
- [ ] Following/Followers system

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Built with ❤️ as a portfolio project to demonstrate full-stack development capabilities.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, email [your-email] or create an issue in the repository.

---

**Built for Winter Break 2025** - A comprehensive demonstration of modern full-stack development practices.
