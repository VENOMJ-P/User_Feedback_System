const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 text-center max-w-md mb-6">
                Sorry, the page you're looking for doesn't exist.
            </p>
            <a
                href="/"
                className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition duration-200"
            >
                Go Home
            </a>
        </div>
    );
};

export default ErrorPage;
