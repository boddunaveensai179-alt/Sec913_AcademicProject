# Digital Library Management System - Full Stack

A complete modern full-stack application for managing a digital library. Built with **Spring Boot 3.x** backend and **React 19** frontend with professional UI, real-time search, and full CRUD operations.

---

## 📋 Project Overview

### Digital Library Management System
A first-year university-level project demonstrating:
- ✅ Spring Boot REST API with PostgreSQL
- ✅ Modern React frontend with Tailwind CSS
- ✅ Real-time search and filtering
- ✅ Glassmorphic UI design
- ✅ Complete CRUD operations
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Professional animations with Framer Motion
- ✅ Production-ready code structure

---

## 🏗 Project Structure

```
Endsem_project/
├── backend/                         # Spring Boot Backend
│   ├── pom.xml
│   ├── SETUP.md                    # Backend setup guide
│   └── src/main/
│       ├── java/com/example/library/
│       │   ├── entity/Book.java
│       │   ├── repository/BookRepository.java
│       │   ├── service/BookService.java
│       │   ├── controller/BookController.java
│       │   ├── config/SecurityConfig.java
│       │   └── LibraryApplication.java
│       └── resources/
│           └── application.properties
│
└── frontend/                        # React Frontend
    ├── package.json
    ├── SETUP.md                    # Frontend setup guide
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env.local
    └── src/
        ├── App.js                  # Main app
        ├── index.js                # Entry point
        ├── index.css               # Tailwind + global styles
        ├── services/api.js         # API calls
        ├── components/             # Reusable components
        │   ├── Navbar.js
        │   ├── BookCard.js
        │   ├── Modal.js
        │   ├── Toast.js
        │   └── ... (more components)
        └── pages/                  # Page components
            ├── Login.js
            ├── Signup.js
            ├── Dashboard.js
            ├── BookListing.js
            ├── AddBook.js
            └── Search.js
```

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- **Java 17+**: https://adoptopenjdk.net/
- **Node.js 16+**: https://nodejs.org/
- **Maven 3.6+**: https://maven.apache.org/
- **PostgreSQL 12+**: https://www.postgresql.org/

### 1. Backend Setup

```bash
# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE digital_library;"

# Navigate to backend
cd backend

# Build project
mvn clean compile

# Run backend (starts on port 8080)
mvn spring-boot:run
```

**Check**: Open http://localhost:8080/books in browser → Should return `[]`

### 2. Frontend Setup

```bash
# In new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server (starts on port 3000)
npm start
```

**Check**: Browser opens http://localhost:3000 → Login page loads

### 3. Test the Application

1. **Login**:
   - Email: `admin@library.com`
   - Password: `password123`

2. **Add Book**: Go to "Add Book" → Fill form → Click "Add Book"

3. **View Books**: Go to "Books" → See your book in grid

4. **Search**: Go to "Search" → Type book title

---

## 📚 API Documentation

### Base URL
```
http://localhost:8080/books
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Get all books |
| GET | `/books/{id}` | Get book by ID |
| POST | `/books` | Create new book |
| PUT | `/books/{id}` | Update book |
| DELETE | `/books/{id}` | Delete book |

### Example: Add Book
```bash
curl -X POST http://localhost:8080/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Java Programming",
    "author": "John Smith",
    "category": "Programming",
    "availableCount": 5
  }'
```

---

## 🎨 Frontend Features

### Authentication
- Signup with validation
- Login with credential checking
- Persistent sessions
- Role-based access control

### Dashboard
- Statistics (total, available, borrowed, categories)
- Quick navigation guide
- Responsive card layout

### Book Management
- View all books in card grid
- Add new books with form validation
- Edit book details via modal
- Delete with confirmation
- Track availability status

### Search & Filter
- Real-time search by title/author
- Category-based filtering
- Instant results
- Empty state UI

### UI/UX
- **Theme**: Dark blue, purple, cyan (glassmorphic)
- **Animations**: Smooth transitions (Framer Motion)
- **Responsive**: Mobile-first design
- **Performance**: Optimized builds
- **Accessibility**: Semantic HTML, ARIA labels

---

## 🔧 Technology Details

### Backend Stack
- **Framework**: Spring Boot 3.1.5
- **Language**: Java 17
- **Database**: PostgreSQL
- **ORM**: Hibernate (Spring Data JPA)
- **Build**: Maven
- **API**: REST with JSON

### Frontend Stack
- **Framework**: React 19.2.6
- **Routing**: React Router DOM 7.15.1
- **HTTP**: Axios 1.6.2
- **Styling**: Tailwind CSS 3.3.6
- **Animations**: Framer Motion 10.16.4
- **Icons**: React Icons 4.12.0
- **Build**: Create React App

---

## 📖 Detailed Setup Guides

### Backend Setup
See [backend/SETUP.md](./backend/SETUP.md) for:
- Prerequisites
- Database configuration
- Building & running
- API testing with cURL/Postman
- Troubleshooting

### Frontend Setup
See [frontend/SETUP.md](./frontend/SETUP.md) for:
- Dependencies installation
- Development server
- Component usage
- Styling customization
- Deployment

---

## 🔄 Workflow

### Development Workflow
1. **Backend**: Modify Java files → Maven auto-compiles → Restart if needed
2. **Frontend**: Modify React files → Auto-reloads on save
3. **Database**: Changes auto-migrate via Hibernate DDL-update

### Testing Workflow
1. Start backend: `mvn spring-boot:run`
2. Start frontend: `npm start`
3. Open http://localhost:3000
4. Test features manually
5. Check browser console (F12) for errors

### Production Workflow
1. Backend: `mvn clean package` → `java -jar target/library-1.0.0.jar`
2. Frontend: `npm run build` → Deploy `build/` folder

---

## 🐛 Troubleshooting

### Common Issues

**Backend won't start**
```bash
# Issue: PostgreSQL not running
# Fix: Start PostgreSQL service
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start

# Issue: Port 8080 in use
# Fix: Kill process or use different port
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Frontend won't connect to backend**
```bash
# Issue: CORS error
# Fix: Ensure @CrossOrigin in controller (already configured)

# Issue: Backend not running
# Fix: Start backend first
mvn spring-boot:run

# Check connection:
curl http://localhost:8080/books
```

**Npm dependencies conflict**
```bash
# Fix: Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

See detailed troubleshooting in:
- [backend/SETUP.md](./backend/SETUP.md#troubleshooting)
- [frontend/SETUP.md](./frontend/SETUP.md#troubleshooting)

---

## 📝 Code Examples

### Backend: Add Book Service
```java
@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    
    public Book addBook(Book book) {
        // Validation
        if (book.getTitle() == null) return null;
        
        // Save to database
        return bookRepository.save(book);
    }
}
```

### Frontend: Fetch Books
```javascript
import { getAllBooks } from './services/api';

const [books, setBooks] = useState([]);

useEffect(() => {
  getAllBooks()
    .then(data => setBooks(data))
    .catch(error => console.error(error));
}, []);
```

### Frontend: Use Glassmorphic Component
```jsx
<div className="glass p-6 rounded-xl border border-cyan-500/20">
  <h2 className="text-light-text font-bold">Title</h2>
</div>
```

---

## 🎓 Learning Outcomes

This project demonstrates:

### Java/Spring Boot
- ✅ Entity-based ORM with Hibernate
- ✅ Repository pattern for data access
- ✅ Service layer for business logic
- ✅ REST API design principles
- ✅ Spring Security configuration
- ✅ Dependency injection with @Autowired

### React
- ✅ Component-based architecture
- ✅ State management with hooks
- ✅ Routing with React Router
- ✅ HTTP requests with Axios
- ✅ CSS-in-JS with Tailwind
- ✅ Animations with Framer Motion

### Full Stack
- ✅ Client-server architecture
- ✅ CORS and security
- ✅ Database design
- ✅ API integration
- ✅ Responsive design
- ✅ Error handling

---

## 📦 Deployment

### Backend Deployment (Heroku, AWS, etc.)
```bash
mvn clean package
java -jar target/library-1.0.0.jar
```

### Frontend Deployment (Vercel, Netlify, GitHub Pages)
```bash
npm run build
# Deploy build/ folder to hosting service
```

---

## 🔐 Security Notes

**Current Setup**: For development/university review only

**For Production, Add**:
- JWT authentication
- HTTPS/SSL
- Rate limiting
- Input validation
- SQL injection prevention
- CORS restrictions
- Environment variable secrets

---

## 📚 Resources

### Documentation
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)

### Tutorials
- Spring Boot REST API: https://spring.io/guides/gs/rest-service/
- React Hooks: https://react.dev/reference/react
- Tailwind Components: https://tailwindui.com/

### Tools
- Postman: https://www.postman.com/
- pgAdmin: https://www.pgadmin.org/
- VS Code: https://code.visualstudio.com/

---

## 👨‍💻 Code Quality

### Best Practices Implemented
- ✅ Clean code with comments
- ✅ Proper package structure
- ✅ DRY principle (Don't Repeat Yourself)
- ✅ SOLID principles
- ✅ Error handling
- ✅ Responsive design
- ✅ Performance optimization

---

## 🎯 Project Checklist

- ✅ Spring Boot backend with CRUD APIs
- ✅ PostgreSQL database with auto-migration
- ✅ React frontend with modern UI
- ✅ Real-time search and filtering
- ✅ Glassmorphic design
- ✅ Responsive layout
- ✅ Smooth animations
- ✅ Complete documentation
- ✅ Demo credentials
- ✅ Error handling
- ✅ Production-ready code

---

## 📞 Support

For issues or questions:
1. Check [backend/SETUP.md](./backend/SETUP.md)
2. Check [frontend/SETUP.md](./frontend/SETUP.md)
3. Review error messages and stack traces
4. Check official documentation links above

---

## 📄 License

This project is created for educational purposes.

---

## ✨ Features Showcased

### Backend
- REST API design
- Database design
- ORM (Hibernate)
- Service layer pattern
- Error handling
- CORS configuration

### Frontend
- Modern UI framework
- Responsive design
- State management
- API integration
- Animations
- Form validation

### Full Stack
- Authentication
- CRUD operations
- Real-time search
- Professional UX/UI
- Scalable architecture

---

## 🚀 Ready to Start?

1. **Backend**: Follow [backend/SETUP.md](./backend/SETUP.md)
2. **Frontend**: Follow [frontend/SETUP.md](./frontend/SETUP.md)
3. **Test**: Open http://localhost:3000 and try the app!

---

**Happy Coding! 🎉**

Built with ❤️ for first-year university students.
