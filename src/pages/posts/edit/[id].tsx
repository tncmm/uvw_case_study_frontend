import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import { getPostById, editPost } from '../../../redux/slices/postsSlice';
import BlogForm from '../../../components/BlogForm';

export default function EditPostPage() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const { currentPost } = useAppSelector(state => state.posts);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(getPostById(id)).finally(() => setLoading(false));
    }
  }, [id, dispatch]);

  const handleSubmit = async (values: { title: string; content: string; tags: string[] }) => {
    if (id && typeof id === 'string') {
      await dispatch(editPost({ id, ...values }));
      router.push('/');
    }
  };

  if (loading || !currentPost) return <div>Loading...</div>;

  const initialValues = {
    title: currentPost.title,
    content: currentPost.content,
    tags: currentPost.tags
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit Post</h1>
        <BlogForm initialValues={initialValues} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
