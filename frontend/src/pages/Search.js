/**
 * Search Page
 * Dynamic Search from LocalStorage Books
 */

import React, {
  useEffect,
  useState,
} from 'react';

import { motion } from 'framer-motion';

import {
  MdSearch,
  MdKeyboardArrowDown,
} from 'react-icons/md';

import BookCard from '../components/BookCard';

const Search = () => {

  const [books, setBooks] =
    useState([]);

  const [filteredBooks,
    setFilteredBooks] =
    useState([]);

  const [searchTerm,
    setSearchTerm] =
    useState('');

  const [category,
    setCategory] =
    useState('All Categories');

  // ======================================================
  // ================= LOAD BOOKS =========================
  // ======================================================

  useEffect(() => {

    const storedBooks = JSON.parse(
      localStorage.getItem('books') || '[]'
    );

    setBooks(storedBooks);

    setFilteredBooks(storedBooks);

  }, []);

  // ======================================================
  // ================= SEARCH FILTER ======================
  // ======================================================

  useEffect(() => {

    let updatedBooks = books;

    // SEARCH FILTER

    if (searchTerm.trim() !== '') {

      updatedBooks = updatedBooks.filter(
        (book) =>

          book.title
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          book.author
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          book.category
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
      );
    }

    // CATEGORY FILTER

    if (
      category !== 'All Categories'
    ) {

      updatedBooks =
        updatedBooks.filter(
          (book) =>
            book.category === category
        );
    }

    setFilteredBooks(updatedBooks);

  }, [
    searchTerm,
    category,
    books,
  ]);

  // ======================================================
  // ================= UNIQUE CATEGORIES ==================
  // ======================================================

  const categories = [

    'All Categories',

    ...new Set(
      books.map(
        (book) => book.category
      )
    ),
  ];

  // ======================================================
  // ================= UI ================================
  // ======================================================

  return (

    <div className="min-h-screen">

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
        className="mb-10"
      >

        <div className="flex items-center gap-3 mb-2">

          <MdSearch className="text-cyan-400 text-5xl" />

          <h1 className="text-5xl font-bold">
            Search Books
          </h1>

        </div>

        <p className="text-light-text/60 text-lg">
          Find books by title,
          author, or category
        </p>

      </motion.div>

      {/* SEARCH BAR */}

      <div className="glass p-6 rounded-2xl mb-8">

        <div className="relative mb-6">

          <MdSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400 text-2xl" />

          <input
            type="text"
            placeholder="Search by title, author, or keyword..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="w-full bg-transparent border border-cyan-500/30 rounded-xl py-4 pl-16 pr-4 text-lg outline-none focus:border-cyan-400"
          />

        </div>

        {/* CATEGORY */}

        <div className="relative">

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full appearance-none bg-transparent border border-cyan-500/30 rounded-xl py-4 px-5 outline-none"
          >

            {categories.map(
              (cat, index) => (

                <option
                  key={index}
                  value={cat}
                  className="bg-[#081028]"
                >

                  {cat}

                </option>
              )
            )}

          </select>

          <MdKeyboardArrowDown className="absolute right-5 top-1/2 -translate-y-1/2 text-cyan-400 text-2xl pointer-events-none" />

        </div>

      </div>

      {/* RESULT COUNT */}

      <p className="mb-6 text-light-text/60">

        Found
        {' '}
        {filteredBooks.length}
        {' '}
        results

      </p>

      {/* BOOK GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {filteredBooks.map(
          (book, index) => (

            <motion.div
              key={book.bookId}
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
                  index * 0.03,
              }}
            >

              <BookCard
                book={book}
              />

            </motion.div>
          )
        )}

      </div>

    </div>
  );
};

export default Search;