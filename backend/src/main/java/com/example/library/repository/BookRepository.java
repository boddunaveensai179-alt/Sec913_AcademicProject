package com.example.library.repository;

import com.example.library.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * BookRepository - Data Access Layer for Book entity
 * 
 * This interface extends JpaRepository which provides built-in CRUD operations.
 * Spring Data JPA automatically generates implementation at runtime.
 * 
 * No need to implement methods manually - JpaRepository handles:
 * - save(), findById(), findAll(), delete(), deleteById(), update() etc.
 * 
 * @Repository - Indicates this is a Spring Data repository component
 * Generic parameters: <Book, Long>
 *   - Book: Entity class being managed
 *   - Long: Type of the primary key (bookId)
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // JpaRepository already provides all basic CRUD operations:
    // save(Book book) - Save or update a book
    // findById(Long id) - Find book by ID
    // findAll() - Get all books
    // delete(Book book) - Delete a book
    // deleteById(Long id) - Delete book by ID
    // update operations are handled through save()
}
