import React from 'react';
import { useAuth } from '@/firebase/auth';
import { GoSignOut } from 'react-icons/go';

const Logout = () => {
  const { signOut } = useAuth();
  return (
    <div
      className="bg-black text-white w-44 py-4 mt-10 z-50 rounded-lg transition-transform hover:bg-black/[0.8] active:scale-90 flex items-center justify-center gap-2 font-medium shadow-md fixed bottom-5 right-5 cursor-pointer"
      onClick={signOut}
    >
      <GoSignOut size={18} />
      <span>Logout</span>
    </div>
  );
};

export default Logout;
