import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-black focus:ring-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-secondary text-white hover:bg-primary focus:ring-secondary shadow-md hover:shadow-lg hover:-translate-y-0.5',
    cta: 'bg-cta text-white hover:bg-yellow-700 focus:ring-cta shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    ghost: 'bg-transparent text-primary hover:bg-gray-100 focus:ring-gray-200 border border-transparent hover:border-gray-200',
    outline: 'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white focus:ring-primary',
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (props.href) {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
