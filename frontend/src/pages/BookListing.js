/**
 * BookListing Page
 * Dynamic Book Management with External API
 */

import React, {
  useState,
  useEffect,
} from 'react';

import { motion } from 'framer-motion';

import { MdLibraryBooks } from 'react-icons/md';

import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

import {
  fetchExternalBooks,
} from '../services/api';

const BookListing = () => {

  const [books, setBooks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [toast, setToast] =
    useState(null);

  const [favorites, setFavorites] =
    useState(() => {

      try {

        return JSON.parse(
          localStorage.getItem(
            'favorites'
          ) || '[]'
        );

      } catch {

        return [];
      }
    });

  const [
    isEditModalOpen,
    setIsEditModalOpen,
  ] = useState(false);

  const [
    editFormData,
    setEditFormData,
  ] = useState({

    title: '',
    author: '',
    category: '',
    availableCount: 0,
    totalCopies: 0,
    imageUrl: '',
  });

  // ======================================================
  // ================= FETCH BOOKS ========================
  // ======================================================

  const fetchBooks = async () => {

    try {

      setLoading(true);

      const storedBooks = JSON.parse(
        localStorage.getItem('books') || '[]'
      );

      // FIRST TIME LOAD

      if (storedBooks.length === 0) {

        const apiBooks =
          await fetchExternalBooks();

        setBooks(apiBooks);

        localStorage.setItem(
          'books',
          JSON.stringify(apiBooks)
        );

      } else {

        setBooks(storedBooks);
      }

    } catch (error) {

      console.error(error);

      setToast({
        type: 'error',
        message:
          'Failed to load books',
      });

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchBooks();

  }, []);

  // ======================================================
  // ================= FAVORITES ==========================
  // ======================================================

  const handleFavorite = (
    bookId
  ) => {

    let updatedFavorites = [];

    if (
      favorites.includes(bookId)
    ) {

      updatedFavorites =
        favorites.filter(
          (id) => id !== bookId
        );

    } else {

      updatedFavorites = [
        ...favorites,
        bookId,
      ];
    }

    setFavorites(
      updatedFavorites
    );

    localStorage.setItem(
      'favorites',
      JSON.stringify(
        updatedFavorites
      )
    );
  };

  // ======================================================
  // ================= BORROW BOOK ========================
  // ======================================================

  const handleBorrow = (
    bookId
  ) => {

    const currentUser =
      JSON.parse(
        localStorage.getItem(
          'currentUser'
        )
      );

    const updatedBooks =
      books.map((book) => {

        if (
          book.bookId === bookId &&
          book.availableCount > 0
        ) {

          // SAVE BORROW HISTORY

          const borrowHistory =
            JSON.parse(
              localStorage.getItem(
                'borrowedBooks'
              ) || '[]'
            );

          borrowHistory.push({

            userId:
              currentUser?.id,

            userName:
              currentUser?.name,

            bookId:
              book.bookId,

            title:
              book.title,

            author:
              book.author,

            borrowDate:
              new Date().toLocaleString(),

            returned: false,
          });

          localStorage.setItem(
            'borrowedBooks',
            JSON.stringify(
              borrowHistory
            )
          );

          return {

            ...book,

            availableCount:
              book.availableCount - 1,
          };
        }

        return book;
      });

    setBooks(updatedBooks);

    localStorage.setItem(
      'books',
      JSON.stringify(updatedBooks)
    );

    setToast({

      type: 'success',

      message:
        'Book borrowed successfully',
    });
  };

  // ======================================================
  // ================= RETURN BOOK ========================
  // ======================================================

  const handleReturn = (
    bookId
  ) => {

    const currentUser =
      JSON.parse(
        localStorage.getItem(
          'currentUser'
        )
      );

    const updatedBooks =
      books.map((book) => {

        if (
          book.bookId === bookId
        ) {

          return {

            ...book,

            availableCount:
              book.availableCount + 1,
          };
        }

        return book;
      });

    setBooks(updatedBooks);

    localStorage.setItem(
      'books',
      JSON.stringify(updatedBooks)
    );

    // UPDATE RETURN HISTORY

    const borrowHistory =
      JSON.parse(
        localStorage.getItem(
          'borrowedBooks'
        ) || '[]'
      );

    const updatedHistory =
      borrowHistory.map((item) => {

        if (
          item.bookId === bookId &&
          item.userId ===
            currentUser?.id &&
          !item.returned
        ) {

          return {

            ...item,

            returned: true,

            returnDate:
              new Date().toLocaleString(),
          };
        }

        return item;
      });

    localStorage.setItem(
      'borrowedBooks',
      JSON.stringify(
        updatedHistory
      )
    );

    setToast({

      type: 'success',

      message:
        'Book returned successfully',
    });
  };

  // ======================================================
  // ================= DELETE BOOK ========================
  // ======================================================

  const handleDelete = (
    bookId
  ) => {

    const confirmDelete =
      window.confirm(
        'Delete this book?'
      );

    if (!confirmDelete)
      return;

    const updatedBooks =
      books.filter(
        (book) =>
          book.bookId !==
          bookId
      );

    setBooks(updatedBooks);

    localStorage.setItem(
      'books',
      JSON.stringify(
        updatedBooks
      )
    );

    setToast({

      type: 'success',

      message:
        'Book deleted successfully',
    });
  };

  // ======================================================
  // ================= EDIT BOOK ==========================
  // ======================================================

  const handleEdit = (
    book
  ) => {

    setEditFormData(book);

    setIsEditModalOpen(true);
  };

  const handleSaveEdit =
    () => {

      const updatedBooks =
        books.map((book) =>

          book.bookId ===
          editFormData.bookId

            ? editFormData

            : book
        );

      setBooks(updatedBooks);

      localStorage.setItem(
        'books',
        JSON.stringify(
          updatedBooks
        )
      );

      setIsEditModalOpen(false);

      setToast({

        type: 'success',

        message:
          'Book updated successfully',
      });
    };

  // ======================================================
  // ================= LOADING ============================
  // ======================================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <Loader />

      </div>
    );
  }

  // ======================================================
  // ================= UI ================================
  // ======================================================

  return (

    <div className="min-h-screen bg-gradient-to-b from-transparent to-cyan-500/5 pb-12">

      {/* HEADER */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-12"
      >

        <h1 className="text-4xl font-bold mb-2">

          All Books

        </h1>

        <p className="text-light-text/60">

          Browse our library collection

        </p>

      </motion.div>

      {/* BOOK GRID */}

      {books.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {books.map(
            (
              book,
              index
            ) => (

              <motion.div
                key={
                  book.bookId
                }
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.05,
                }}
              >

                <BookCard
                  book={book}
                  isFavorite={favorites.includes(
                    book.bookId
                  )}
                  onFavorite={
                    handleFavorite
                  }
                  onBorrow={
                    handleBorrow
                  }
                  onReturn={
                    handleReturn
                  }
                  onDelete={
                    handleDelete
                  }
                  onEdit={
                    handleEdit
                  }
                />

              </motion.div>
            )
          )}

        </div>

      ) : (

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >

          <MdLibraryBooks className="w-16 h-16 text-cyan-500/30 mb-4" />

          <h3 className="text-xl font-semibold mb-2">

            No Books Found

          </h3>

          <p className="text-light-text/60">

            No books available

          </p>

        </motion.div>
      )}

      {/* EDIT MODAL */}

      <Modal
        isOpen={
          isEditModalOpen
        }
        onClose={() =>
          setIsEditModalOpen(
            false
          )
        }
        title="Edit Book"
        size="lg"
      >

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Title"
            value={
              editFormData.title
            }
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                title:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-cyan-500/30"
          />

          <input
            type="text"
            placeholder="Author"
            value={
              editFormData.author
            }
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                author:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-cyan-500/30"
          />

          <input
            type="text"
            placeholder="Category"
            value={
              editFormData.category
            }
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                category:
                  e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-cyan-500/30"
          />

          <input
            type="number"
            placeholder="Available Count"
            value={
              editFormData.availableCount
            }
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                availableCount:
                  parseInt(
                    e.target.value
                  ),
              })
            }
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-cyan-500/30"
          />

          <div className="flex gap-3 pt-4">

            <button
              onClick={
                handleSaveEdit
              }
              className="flex-1 btn-primary py-3 rounded-lg"
            >

              Save Changes

            </button>

            <button
              onClick={() =>
                setIsEditModalOpen(
                  false
                )
              }
              className="flex-1 btn-secondary py-3 rounded-lg"
            >

              Cancel

            </button>

          </div>

        </div>

      </Modal>

      {/* TOAST */}

      {toast && (

        <Toast
          message={
            toast.message
          }
          type={toast.type}
          onClose={() =>
            setToast(null)
          }
        />
      )}

    </div>
  );
};

export default BookListing;