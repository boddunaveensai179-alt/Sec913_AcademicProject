/**
 * Login Page
 * Background Image + Backend Authentication
 */

import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import {
  MdVisibility,
  MdVisibilityOff,
  MdLogoDev,
} from 'react-icons/md';

import { loginUser } from '../services/api';

// ================= BACKGROUND IMAGE =================

import loginBg from '../components/login.jpeg';

const Login = () => {

  // ==================================================
  // ================= STATES ==========================
  // ==================================================

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  // ==================================================
  // ================= LOGIN SUBMIT ===================
  // ==================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');

    setLoading(true);

    if (!email || !password) {

      setError(
        'Email and password are required'
      );

      setLoading(false);

      return;
    }

    try {

      const user = await loginUser({
        email,
        password,
      });

      if (user) {

        window.location.href =
          '/dashboard';

      } else {

        setError(
          'Invalid email or password'
        );
      }

    } catch (err) {

      console.error(err);

      setError('Login failed');
    }

    setLoading(false);
  };

  // ==================================================
  // ================= UI ==============================
  // ==================================================

  return (

    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >

      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* ANIMATED GLOW */}

      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute top-10 left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"
      />

      {/* LOGIN CARD */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl border border-cyan-500/30 bg-white/10 backdrop-blur-xl shadow-2xl"
      >

        {/* LOGO */}

        <div className="text-center mb-8">

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: 'spring',
              stiffness: 200,
            }}
            className="flex justify-center mb-4"
          >

            <div className="p-4 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full shadow-lg">

              <MdLogoDev className="w-8 h-8 text-white" />

            </div>

          </motion.div>

          <h1 className="text-4xl font-bold mb-2 text-white">

            Welcome Back

          </h1>

          <p className="text-gray-300">

            Sign in to your Digital Library

          </p>

        </div>

        {/* LOGIN FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label className="block text-sm font-medium mb-2 text-white">

              Email Address

            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-cyan-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block text-sm font-medium mb-2 text-white">

              Password

            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-cyan-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300"
              >

                {showPassword ? (

                  <MdVisibilityOff className="w-5 h-5" />

                ) : (

                  <MdVisibility className="w-5 h-5" />

                )}

              </button>

            </div>

          </div>

          {/* ERROR */}

          {error && (

            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-sm text-red-300"
            >

              {error}

            </motion.div>
          )}

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all duration-300 text-white shadow-lg"
          >

            {loading
              ? 'Signing In...'
              : 'Sign In'}

          </button>

        </form>

        {/* FOOTER */}

        <p className="text-center text-gray-300 text-sm mt-6">

          Don&apos;t have an account?{' '}

          <Link
            to="/signup"
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >

            Create one

          </Link>

        </p>

      </motion.div>

    </div>
  );
};

export default Login;