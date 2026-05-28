/**
 * Navbar Component
 * Role Based Navigation
 */

import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import {
  MdMenu,
  MdClose,
  MdLogout,
  MdPerson,
  MdDashboard,
  MdLibraryBooks,
  MdAdd,
  MdSearch,
  MdAssignmentReturn,
} from 'react-icons/md';

const Navbar = ({ onLogout, user }) => {

  const [isOpen, setIsOpen] = useState(false);

  // ======================================================
  // ================= CURRENT USER ROLE ==================
  // ======================================================

  const currentUser = JSON.parse(
    localStorage.getItem('currentUser')
  );

  const role = currentUser?.role;

  return (

    <nav className="glass sticky top-0 z-40 border-b border-cyan-500/20">

      <div className="container mx-auto px-4">

        <div className="flex justify-between items-center py-4">

          {/* LOGO */}

          <Link
            to="/dashboard"
            className="flex items-center gap-2 font-bold text-xl"
          >

            <MdLibraryBooks className="w-6 h-6 text-cyan-400" />

            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">

              Digital Library

            </span>

          </Link>

          {/* DESKTOP MENU */}

          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/dashboard"
              className="flex items-center gap-1 text-light-text/70 hover:text-cyan-400 transition-colors"
            >

              <MdDashboard className="w-4 h-4" />

              Dashboard

            </Link>

            <Link
              to="/books"
              className="flex items-center gap-1 text-light-text/70 hover:text-cyan-400 transition-colors"
            >

              <MdLibraryBooks className="w-4 h-4" />

              Books

            </Link>

            <Link
              to="/search"
              className="flex items-center gap-1 text-light-text/70 hover:text-cyan-400 transition-colors"
            >

              <MdSearch className="w-4 h-4" />

              Search

            </Link>

            {/* ADMIN ONLY */}

            {role === 'ADMIN' && (

              <Link
                to="/add-book"
                className="flex items-center gap-1 text-light-text/70 hover:text-cyan-400 transition-colors"
              >

                <MdAdd className="w-4 h-4" />

                Add Book

              </Link>
            )}

            {/* USER ONLY */}

            {role === 'USER' && (

              <Link
                to="/my-borrows"
                className="flex items-center gap-1 text-light-text/70 hover:text-cyan-400 transition-colors"
              >

                <MdAssignmentReturn className="w-4 h-4" />

                My Borrowed Books

              </Link>
            )}

          </div>

          {/* USER INFO */}

          <div className="hidden md:flex items-center gap-4">

            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">

              <MdPerson className="w-4 h-4 text-cyan-400" />

              <span className="text-sm text-light-text">

                {user?.name || 'User'}

              </span>

              <span className="text-xs text-cyan-400">

                ({role})

              </span>

            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 btn-secondary text-sm"
            >

              <MdLogout className="w-4 h-4" />

              Logout

            </button>

          </div>

          {/* MOBILE BUTTON */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded hover:bg-white/10 transition-colors"
          >

            {isOpen ? (

              <MdClose className="w-6 h-6" />

            ) : (

              <MdMenu className="w-6 h-6" />

            )}

          </button>

        </div>

        {/* MOBILE MENU */}

        {isOpen && (

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 border-t border-cyan-500/20 pt-4 flex flex-col gap-4"
          >

            <Link
              to="/dashboard"
              className="px-2 text-light-text/70 hover:text-cyan-400"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>

            <Link
              to="/books"
              className="px-2 text-light-text/70 hover:text-cyan-400"
              onClick={() => setIsOpen(false)}
            >
              Books
            </Link>

            <Link
              to="/search"
              className="px-2 text-light-text/70 hover:text-cyan-400"
              onClick={() => setIsOpen(false)}
            >
              Search
            </Link>

            {/* ADMIN MOBILE */}

            {role === 'ADMIN' && (

              <Link
                to="/add-book"
                className="px-2 text-light-text/70 hover:text-cyan-400"
                onClick={() => setIsOpen(false)}
              >
                Add Book
              </Link>
            )}

            {/* USER MOBILE */}

            {role === 'USER' && (

              <Link
                to="/my-borrows"
                className="px-2 text-light-text/70 hover:text-cyan-400"
                onClick={() => setIsOpen(false)}
              >
                My Borrowed Books
              </Link>
            )}

            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 btn-secondary text-sm w-full justify-center"
            >

              <MdLogout className="w-4 h-4" />

              Logout

            </button>

          </motion.div>
        )}

      </div>

    </nav>
  );
};

export default Navbar;