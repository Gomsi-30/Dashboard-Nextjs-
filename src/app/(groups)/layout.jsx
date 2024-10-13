import React from 'react';
import Dashboard from '../_components/Dashboard';

const Layout = ({ children }) => {
  return (
    <div className='flex '>
      <Dashboard />
      <main className='lg:ml-[22%]'>
        {children}
      </main>
    </div>
  );
}

export default Layout;
