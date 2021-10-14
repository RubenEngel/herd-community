import React from 'react';

function Button(props) {
  return (
    <button
      {...props}
      className='bg-primary text-md text-secondary py-1 px-3 rounded-md m-2 focused:outline-none"'
    >
      {props.children}
    </button>
  );
}

export default Button;
