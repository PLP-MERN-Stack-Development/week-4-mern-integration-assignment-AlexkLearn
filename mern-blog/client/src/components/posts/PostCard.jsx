import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

const PostCard = ({ post, showControls = false }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {post.featuredImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500">
            {formatDate(post.createdAt)}
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
            {post.tags[0] || 'Uncategorized'}
          </span>
        </div>
        <Link
          to={`/posts/${post.slug}`}
          className="block text-xl font-semibold text-gray-900 hover:text-indigo-600 mb-2"
        >
          {post.title}
        </Link>
        <p className="text-gray-600 mb-4">{post.excerpt || post.content.slice(0, 100)}...</p>
        
        {showControls && (
          <div className="flex justify-end space-x-2">
            <Link
              to={`/edit-post/${post.slug}`}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;