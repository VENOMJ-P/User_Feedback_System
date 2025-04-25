import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-teal-600">
                Feedback Form
            </h1>
            <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/feedback">
                    <button >Feedback</button>
                </Link>
            </ul>



        </nav>
    );
};

export default Navbar;
