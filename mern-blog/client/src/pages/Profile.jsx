import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ChangePasswordForm from '../components/profile/ChangePasswordForm';

const Profile = () => {
  const { user, updateProfile, updatePassword } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white shadow overflow-hidden rounded-lg p-6 text-center">
              <img
                src={user.avatar || 'https://placehold.co/150x150'}
                alt={user.username}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-900">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white shadow overflow-hidden rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Update Profile</h2>
              
              {success && (
                <div className="mb-4 p-2 bg-green-50 text-green-700 rounded-md text-sm">
                  Profile updated successfully!
                </div>
              )}

              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
              <ChangePasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;