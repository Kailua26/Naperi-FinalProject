import React from 'react';
import { Link } from 'react-router-dom'; // For client-side routing

function Header() {
  return (
    <>
      <header>
        <h1>
          <Link to="/blogs">BLOG NI NAPERI</Link>
        </h1>
        <nav>
          <Link to="/blogs">Home</Link>
          <Link to="/blogs/new">Create Blog</Link>
        </nav>
      </header>
      <main>
      </main>
    </>
  );
}

export default Header;
