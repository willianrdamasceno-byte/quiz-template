
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-tighter text-sm border-2";
  
  const variants = {
    primary: "bg-[#00ff41] text-black border-[#00ff41] hover:bg-black hover:text-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.4)]",
    secondary: "bg-black text-[#bc13fe] border-[#bc13fe] hover:shadow-[0_0_15px_rgba(188,19,254,0.4)]",
    outline: "border-[#00ff41]/50 text-[#00ff41]/80 hover:border-[#00ff41] hover:text-[#00ff41] bg-transparent",
    danger: "bg-red-900/20 border-red-500 text-red-500 hover:bg-red-500 hover:text-black"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {"> "} {children}
    </button>
  );
};
