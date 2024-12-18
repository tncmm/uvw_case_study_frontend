import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { createNewPost } from '../../redux/slices/postsSlice';
import BlogForm from '../../components/BlogForm';

const NewPostPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  
  const handleCreate = async (data: {title: string; content: string; tags: string[]}) => {
    await dispatch(createNewPost(data));
    router.push('/');
  };

  return (
    <>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
        <BlogForm 
          initialValues={{ title: '', content: '', tags: [] }}
          onSubmit={handleCreate}
        />
      </div>
    </>
  );
};

export default NewPostPage;
