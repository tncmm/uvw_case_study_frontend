import { useRouter } from "next/router";
import React from "react";

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  authorId?:string;
  author: {
    name?: string;
    surname?: string;
    
  };
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  content,
  tags,
  createdAt,
  author,
  id,
  authorId,
}) => {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(`/posts/${id}`);
  };

  const handleAuthorClick = () => {
    router.push(`/user/${authorId}`); 
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="p-6">
        {/* Blog Title */}
        <h3 className="text-2xl font-semibold text-[#111418] mb-3 truncate">
          {title}
        </h3>

        {/* Post Owner */}
        <p className="text-sm text-gray-500 mb-3">
          By{" "}
          <button
            onClick={handleAuthorClick}
            className="text-blue-500 font-medium hover:underline"
          >
            {author?.name ?? ""} {author?.surname ?? ""}
          </button>
        </p>

        {/* Date */}
        <p className="text-sm text-gray-500 mb-3">
          {new Date(createdAt).toDateString()}
        </p>

        {/* Blog Content */}
        <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
          {content}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
        <button
          onClick={handleReadMore}
          className="text-blue-500 font-medium hover:underline"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default  BlogCard;
