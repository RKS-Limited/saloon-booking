import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

interface AdminLoginModalProps {
  onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AppContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      onClose();
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-sm relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[rgba(var(--color-primary))]"
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-transform transform hover:scale-105"
              style={{ backgroundColor: `rgba(var(--color-primary))`}}
            >
              Sign In
            </button>
          </div>
        </form>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
      </div>
    </div>
  );
};

export default AdminLoginModal;