# Digital Library Backend - Spring Boot Setup & Guide

## Project Overview

**Digital Library Management System Backend** is a beginner-friendly Spring Boot 3.x application that provides RESTful APIs for managing a digital library. It uses PostgreSQL for data persistence and includes complete CRUD operations for book management.

---

## Technology Stack

- **Framework**: Spring Boot 3.1.5
- **Language**: Java 17
- **Build Tool**: Maven
- **Database**: PostgreSQL
- **ORM**: Hibernate (Spring Data JPA)
- **Security**: Spring Security (disabled for development)
- **API**: REST with JSON

---

## Project Structure

```
backend/
├── pom.xml                          # Maven configuration & dependencies
└── src/main/
    ├── java/com/example/library/
    │   ├── entity/
    │   │   └── Book.java           # Book JPA Entity
    │   ├── repository/
    │   │   └── BookRepository.java  # Data access layer
    │   ├── service/
    │   │   └── BookService.java     # Business logic layer
    │   ├── controller/
    │   │   └── BookController.java  # REST API endpoints
    │   ├── config/
    │   │   └── SecurityConfig.java  # Spring Security configuration
    │   └── LibraryApplication.java  # Main entry point
    └── resources/
        └── application.properties    # Database & server configuration
```

---

## Prerequisites

1. **Java 17+** installed
   - Check: `java --version`
   - Download: https://adoptopenjdk.net/

2. **Maven 3.6+** installed
   - Check: `mvn --version`
   - Download: https://maven.apache.org/

3. **PostgreSQL 12+** running on localhost:5432
   - Check: `psql --version`
   - Download: https://www.postgresql.org/

---

## Setup Instructions

### Step 1: Create PostgreSQL Database

Open PostgreSQL command line and run:

```sql
-- Create database
CREATE DATABASE digital_library;

-- Verify creation
\l
```

Or if you prefer through GUI (pgAdmin):
1. Connect to PostgreSQL server
2. Right-click on "Databases" → Create → Database
3. Name: `digital_library`
4. Click Save

### Step 2: Clone/Navigate to Backend Directory

```bash
cd c:\DBS_DBE\Endsem_project\backend
```

### Step 3: Build the Project

```bash
# Clean and compile
mvn clean compile

# Verify build success (should see "BUILD SUCCESS")
```

### Step 4: Run the Application

```bash
# Using Maven
mvn spring-boot:run

# OR package and run JAR
mvn clean package
java -jar target/library-1.0.0.jar
```

You should see output like:
```
Started LibraryApplication in X.XXX seconds (process running with PID XXXXX)
Tomcat started on port(s): 8080
```

---

## Accessing the APIs

The backend will be available at: `http://localhost:8080`

### Base URL for Books API
```
http://localhost:8080/books
```

---

## REST API Endpoints

All endpoints return JSON responses.

### 1. Get All Books
```
GET /books
```
**Response**: Array of all books
```json
[
  {
    "bookId": 1,
    "title": "Java Programming",
    "author": "John Smith",
    "category": "Programming",
    "availableCount": 5
  }
]
```

### 2. Get Book by ID
```
GET /books/{bookId}
```
**Example**: `GET /books/1`
**Response**: Single book object or 404 if not found

### 3. Create New Book
```
POST /books
Content-Type: application/json

{
  "title": "Java Programming",
  "author": "John Smith",
  "category": "Programming",
  "availableCount": 5
}
```
**Response**: Created book with generated ID (HTTP 201)

### 4. Update Book
```
PUT /books/{bookId}
Content-Type: application/json

{
  "title": "Advanced Java",
  "author": "John Smith",
  "category": "Programming",
  "availableCount": 3
}
```
**Response**: Updated book object

### 5. Delete Book
```
DELETE /books/{bookId}
```
**Example**: `DELETE /books/1`
**Response**: Confirmation message (HTTP 200)

---

## Testing with cURL

### Add a Book
```bash
curl -X POST http://localhost:8080/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Data Structures",
    "author": "Jane Doe",
    "category": "DSA",
    "availableCount": 3
  }'
```

### Get All Books
```bash
curl http://localhost:8080/books
```

### Get Specific Book
```bash
curl http://localhost:8080/books/1
```

### Update Book
```bash
curl -X PUT http://localhost:8080/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Advanced Data Structures",
    "author": "Jane Doe",
    "category": "DSA",
    "availableCount": 2
  }'
```

### Delete Book
```bash
curl -X DELETE http://localhost:8080/books/1
```

---

## Testing with Postman

1. Open Postman
2. Create requests for each endpoint above
3. Set method (GET, POST, PUT, DELETE)
4. Set URL (e.g., `http://localhost:8080/books`)
5. For POST/PUT: Set Headers → Content-Type: application/json
6. For POST/PUT: Add raw JSON body
7. Click Send

---

## Database Schema

The `books` table is auto-created by Hibernate with the following schema:

```sql
CREATE TABLE books (
  book_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  available_count INT DEFAULT 1
);
```

---

## Key Files Explained

### Book.java (Entity)
- Represents a book in the database
- Annotations: `@Entity`, `@Table`, `@Id`, `@GeneratedValue`
- Fields: bookId, title, author, category, availableCount

### BookRepository.java
- Extends `JpaRepository<Book, Long>`
- Provides CRUD operations automatically
- No method implementation needed

### BookService.java
- Contains business logic
- Methods: getAllBooks, getBookById, addBook, updateBook, deleteBook
- Validates data before database operations

### BookController.java
- REST API endpoints
- Handles HTTP requests/responses
- Uses `@RestController` and `@RequestMapping("/books")`
- `@CrossOrigin` enabled for frontend communication

### SecurityConfig.java
- Disables CSRF protection (not needed for REST APIs)
- Permits all requests (no authentication required)
- Disables form login page

### application.properties
- Database connection: `jdbc:postgresql://localhost:5432/digital_library`
- Credentials: postgres/postgres
- JPA: `hibernate.ddl-auto=update` (auto-creates tables)
- Server: `port=8080`

---

## Troubleshooting

### Error: "Connection refused" on port 5432
**Solution**: PostgreSQL is not running
```bash
# Windows
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start

# macOS (Homebrew)
brew services start postgresql

# Linux
sudo service postgresql start
```

### Error: "Unknown database 'digital_library'"
**Solution**: Database not created. Run the SQL command in Prerequisites → Step 1

### Error: "Maven command not found"
**Solution**: Maven not installed or not in PATH
- Install from: https://maven.apache.org/
- Add to PATH environment variable

### Error: "Java command not found"
**Solution**: Java not installed or not in PATH
- Install JDK 17+: https://adoptopenjdk.net/
- Add JAVA_HOME to environment variables

### Error: "Port 8080 already in use"
**Solution**: Another application is using port 8080
```bash
# Kill process on Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Kill process on macOS/Linux
lsof -i :8080
kill -9 <PID>

# Or use different port in application.properties
server.port=8081
```

---

## Development Tips

1. **Auto-Reload**: Spring Boot DevTools is configured. Save files and app reloads automatically
2. **See SQL**: `spring.jpa.show-sql=true` in application.properties prints SQL queries
3. **Debug Mode**: Add `--debug` flag when running: `mvn spring-boot:run --debug`
4. **Logs**: Check console output for error messages and stack traces

---

## Next Steps

- Create a frontend React application (in separate folder)
- Connect frontend to these REST APIs
- Add authentication (JWT)
- Add more complex business logic (borrowing, returning books)
- Add database validation and error handling
- Write unit tests

---

## Resources

- Spring Boot Documentation: https://spring.io/projects/spring-boot
- Spring Data JPA: https://spring.io/projects/spring-data-jpa
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Maven: https://maven.apache.org/
- REST API Best Practices: https://restfulapi.net/

---

## Contact & Support

For any issues or questions, refer to official documentation or community forums.

---

**Happy Coding! 🚀**
