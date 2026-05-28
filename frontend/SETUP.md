# Digital Library Frontend - React Setup & Guide

## Project Overview

**Digital Library Management System Frontend** is a modern React 19 application with beautiful UI, real-time search, and full CRUD operations. It connects to the Spring Boot backend APIs and provides a professional admin dashboard experience.

---

## Technology Stack

- **Framework**: React 19.2.6
- **Routing**: React Router DOM 7.15.1
- **HTTP Client**: Axios 1.6.2
- **Styling**: Tailwind CSS 3.3.6 + Custom CSS
- **Animations**: Framer Motion 10.16.4
- **Icons**: React Icons 4.12.0
- **Build Tool**: Create React App (React Scripts 5.0.1)
- **Package Manager**: npm

---

## Project Structure

```
frontend/
├── .env.local                       # Environment variables
├── package.json                     # Dependencies
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── App.js                       # Main app with routing
    ├── index.js                     # React entry point
    ├── index.css                    # Global Tailwind + custom styles
    ├── components/                  # Reusable components
    │   ├── Navbar.js               # Navigation bar
    │   ├── Toast.js                # Notifications
    │   ├── Modal.js                # Dialog box
    │   ├── Loader.js               # Loading spinner
    │   ├── BookCard.js             # Book display card
    │   ├── SearchBar.js            # Search input
    │   ├── CategoryFilter.js       # Category dropdown
    ├── pages/                       # Page components
    │   ├── Login.js                # Authentication page
    │   ├── Signup.js               # Registration page
    │   ├── Dashboard.js            # Main dashboard
    │   ├── BookListing.js          # All books view
    │   ├── AddBook.js              # Create book form
    │   └── Search.js               # Search & filter page
    └── services/
        └── api.js                   # API calls & authentication
```

---

## Prerequisites

1. **Node.js 16+** installed
   - Check: `node --version`
   - Download: https://nodejs.org/

2. **npm 8+** installed (comes with Node.js)
   - Check: `npm --version`

3. **Spring Boot Backend** running on `http://localhost:8080`
   - See backend/SETUP.md for instructions

---

## Setup Instructions

### Step 1: Navigate to Frontend Directory

```bash
cd c:\DBS_DBE\Endsem_project\frontend
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install

# This will install:
# - React, React DOM
# - React Router DOM
# - Axios
# - Tailwind CSS, PostCSS, Autoprefixer
# - Framer Motion
# - React Icons
# - React Scripts
```

### Step 3: Start Development Server

```bash
npm start
```

The application will automatically open at: `http://localhost:3000`

You should see:
- Login page if not authenticated
- Dashboard if already logged in

---

## Available Scripts

### Development
```bash
# Start development server (auto-reload on file changes)
npm start

# Runs on http://localhost:3000
```

### Production Build
```bash
# Create optimized production build
npm run build

# Output in: build/ folder
# Ready to deploy
```

### Testing
```bash
# Run tests in watch mode
npm test

# Press 'a' to run all tests
# Press 'q' to quit
```

### Eject Configuration
```bash
# WARNING: This is irreversible!
# Exposes all Create React App configuration
npm run eject
```

---

## Features

### ✅ Authentication
- Signup with validation
- Login with credential checking
- Persistent session (localStorage)
- Demo accounts included

### ✅ Dashboard
- Statistics cards (total, available, borrowed, categories)
- Quick guide for features
- Responsive grid layout

### ✅ Book Management
- View all books in card grid
- Add new books with form
- Edit book details (modal)
- Delete books (with confirmation)
- Track availability status

### ✅ Search & Filter
- Real-time search by title/author/category
- Category filtering
- Instant results update
- Empty state UI

### ✅ UI/UX
- Glassmorphic design
- Smooth animations (Framer Motion)
- Dark theme (cool blues, purples, cyans)
- Fully responsive (mobile, tablet, desktop)
- Toast notifications
- Loading states

---

## Demo Credentials

Pre-configured demo accounts:

```
Email: admin@library.com
Password: password123

Email: john@example.com
Password: john123
```

Or create your own account using Signup page.

---

## Environment Variables

Create `.env.local` file in frontend directory:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:8080
REACT_APP_API_BASE_URL=http://localhost:8080/books
```

---

## API Integration

### Connect to Backend

The frontend automatically connects to:
```
http://localhost:8080/books
```

### Available API Operations

All operations in `src/services/api.js`:

```javascript
// Books
getAllBooks()          // GET /books
getBookById(id)        // GET /books/{id}
addBook(data)          // POST /books
updateBook(id, data)   // PUT /books/{id}
deleteBook(id)         // DELETE /books/{id}

// Authentication
validateLogin(credentials)  // Check credentials in localStorage
registerUser(userData)      // Register new user
logout()                    // Clear authentication
isAuthenticated()           // Check if logged in
getCurrentUser()            // Get user info
```

---

## Tailwind CSS Configuration

### Custom Colors

Defined in `tailwind.config.js`:

```javascript
primary-dark:    '#0f172a'    // Very dark blue
primary-blue:    '#1e3a8a'    // Deep blue
secondary-purple: '#6d28d9'   // Vibrant purple
accent-cyan:     '#06b6d4'    // Bright cyan
light-text:      '#f1f5f9'    // Light text
```

### Using Tailwind in Components

```jsx
// Utility classes
<div className="bg-primary-blue text-light-text rounded-lg p-4">
  Content
</div>

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Items
</div>

// Custom Tailwind config
<div className="glass">  {/* Glassmorphic card */}
  Content
</div>
```

---

## Component Usage Examples

### BookCard Component
```jsx
import BookCard from './components/BookCard';

<BookCard
  book={bookObject}
  isFavorite={false}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onFavorite={handleFavorite}
  onBorrow={handleBorrow}
  onReturn={handleReturn}
/>
```

### Modal Component
```jsx
import Modal from './components/Modal';

<Modal
  isOpen={true}
  onClose={handleClose}
  title="Edit Book"
  size="lg"
>
  Modal content here
</Modal>
```

### Loader Component
```jsx
import Loader from './components/Loader';

<Loader size="md" text="Loading..." />
```

### Toast Component
```jsx
import Toast from './components/Toast';

<Toast
  message="Book added successfully"
  type="success"  // success, error, warning, info
  duration={3000}
  onClose={handleClose}
/>
```

---

## Routing Structure

```
/login      → Login page (public)
/signup     → Signup page (public)
/dashboard  → Dashboard (protected)
/books      → Book listing (protected)
/add-book   → Add book form (protected)
/search     → Search & filter (protected)
/           → Redirects based on auth state
```

Protected routes automatically redirect to `/login` if not authenticated.

---

## Local Storage Usage

### Authentication
```javascript
localStorage.setItem('authToken', token)
localStorage.getItem('authToken')
```

### User Data
```javascript
localStorage.setItem('users', JSON.stringify(users))
JSON.parse(localStorage.getItem('users'))
```

### Favorites
```javascript
localStorage.setItem('favorites', JSON.stringify(favoriteIds))
```

---

## Styling Guide

### Glassmorphic Cards
```jsx
// Use glass class for transparent backdrop effect
<div className="glass p-6 rounded-xl">
  Content
</div>
```

### Buttons
```jsx
// Primary button
<button className="btn-primary py-3 rounded-lg">Save</button>

// Secondary button
<button className="btn-secondary py-3 rounded-lg">Cancel</button>

// Danger button
<button className="btn-danger px-4 py-2 rounded-lg">Delete</button>
```

### Animations
```jsx
// Fade in
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  Content
</motion.div>

// Slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  Content
</motion.div>

// Hover effect
<motion.div whileHover={{ y: -8 }}>
  Content
</motion.div>
```

---

## Troubleshooting

### Error: "Port 3000 already in use"
```bash
# Windows: Find process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux: Kill process
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### Error: "Backend not responding"
**Solution**: Ensure backend is running on `http://localhost:8080`
```bash
# Check if backend is running
curl http://localhost:8080/books

# If fails, start backend:
cd ../backend
mvn spring-boot:run
```

### Error: "CORS error"
**Solution**: Backend CORS is configured with `@CrossOrigin`
- Ensure backend uses: `@CrossOrigin(origins="*")`
- Restart backend if CORS added

### Error: "npm install fails"
**Solution**: Clear npm cache
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Localhost:3000 shows blank page
**Solution**: 
- Check browser console for errors (F12)
- Verify backend is running
- Clear browser cache (Ctrl+Shift+Delete)
- Restart development server (Ctrl+C then `npm start`)

---

## Performance Tips

1. **Lazy Load**: Use React.lazy() for code splitting
2. **Memoization**: Use React.memo() for expensive components
3. **Debounce**: Search uses 300ms debounce
4. **Images**: Optimize images before deployment
5. **Production Build**: Run `npm run build` before deployment

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to GitHub Pages
```bash
# Install gh-pages
npm install gh-pages --save-dev

# Add to package.json:
"homepage": "https://username.github.io/repo",

# Deploy
npm run build
npm run deploy
```

---

## Resources

- React Documentation: https://react.dev
- React Router: https://reactrouter.com
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion/
- Axios: https://axios-http.com/

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Axios CORS error | Ensure backend has `@CrossOrigin` |
| Refresh loses auth | Session persists in localStorage |
| Forms not submitting | Check network tab for API errors |
| Styling not updating | Clear Tailwind cache: `npm run build` |
| Components not rendering | Check React DevTools for props |

---

## Next Steps

- Deploy to production
- Add more features (borrowing, reviews)
- Implement JWT authentication
- Add unit tests
- Setup CI/CD pipeline

---

**Happy Coding! 🚀**
