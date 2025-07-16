import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-2xl font-bold text-indigo-600 hover:text-indigo-700"
              >
                Blogr
              </Link>
            </div>
            <div className="hidden md:block ml-6">
              <div className="flex space-x-4">
                <NavLink
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                >
                  Home
                </NavLink>
                {isAuthenticated && (
                  <>
                    <NavLink
                      to="/dashboard"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/create-post"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                    >
                      Create Post
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                  >
                    {user?.username}
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;