/**
 * MyBorrows Page
 * Shows borrowed books for current user
 */

import React from 'react';

import { motion } from 'framer-motion';

import {
  MdLibraryBooks,
  MdAccessTime,
} from 'react-icons/md';

const MyBorrows = () => {

  const borrowedBooks = JSON.parse(
    localStorage.getItem('borrowedBooks') || '[]'
  );

  const currentUser = JSON.parse(
    localStorage.getItem('currentUser')
  );

  const userBooks = borrowedBooks.filter(
    (book) => book.userId === currentUser?.id
  );

  return (

    <div className="min-h-screen pb-10">

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >

        <h1 className="text-4xl font-bold mb-2">

          My Borrowed Books

        </h1>

        <p className="text-light-text/60">

          Books borrowed by you

        </p>

      </motion.div>

      {/* BOOK LIST */}

      {userBooks.length > 0 ? (

        <div className="grid gap-5">

          {userBooks.map((book, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass p-5 rounded-xl"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-xl font-bold">

                    {book.title}

                  </h2>

                  <p className="text-light-text/60">

                    {book.author}

                  </p>

                </div>

                <div className="text-right">

                  <div className="flex items-center gap-2 text-cyan-400">

                    <MdAccessTime />

                    Borrowed

                  </div>

                  <p className="text-sm text-light-text/50">

                    {book.borrowedDate}

                  </p>

                </div>

              </div>

            </motion.div>
          ))}
        </div>

      ) : (

        <div className="glass p-10 rounded-xl text-center">

          <MdLibraryBooks className="w-16 h-16 mx-auto text-cyan-400 mb-4" />

          <h2 className="text-2xl font-bold mb-2">

            No Borrowed Books

          </h2>

          <p className="text-light-text/60">

            You have not borrowed any books yet

          </p>

        </div>

      )}

    </div>
  );
};

export default MyBorrows;