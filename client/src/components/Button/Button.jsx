import React from 'react';

const Button = ({
  type = 'button',
  variant = 'primary', 
  size = 'md',
  onClick,
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium focus:outline-none transition ease-in-out duration-150';
  
  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800',
    normal:'bg-white text-black hover:bg-black hover:text-white border border-gray-400 ',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-2 text-md',
    xl:'px-10 py-2 text-md'
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
