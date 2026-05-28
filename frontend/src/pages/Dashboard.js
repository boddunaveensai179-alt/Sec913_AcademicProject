import React, {
  useEffect,
  useState,
} from 'react';

import {
  motion,
} from 'framer-motion';

import {
  MdLibraryBooks,
  MdCheckCircle,
  MdAccessTime,
  MdCategory,
} from 'react-icons/md';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  Legend,
} from 'recharts';

import {
  fetchExternalBooks,
} from '../services/api';

import adminBg from '../components/admin.jpeg';

import userBg from '../components/user.jpeg';

// ======================================================
// ================= CHART COLORS =======================
// ======================================================

const COLORS = [
  '#ff0080',
  '#00e5ff',
  '#00ff95',
  '#ffd600',
];

// ======================================================
// ================= COMPONENT ==========================
// ======================================================

const Dashboard = () => {

  const [books, setBooks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ======================================================
  // ================= CURRENT USER =======================
  // ======================================================

  const currentUser = JSON.parse(
    localStorage.getItem('currentUser')
  );

  const role =
    currentUser?.role || 'USER';

  // ======================================================
  // ================= BACKGROUND IMAGE ===================
  // ======================================================

  const backgroundImage =
    role === 'ADMIN'
      ? adminBg
      : userBg;

  // ======================================================
  // ================= LOAD BOOKS =========================
  // ======================================================

  useEffect(() => {

    fetchBooks();

    // AUTO REFRESH

    const interval = setInterval(() => {

      fetchBooks();

    }, 2000);

    return () =>
      clearInterval(interval);

  }, []);

  // ======================================================
  // ================= FETCH BOOKS ========================
  // ======================================================

  const fetchBooks = async () => {

    try {

      // ==========================================
      // LOCAL STORAGE BOOKS
      // ==========================================

      const localBooks = JSON.parse(
        localStorage.getItem('books') || '[]'
      );

      // ==========================================
      // API BOOKS
      // ==========================================

      const apiBooks =
        await fetchExternalBooks();

      // ==========================================
      // FORMAT API BOOKS
      // ==========================================

      const formattedApiBooks =
        apiBooks.map((book, index) => ({

          bookId:
            book.bookId ||
            `api-${index}`,

          title:
            book.title || 'Unknown',

          author:
            book.author || 'Unknown',

          category:
            book.category || 'General',

          availableCount:
            book.availableCount || 5,

          totalCopies:
            book.totalCopies ||
            book.availableCount ||
            5,

          imageUrl:
            book.imageUrl ||
            'https://via.placeholder.com/200x300',

        }));

      // ==========================================
      // MERGE BOTH BOOKS
      // ==========================================

      const mergedBooks = [

        ...formattedApiBooks,

        ...localBooks,

      ];

      // ==========================================
      // REMOVE DUPLICATES
      // ==========================================

      const uniqueBooks =
        mergedBooks.filter(
          (book, index, self) =>

            index ===
            self.findIndex(
              (b) =>
                b.title === book.title
            )
        );

      // ==========================================
      // SAVE TO STATE
      // ==========================================

      setBooks(uniqueBooks);

      // ==========================================
      // SAVE TO LOCAL STORAGE
      // ==========================================

      localStorage.setItem(
        'books',
        JSON.stringify(uniqueBooks)
      );

    } catch (error) {

      console.error(
        'Dashboard Error:',
        error
      );

    } finally {

      setLoading(false);
    }
  };

  // ======================================================
  // ================= CALCULATIONS =======================
  // ======================================================

  const totalBooks =
    books.length;

  const availableBooks =
    books.reduce(
      (total, book) =>
        total +
        (book.availableCount || 0),
      0
    );

  const borrowedBooks =
    books.reduce(
      (total, book) =>
        total +
        (
          (book.totalCopies || 0) -
          (book.availableCount || 0)
        ),
      0
    );

  const totalCategories = [

    ...new Set(
      books.map(
        (book) => book.category
      )
    ),

  ].length;

  // ======================================================
  // ================= PIE CHART DATA =====================
  // ======================================================

  const pieData = [

    {
      name: 'Available',
      value: availableBooks,
    },

    {
      name: 'Borrowed',
      value: borrowedBooks,
    },

  ];

  // ======================================================
  // ================= CATEGORY CHART =====================
  // ======================================================

  const categoryMap = {};

  books.forEach((book) => {

    if (!categoryMap[book.category]) {

      categoryMap[book.category] = 0;
    }

    categoryMap[book.category] += 1;
  });

  const categoryData =
    Object.keys(categoryMap).map(
      (key) => ({

        category: key,

        books:
          categoryMap[key],

      })
    );

  // ======================================================
  // ================= LOADING ============================
  // ======================================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-black">

        <h1 className="text-5xl font-black text-cyan-300 animate-pulse">

          Loading Dashboard...

        </h1>

      </div>
    );
  }

  // ======================================================
  // ================= UI ================================
  // ======================================================

  return (

    <div
      className="min-h-screen w-full relative"
      style={{

        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.60),
            rgba(0,0,0,0.60)
          ),
          url(${backgroundImage})
        `,

        backgroundSize: 'cover',

        backgroundPosition: 'center',

        backgroundRepeat: 'no-repeat',

        backgroundAttachment: 'fixed',

        width: '100%',

        minHeight: '100vh',

      }}
    >

      {/* CONTENT */}

      <div className="w-full min-h-screen px-6 py-8 backdrop-blur-[2px]">

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

          <h1 className="text-7xl font-black bg-gradient-to-r from-pink-400 via-cyan-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-2xl">

            Smart Library Dashboard

          </h1>

          <p className="text-white text-2xl mt-3 font-bold">

            Welcome
            {' '}
            {currentUser?.name}

            {' '}
            -
            {' '}
            {role} PANEL

          </p>

        </motion.div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-14">

          {/* TOTAL BOOKS */}

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="bg-white/10 backdrop-blur-2xl border border-pink-400/40 rounded-[35px] p-8 shadow-[0_0_40px_rgba(255,0,128,0.4)]"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-white/80 text-xl mb-2">

                  Total Books

                </p>

                <h2 className="text-6xl font-black text-pink-300">

                  {totalBooks}

                </h2>

              </div>

              <MdLibraryBooks className="text-7xl text-pink-300" />

            </div>

          </motion.div>

          {/* AVAILABLE */}

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="bg-white/10 backdrop-blur-2xl border border-cyan-400/40 rounded-[35px] p-8 shadow-[0_0_40px_rgba(0,229,255,0.4)]"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-white/80 text-xl mb-2">

                  Available

                </p>

                <h2 className="text-6xl font-black text-cyan-300">

                  {availableBooks}

                </h2>

              </div>

              <MdCheckCircle className="text-7xl text-cyan-300" />

            </div>

          </motion.div>

          {/* BORROWED */}

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="bg-white/10 backdrop-blur-2xl border border-yellow-400/40 rounded-[35px] p-8 shadow-[0_0_40px_rgba(255,214,0,0.4)]"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-white/80 text-xl mb-2">

                  Borrowed

                </p>

                <h2 className="text-6xl font-black text-yellow-300">

                  {borrowedBooks}

                </h2>

              </div>

              <MdAccessTime className="text-7xl text-yellow-300" />

            </div>

          </motion.div>

          {/* CATEGORIES */}

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="bg-white/10 backdrop-blur-2xl border border-green-400/40 rounded-[35px] p-8 shadow-[0_0_40px_rgba(0,255,149,0.4)]"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-white/80 text-xl mb-2">

                  Categories

                </p>

                <h2 className="text-6xl font-black text-green-300">

                  {totalCategories}

                </h2>

              </div>

              <MdCategory className="text-7xl text-green-300" />

            </div>

          </motion.div>

        </div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">

          {/* PIE CHART */}

          <div className="bg-white/10 backdrop-blur-2xl border border-cyan-400/30 rounded-[35px] p-8 shadow-[0_0_40px_rgba(0,229,255,0.3)]">

            <h2 className="text-4xl font-black text-cyan-300 mb-8">

              Library Status

            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <PieChart>

                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  dataKey="value"
                  label
                >

                  {pieData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[index %
                          COLORS.length]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* BAR CHART */}

          <div className="bg-white/10 backdrop-blur-2xl border border-pink-400/30 rounded-[35px] p-8 shadow-[0_0_40px_rgba(255,0,128,0.3)]">

            <h2 className="text-4xl font-black text-pink-300 mb-8">

              Categories

            </h2>

            <ResponsiveContainer
              width="100%"
              height={420}
            >

              <BarChart
                data={categoryData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ffffff22"
                />

                <XAxis
                  dataKey="category"
                  stroke="#ffffff"
                />

                <YAxis
                  stroke="#ffffff"
                />

                <Tooltip />

                <Bar
                  dataKey="books"
                  fill="#00e5ff"
                  radius={[20,20,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* RECENT BOOKS */}

        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[35px] p-8 shadow-[0_0_40px_rgba(255,255,255,0.2)]">

          <h2 className="text-5xl font-black text-yellow-300 mb-10">

            Recent Books

          </h2>

          <div className="space-y-6">

            {books.slice(0, 5).map((book) => (

              <motion.div
                key={book.bookId}
                whileHover={{
                  scale: 1.02,
                }}
                className="flex items-center justify-between bg-white/10 border border-white/20 rounded-[25px] p-6 backdrop-blur-2xl"
              >

                <div className="flex items-center gap-6">

                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-28 h-32 rounded-3xl object-cover border-4 border-cyan-300 shadow-2xl"
                  />

                  <div>

                    <h3 className="text-3xl font-black text-white">

                      {book.title}

                    </h3>

                    <p className="text-white/70 text-xl mt-2">

                      {book.author}

                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-cyan-300 text-2xl font-bold">

                    {book.category}

                  </p>

                  <p className="text-white/70 text-xl mt-2">

                    Available:
                    {' '}
                    {book.availableCount}

                  </p>

                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;