// src/components/NavBar.js

import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">StockApp</div>
        <div className="flex space-x-4">
          <Link href="/" legacyBehavior>
            <a className="text-white hover:text-gray-400">Home</a>
          </Link>
          <Link href="/dashboard" legacyBehavior>
            <a className="text-white hover:text-gray-400">Dashboard</a>
          </Link>
          <Link href="/report" legacyBehavior>
            <a className="text-white hover:text-gray-400">Report</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
