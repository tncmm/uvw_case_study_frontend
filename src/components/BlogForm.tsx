import React, { useState } from 'react';

interface PostValues {
  title: string;
  content: string;
  tags: string[];
}

interface BlogFormProps {
  initialValues: PostValues;
  onSubmit: (values: PostValues) => Promise<void> | void;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialValues, onSubmit }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const [tags, setTags] = useState(initialValues.tags.join(', '));
  
  const [titleError, setTitleError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);

  const validateFields = () => {
    let isValid = true;
    
    if (title.length < 20 || title.length > 50) {
      setTitleError('Title must be between 20 and 50 characters.');
      isValid = false;
    } else {
      setTitleError(null);
    }

    if (content.length < 20 || content.length > 100) {
      setContentError('Content must be between 20 and 100 characters.');
      isValid = false;
    } else {
      setContentError(null);
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean);
      onSubmit({ title, content, tags: tagArray });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300 space-y-4"
    >
      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <input 
          type="text"
          className="border p-2 rounded w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required 
        />
        <div className="flex items-center justify-between mt-1">
          {titleError && <p className="text-red-600 text-sm">{titleError}</p>}
          <p className="text-gray-600 text-sm">{title.length} characters (20-50)</p>
        </div>
      </div>
      
      <div>
        <label className="block mb-1 font-semibold">Content</label>
        <textarea 
          className="border p-2 rounded w-full"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <div className="flex items-center justify-between mt-1">
          {contentError && <p className="text-red-600 text-sm">{contentError}</p>}
          <p className="text-gray-600 text-sm">{content.length} characters (20-100)</p>
        </div>
      </div>
      
      <div>
        <label className="block mb-1 font-semibold">Tags (comma separated)</label>
        <input 
          type="text"
          className="border p-2 rounded w-full"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
      </div>
      
      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default BlogForm;
