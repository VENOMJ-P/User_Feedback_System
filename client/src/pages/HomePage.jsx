import React, { useState } from 'react';
import { axiosInstance } from '../lib/axios.js'; // assuming your custom axios instance is in utils/axios.js

const HomePage = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
        category: '',
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const err = {};
        if (!form.name.trim()) err.name = 'Name is required';
        if (!form.email) {
            err.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            err.email = 'Email is invalid';
        }
        if (!form.message.trim()) err.message = 'Feedback message is required';
        if (!form.category) err.category = 'Please select a category';
        return err;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
        setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axiosInstance.post('/feedbacks/', form);
            setSuccess(true);
            setForm({ name: '', email: '', message: '', category: '' });
        } catch (err) {
            alert('Something went wrong. Please try again.', err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">User Feedback Form</h1>

            {success && (
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">
                    Feedback submitted successfully!
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                noValidate
            >
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        name="name"
                        className="w-full border rounded px-3 py-2 mt-1"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        name="email"
                        className="w-full border rounded px-3 py-2 mt-1"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Message</label>
                    <textarea
                        name="message"
                        className="w-full border rounded px-3 py-2 mt-1"
                        placeholder="Write your feedback..."
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700">Category</label>
                    <select
                        name="category"
                        className="w-full border rounded px-3 py-2 mt-1"
                        value={form.category}
                        onChange={handleChange}
                    >
                        <option value="">Select a category</option>
                        <option value="bug report">Bug</option>
                        <option value="suggestion">Suggestion</option>
                        <option value="feature request">Feature Request</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default HomePage;
