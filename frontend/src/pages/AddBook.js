import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../services/api';

const AddBook = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Programming',
    price: '',
    totalCopies: '',
    availableCount: '',
  });

  const [loading, setLoading] = useState(false);

  const categories = [
    'Programming',
    'AI',
    'Science',
    'Technology',
    'Database',
    'Web Development',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await addBook({
        ...formData,
        price: parseFloat(formData.price),
        totalCopies: parseInt(formData.totalCopies),
        availableCount: parseInt(formData.availableCount),
      });

      alert('Book Added Successfully');

      navigate('/books');

    } catch (error) {

      console.log(error);
      alert('Failed to Add Book');

    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen pb-20">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >

        <h1 className="text-5xl font-bold mb-3">
          Add New Book
        </h1>

        <p className="text-light-text/60 mb-12">
          Add a new book to the library collection
        </p>

        <div className="glass p-8 max-w-3xl rounded-2xl">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block mb-2 font-semibold">
                Book Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label className="block mb-2 font-semibold">
                Author
              </label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 font-semibold">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2 font-semibold">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter book price"
                required
              />
            </div>

            {/* Total Copies */}
            <div>
              <label className="block mb-2 font-semibold">
                Total Copies
              </label>

              <input
                type="number"
                name="totalCopies"
                value={formData.totalCopies}
                onChange={handleChange}
                placeholder="Enter total copies"
                required
              />
            </div>

            {/* Available Copies */}
            <div>
              <label className="block mb-2 font-semibold">
                Available Copies
              </label>

              <input
                type="number"
                name="availableCount"
                value={formData.availableCount}
                onChange={handleChange}
                placeholder="Enter available copies"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">

              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 py-3 rounded-xl"
              >
                {loading ? 'Adding...' : 'Add Book'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn-secondary flex-1 py-3 rounded-xl"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </motion.div>

    </div>
  );
};

export default AddBook;