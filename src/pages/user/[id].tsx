import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { getUserById } from '../../redux/slices/userSlice';
import { getPostsByUserId } from '../../redux/slices/postsSlice';
import BlogCard from '../../components/BlogCard';
import { useRouter } from 'next/router';
import { withAuth } from '@/redux/hooks/authCheck';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Assuming user ID comes from the route
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const posts = useAppSelector((state) => state.posts.items);
  const userStatus = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(getUserById(id));
      dispatch(getPostsByUserId(id));
    }
  }, [id, dispatch]);

  if (userStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto">
        {/* User Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-600 mt-2">
            <strong>Name:</strong> {user.name} {user.surname}
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-600">
            <strong>Phone:</strong> {user?.phoneNumber??""}
          </p>
        </div>

        {/* User's Posts Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Posts</h2>
          {posts.length === 0 ? (
            <p className="text-gray-600">You haven't created any posts yet.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  tags={post.tags}
                  createdAt={post.createdAt}
                  author={post.author}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);
