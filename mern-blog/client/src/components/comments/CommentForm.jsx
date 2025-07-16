import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const CommentForm = ({ postId, onSubmit }) => {
  const { isAuthenticated, user } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const comment = {
        content,
        author: {
          id: user._id,
          username: user.username,
          avatar: user.avatar,
        },
        createdAt: new Date().toISOString(),
      };

      onSubmit(comment);
      setContent('');
      setError(null);
    } catch (err) {
      setError('Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-4 text-gray-500">
        Please <a href="/login" className="text-indigo-600 hover:text-indigo-800">login</a> to post a comment.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      {error && (
        <div className="mb-4 p-2 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex space-x-4">
        <img
          src={user?.avatar || 'https://placehold.co/50x50'}
          alt={user?.username}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-grow">
          <textarea
            placeholder="Write a comment..."
            rows="3"
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;