package com.example.library.controller;

import com.example.library.entity.Book;
import com.example.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * BookController - REST API Layer
 * 
 * This controller handles HTTP requests and responses for book-related operations.
 * It provides 5 REST endpoints for complete CRUD functionality.
 * 
 * Annotations:
 * @RestController - Combines @Controller + @ResponseBody
 *                   Returns JSON responses automatically
 * @RequestMapping("/books") - Base URL for all endpoints in this controller
 * @CrossOrigin(origins="*") - Allows requests from any origin
 *                             Needed for frontend on different port/domain
 */
@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS
})
public class BookController {

    /**
     * BookService instance injected by Spring
     * @Autowired - Automatically creates and injects the service bean
     */
    @Autowired
    private BookService bookService;

    // ==================== REST API Endpoints ====================

    /**
     * GET /books
     * Retrieve all books from the library
     * 
     * @return ResponseEntity<List<Book>> - HTTP 200 with list of all books
     *         Returns empty list if no books exist (still HTTP 200)
     * 
     * Example response:
     * [
     *   {
     *     "bookId": 1,
     *     "title": "Java Programming",
     *     "author": "John Smith",
     *     "category": "Programming",
     *     "availableCount": 5
     *   },
     *   ...
     * ]
     */
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        try {
            System.out.println("API Call: GET /books - Fetch all books");
            List<Book> books = bookService.getAllBooks();
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            System.out.println("Error fetching books: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /books/{bookId}
     * Retrieve a single book by its ID
     * 
     * @param bookId - The ID of the book to retrieve (from URL path)
     * @return ResponseEntity<Book> - HTTP 200 with book if found
     *                                HTTP 404 if book not found
     * 
     * Example: GET /books/1
     * Response: 
     * {
     *   "bookId": 1,
     *   "title": "Java Programming",
     *   "author": "John Smith",
     *   "category": "Programming",
     *   "availableCount": 5
     * }
     */
    @GetMapping("/{bookId}")
    public ResponseEntity<Book> getBookById(@PathVariable Long bookId) {
        try {
            System.out.println("API Call: GET /books/" + bookId + " - Fetch book by ID");
            Optional<Book> book = bookService.getBookById(bookId);
            
            if (book.isPresent()) {
                return ResponseEntity.ok(book.get());
            } else {
                System.out.println("Book not found with ID: " + bookId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            System.out.println("Error fetching book: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * POST /books
     * Create a new book in the library
     * 
     * @param book - The Book object received from request body
     *               @RequestBody converts JSON to Book object automatically
     * @return ResponseEntity<Book> - HTTP 201 (Created) with created book
     *                                HTTP 400 (Bad Request) if validation fails
     * 
     * Example request:
     * POST /books
     * Content-Type: application/json
     * {
     *   "title": "Java Programming",
     *   "author": "John Smith",
     *   "category": "Programming",
     *   "availableCount": 5
     * }
     * 
     * Example response: HTTP 201
     * {
     *   "bookId": 1,
     *   "title": "Java Programming",
     *   "author": "John Smith",
     *   "category": "Programming",
     *   "availableCount": 5
     * }
     */
    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        try {
            System.out.println("API Call: POST /books - Add new book");
            
            if (book == null) {
                System.out.println("Request body is empty");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            
            Book savedBook = bookService.addBook(book);
            
            if (savedBook != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            System.out.println("Error adding book: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * PUT /books/{bookId}
     * Update an existing book
     * 
     * @param bookId - The ID of the book to update (from URL path)
     * @param bookDetails - The Book object with updated information
     *                      @RequestBody converts JSON to Book object
     * @return ResponseEntity<Book> - HTTP 200 with updated book
     *                                HTTP 404 if book not found
     * 
     * Example request:
     * PUT /books/1
     * Content-Type: application/json
     * {
     *   "title": "Advanced Java Programming",
     *   "author": "John Smith",
     *   "category": "Programming",
     *   "availableCount": 3
     * }
     * 
     * Response: HTTP 200 with updated book
     */
    @PutMapping("/{bookId}")
    public ResponseEntity<Book> updateBook(
            @PathVariable Long bookId,
            @RequestBody Book bookDetails) {
        try {
            System.out.println("API Call: PUT /books/" + bookId + " - Update book");
            
            if (bookDetails == null) {
                System.out.println("Request body is empty");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            
            Book updatedBook = bookService.updateBook(bookId, bookDetails);
            
            if (updatedBook != null) {
                return ResponseEntity.ok(updatedBook);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            System.out.println("Error updating book: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * DELETE /books/{bookId}
     * Delete a book from the library
     * 
     * @param bookId - The ID of the book to delete (from URL path)
     * @return ResponseEntity - HTTP 200 if deletion successful
     *                         HTTP 404 if book not found
     * 
     * Example: DELETE /books/1
     * Response: HTTP 200 with message
     */
    @DeleteMapping("/{bookId}")
    public ResponseEntity<String> deleteBook(@PathVariable Long bookId) {
        try {
            System.out.println("API Call: DELETE /books/" + bookId + " - Delete book");
            
            boolean deleted = bookService.deleteBook(bookId);
            
            if (deleted) {
                return ResponseEntity.ok("Book deleted successfully with ID: " + bookId);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Book not found with ID: " + bookId);
            }
        } catch (Exception e) {
            System.out.println("Error deleting book: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting book: " + e.getMessage());
        }
    }

}
