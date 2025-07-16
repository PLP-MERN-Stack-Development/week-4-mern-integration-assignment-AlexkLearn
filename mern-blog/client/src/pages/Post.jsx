import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService } from '../services/api';
import CommentList from '../components/comments/CommentList';
import CommentForm from '../components/comments/CommentForm';

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postService.getBySlug(slug);
        setPost(res.data.post);
        setComments(res.data.post.comments || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleCommentSubmit = (comment) => {
    setComments([comment, ...comments]);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white shadow overflow-hidden rounded-lg">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          )}
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={post.author.avatar || 'https://placehold.co/100x100'}
                  alt={post.author.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {post.author.username}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                {post.tags.join(', ')}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({comments.length})
          </h2>
          <CommentForm postId={post._id} onSubmit={handleCommentSubmit} />
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default Post;