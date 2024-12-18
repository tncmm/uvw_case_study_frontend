### **Tech Stack**
- **Framework**: Next.js (React-based)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **API Communication**: Fetch API

---

### **Project Structure**
```
src/
├── components/          # Reusable UI components (e.g., BlogCard, Navbar)
├── redux/            # Redux slices for managing state (e.g., auth, posts)
├── pages/               # Next.js pages for routing
│   ├── api/             # API route handlers (if any server-side functions)
│   ├── index.tsx        # Homepage
│   ├── user/            # User profile
│   ├── posts/           # Post-related pages (e.g., create, detail)
├── styles/              # Global styles (e.g., Tailwind CSS)
├── utils/               # Helper functions (e.g., tokens)
```

---

### **Key Features**
1. **Home Page**
   - Displays a grid of blog posts using the `BlogCard` component.
   - Allows users to filter posts by tags and search titles.

2. **Authentication**
   - Login and registration pages.
   - JWT-based auto-login using tokens stored in `localStorage`.

3. **Profile Page**
   - Displays user details and their posts.
   - Uses dynamic routing to fetch user-specific data.

4. **Post Management**
   - Create, update, delete posts.
   - Display post details using a dynamic route (`/posts/[id]`).

5. **Global State**
   - Managed by Redux Toolkit.
   - State slices:
     - **Auth**: Handles user authentication and session management.
     - **Posts**: Manages the list of posts and post details.

---

### **Setup Instructions**
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables:
   Create a `.env` file with:
   ```
  API_URL=http://localhost:3001/
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Navigate to:
   - `http://localhost:3000` for the application.

---

### **Logic Overview**
1. **API Integration**
   - The `/api.ts` file provides helper functions for API requests.
   - Example:
     ```typescript
     export const fetchPosts = async () => {
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
       return res.json();
     };
     ```

2. **State Management**
   - `authSlice`: Manages user authentication state and token storage.
   - `postsSlice`: Handles fetching, creating, and updating posts.
   - `userSlice`: Manages user.

3. **Page Navigation**
   - Login redirects to the homepage on success.
   - Clicking "Read More" on a post navigates to `/posts/[id]`.

---

### **Styling Overview**
- Tailwind CSS is used for responsive and modern UI design.
- Global styles are defined in `styles/globals.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

---

### **Key Pages**
1. **`/` - Homepage**
   - Displays blog posts in a responsive grid.
   - Uses `BlogCard` for each post.

2. **`/auth/login` and `/auth/register`**
   - Login and registration pages for user authentication.

3. **`/posts/create`**
   - A form for creating new blog posts.

4. **`/posts/[id]`**
   - A dynamic route for displaying post details.

---

This **README.md** file provides a comprehensive guide for setting up and understanding the project. Let me know if you'd like additional details or adjustments! 🚀

