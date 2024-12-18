import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { getPosts } from '../redux/slices/postsSlice';
import BlogCard from '../components/BlogCard';
import Search from '../components/Search';
import Sort from '../components/Sort';
import { useRouter } from 'next/router';
import { parseToken } from '@/utils/token';
import { getUserById } from '@/redux/slices/userSlice';
import { setUserState } from '@/redux/slices/authSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);

  const router = useRouter();
  const posts = useAppSelector((state) => state.posts.items);
  const status = useAppSelector((state) => state.posts.status); // Track loading or error status
  const [filters, setFilters] = useState({ search: '' });
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  const [error, setError] = useState<string | null>(null); // Track errors

  useEffect(() => {
    (async () => {
      if (!user && token) {
        const userId = parseToken(); // This should return the userId from the token
        try {
          const fetchedUser = await dispatch(getUserById(userId)).unwrap();

          dispatch(setUserState({
            user: {
              id: fetchedUser.id,
              email: fetchedUser.email,
              name: fetchedUser.name,
              surname: fetchedUser.surname,
              phoneNumber: fetchedUser.phoneNumber,
            },
            token: token,
          }));
        } catch (err) {
          console.error('Failed to fetch user data:', err);
        }
      } else if (!user && !token) {
        router.replace("/auth/login");
        return;
      }

      const fetchPosts = async () => {
        setError(null); 
        try {
          const result = await dispatch(getPosts({ ...filters, createdAt: sort }));
          if (getPosts.rejected.match(result)) {
            setError(result.error.message || 'Failed to fetch posts. Please try again.');
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message || 'An unexpected error occurred. Please try again.');
          } else {
            setError('An unexpected error occurred. Please try again.');
          }
        }
      };

      fetchPosts();
    })();
  }, [filters, sort, dispatch, router, token, user]);

  const handleSearch = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
  };

  const handleSort = (order: 'asc' | 'desc') => {
    setSort(order);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Bloggr</h1>
          <p className="text-gray-500 text-lg">Explore the latest blog posts and stories</p>
        </header>

        {/* Search and Sort */}
        <Search onSearch={handleSearch} />
        <Sort onSort={handleSort} />

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mb-6">
            {error}
          </div>
        )}

        {/* Blog Cards Grid */}
        {status === 'loading' ? (
          <p className="text-center text-gray-500">Loading posts...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  tags={post.tags}
                  createdAt={post.createdAt}
                  authorId={post.authorId}
                  author={post.author}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No posts available. Please check back later.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
