import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios.js';

const FeedbackListPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filters, setFilters] = useState({ category: '', name: '', sortBy: 'createdAt', order: 'desc' });
    const [pagination, setPagination] = useState({ page: 1, limit: 4 });
    const [meta, setMeta] = useState({ hasNext: false, hasPrev: false, totalPages: 1 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFeedbacks = async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                ...filters,
                page: pagination.page,
                limit: pagination.limit,
                sortBy: filters.sortBy,
                order: filters.order,
            });

            const res = await axiosInstance.get(`/feedbacks?${params.toString()}`);
            console.log(res)
            setFeedbacks(res.data.data.data);
            setMeta({
                hasNext: res.data.data.hasNext,
                hasPrev: res.data.data.hasPrev,
                totalPages: res.data.data.totalPages,
            });
        } catch (err) {
            setError('Failed to fetch feedbacks.', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(feedbacks)
        fetchFeedbacks();
    }, [filters, pagination.page]);

    const handleInputChange = (e) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page on filter change
    };

    const handlePrev = () => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }));
    const handleNext = () => setPagination(prev => ({ ...prev, page: prev.page + 1 }));

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">Feedback Dashboard</h1>

            <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <input
                    type="text"
                    name="name"
                    value={filters.name}
                    onChange={handleInputChange}
                    placeholder="Search by name"
                    className="border rounded px-3 py-1"
                />
                <select name="category" value={filters.category} onChange={handleInputChange} className="border rounded px-3 py-1">
                    <option value="">All Categories</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="bug report">Bug Report</option>
                    <option value="feature request">Feature Request</option>
                    <option value="other">Other</option>
                </select>
                <select name="sortBy" value={filters.sortBy} onChange={handleInputChange} className="border rounded px-3 py-1">
                    <option value="createdAt">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                </select>
                <select name="order" value={filters.order} onChange={handleInputChange} className="border rounded px-3 py-1">
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>

            {loading ? (
                <p className="text-center">Loading feedbacks...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : feedbacks.length === 0 ? (
                <p className="text-center text-gray-500">No feedbacks found.</p>
            ) : (
                <div className="space-y-4">
                    {feedbacks.map((fb, idx) => (
                        <div key={idx} className="border rounded p-4 shadow-sm bg-white">
                            <p><strong>Name:</strong> {fb.name}</p>
                            <p><strong>Email:</strong> {fb.email}</p>
                            <p><strong>Category:</strong> {fb.category}</p>
                            <p><strong>Message:</strong> {fb.message}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-between mt-8">
                <button
                    onClick={handlePrev}
                    disabled={!meta.hasPrev}
                    className={`px-4 py-2 rounded bg-teal-500 text-white ${!meta.hasPrev && 'opacity-50 cursor-not-allowed'}`}
                >
                    Previous
                </button>
                <span className="text-gray-600">Page {pagination.page} of {meta.totalPages}</span>
                <button
                    onClick={handleNext}
                    disabled={!meta.hasNext}
                    className={`px-4 py-2 rounded bg-teal-500 text-white ${!meta.hasNext && 'opacity-50 cursor-not-allowed'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FeedbackListPage;
