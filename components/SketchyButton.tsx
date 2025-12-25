
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'neutral';
}

export const SketchyButton: React.FC<Props> = ({ children, className = '', variant = 'primary', ...props }) => {
  const bgColors = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    neutral: 'bg-white',
  };

  return (
    <button
      className={`
        relative group px-6 py-2 font-hand text-xl font-bold text-ink
        transition-transform hover:-translate-y-1 active:translate-y-0
        ${className}
      `}
      {...props}
    >
      <div className={`absolute inset-0 ${bgColors[variant]} border-2 border-ink rounded-lg rough-border transform group-hover:rotate-1 transition-transform`}></div>
      <div className="absolute inset-0 border-2 border-ink rounded-lg rough-border opacity-50 transform translate-x-1 translate-y-1"></div>
      <span className="relative z-10">{children}</span>
    </button>
  );
};
