import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { register } from '../../redux/slices/authSlice';
import { useRouter } from 'next/router';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.auth);
  const router = useRouter();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State to track registration errors

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const result = await dispatch(register({ name, surname, email, phone, password }));

      // Check if registration was successful
      if (register.fulfilled.match(result)) {
        router.push('/');
      } else if (register.rejected.match(result)) {
        setError(result.error.message || 'Registration failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        
        {/* Name Input */}
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        {/* Surname Input */}
        <div className="mb-4">
          <label className="block mb-1">Surname</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={surname}
            onChange={e => setSurname(e.target.value)}
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Phone Input */}
        <div className="mb-4">
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Display error message if any */}
        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
