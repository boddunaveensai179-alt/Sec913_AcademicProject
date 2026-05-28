/**
 * API Service Module
 * External API + Spring Boot Backend
 */

import axios from 'axios';

// ======================================================
// ================= BASE URL ============================
// ======================================================

const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8080';

const BOOKS_API_URL = `${API_BASE_URL}/books`;

const AUTH_API_URL = `${API_BASE_URL}/auth`;

// ======================================================
// ================= AXIOS CLIENT =======================
// ======================================================

const apiClient = axios.create({
  baseURL: BOOKS_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ======================================================
// ================= REQUEST INTERCEPTOR ================
// ======================================================

apiClient.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem('authToken');

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

// ======================================================
// ================= RESPONSE INTERCEPTOR ===============
// ======================================================

apiClient.interceptors.response.use(

  (response) => response,

  (error) => {

    if (
      error.response &&
      error.response.status === 401
    ) {

      localStorage.removeItem('authToken');

      localStorage.removeItem('currentUser');

      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// ======================================================
// ================= EXTERNAL BOOK API ==================
// ======================================================

export const fetchExternalBooks = async () => {

  try {

    const response = await axios.get(
      'https://openlibrary.org/search.json?q=programming&limit=120'
    );

    const books = response.data.docs.map(
      (book, index) => ({

        bookId: index + 1,

        title:
          book.title || 'Unknown Title',

        author:
          book.author_name?.[0] ||
          'Unknown Author',

        category:
          book.subject?.[0] ||
          'Programming',

        availableCount:
          Math.floor(Math.random() * 20) + 1,

        borrowedCount:
          Math.floor(Math.random() * 10),

        totalCopies: 20,

        imageUrl: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : 'https://via.placeholder.com/300x400',

      })
    );

    return books;

  } catch (error) {

    console.error(
      'EXTERNAL API ERROR',
      error
    );

    return [];
  }
};

// ======================================================
// ================= BOOK SERVICES ======================
// ======================================================

export const getAllBooks = async () => {

  try {

    const response = await apiClient.get('');

    return response.data;

  } catch (error) {

    console.error('GET BOOKS ERROR', error);

    throw error;
  }
};

export const getBookById = async (bookId) => {

  try {

    const response = await apiClient.get(
      `/${bookId}`
    );

    return response.data;

  } catch (error) {

    console.error('GET BOOK ERROR', error);

    throw error;
  }
};

export const addBook = async (bookData) => {

  try {

    const response = await apiClient.post(
      '',
      bookData
    );

    return response.data;

  } catch (error) {

    console.error('ADD BOOK ERROR', error);

    throw error;
  }
};

export const updateBook = async (
  bookId,
  bookData
) => {

  try {

    const response = await apiClient.put(
      `/${bookId}`,
      bookData
    );

    return response.data;

  } catch (error) {

    console.error(
      'UPDATE BOOK ERROR',
      error
    );

    throw error;
  }
};

export const deleteBook = async (
  bookId
) => {

  try {

    const response = await apiClient.delete(
      `/${bookId}`
    );

    return response.data;

  } catch (error) {

    console.error(
      'DELETE BOOK ERROR',
      error
    );

    throw error;
  }
};

// ======================================================
// ================= LOGIN USER =========================
// ======================================================

export const loginUser = async (
  credentials
) => {

  try {

    const response = await axios.post(
      `${AUTH_API_URL}/login`,
      credentials
    );

    if (response.data.email) {

      localStorage.setItem(
        'authToken',
        `token_${Date.now()}`
      );

      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        })
      );

      return response.data;
    }

    return null;

  } catch (error) {

    console.error(
      'LOGIN ERROR',
      error
    );

    return null;
  }
};

// ======================================================
// ================= REGISTER USER ======================
// ======================================================

export const registerUser = async (
  userData
) => {

  try {

    const response = await axios.post(
      `${AUTH_API_URL}/signup`,
      userData
    );

    return response.data;

  } catch (error) {

    console.error(
      'REGISTER ERROR',
      error
    );

    return null;
  }
};

// ======================================================
// ================= LOGOUT =============================
// ======================================================

export const logout = () => {

  localStorage.removeItem(
    'authToken'
  );

  localStorage.removeItem(
    'currentUser'
  );
};

// ======================================================
// ================= AUTH CHECK =========================
// ======================================================

export const isAuthenticated = () => {

  return !!localStorage.getItem(
    'authToken'
  );
};

// ======================================================
// ================= CURRENT USER =======================
// ======================================================

export const getCurrentUser = () => {

  try {

    const user = localStorage.getItem(
      'currentUser'
    );

    return user
      ? JSON.parse(user)
      : null;

  } catch (error) {

    return null;
  }
};

// ======================================================
// ================= ROLE HELPERS =======================
// ======================================================

export const isAdmin = () => {

  const user = getCurrentUser();

  return user?.role === 'ADMIN';
};

export const isUser = () => {

  const user = getCurrentUser();

  return user?.role === 'USER';
};

// ======================================================
// ================= DEFAULT EXPORT =====================
// ======================================================

const apiServices = {

  fetchExternalBooks,

  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,

  loginUser,
  registerUser,
  logout,

  isAuthenticated,
  getCurrentUser,

  isAdmin,
  isUser,
};

export default apiServices;