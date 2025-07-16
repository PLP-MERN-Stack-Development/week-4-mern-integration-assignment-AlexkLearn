import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/routing/PrivateRoute';
import PublicRoute from './components/routing/PublicRoute';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Post from './pages/Post';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:slug" element={<Post />} />
              <Route path="/login" element={<PublicRoute component={Login} />} />
              <Route path="/register" element={<PublicRoute component={Register} />} />
              <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
              <Route path="/create-post" element={<PrivateRoute component={CreatePost} />} />
              <Route path="/edit-post/:slug" element={<PrivateRoute component={EditPost} />} />
              <Route path="/profile" element={<PrivateRoute component={Profile} />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;