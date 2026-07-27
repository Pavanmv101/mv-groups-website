import React from 'react';

interface WatermarkProps {
  text: string;
}

export default function Watermark({ text }: WatermarkProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0">
      <h2 
        className="text-[20vw] md:text-[25vw] font-black leading-none whitespace-nowrap opacity-[0.03] text-transparent"
        style={{
          WebkitTextStroke: '2px #ffffff',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {text}
      </h2>
    </div>
  );
}
