import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { getPostById, removePost } from '../../redux/slices/postsSlice';
import Link from 'next/link';
import { parseToken } from '@/utils/token';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const {currentPost} = useAppSelector(state => state.posts);


  useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(getPostById(id));
    }
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (id && typeof id === 'string') {
      const confirmed = window.confirm('Are you sure you want to delete this post?');
      if (confirmed) {
        await dispatch(removePost(id));
        router.push('/');
      }
    }
  };

  if(!currentPost) return <div>Loading...</div>;
  const userId= parseToken()??""
  const isAuthor = userId== currentPost.authorId;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{currentPost.title}</h1>
        {/* Post Owner */}
        <p className="text-sm text-gray-500 mb-3">
          By <span className="text-black-600">{currentPost.author.name} {currentPost.author.surname}</span>
        </p>
        <p className="text-gray-500 mb-4">
          {new Date(currentPost.createdAt).toDateString()}
        </p>
        <div className="text-gray-700 leading-relaxed mb-4">{currentPost.content}</div>
        <div className="mb-4">
          {currentPost.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>

        {isAuthor && (
          <div className="flex space-x-4 mt-4">
            <Link href={`/posts/edit/${currentPost.id}`} passHref>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                Edit
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
