import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-3/4 h-14 lg:h-20 px-8 lg:px-16 py-5 bg-white rounded-b-2xl shadow-[2px_2px_9px_0px_#FDF2F8]">
      <Link href="/">
        <h1 className=" text-xl lg:text-2xl font-semibold cursor-pointer ">
          AjaxNews
        </h1>
      </Link>
      <Link href="/favorite">
        {' '}
        <h1 className=" text-lg lg:text-xl font-medium cursor-pointer ">
          Favorites
        </h1>{' '}
      </Link>
    </div>
  );
};

export default Navbar;
