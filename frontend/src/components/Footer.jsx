import React from 'react';

const Footer = () => {
  return (
    <div className='w-full py-8 text-white text-center fixed bottom-0'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center'>
        <p className='mr-2'>Powered by Shop Circle</p>
        <img src="images/shop.png" alt="Shop Circle logo" className='w-8 h-8' />
      </div>
    </div>
  );
};

export default Footer;
