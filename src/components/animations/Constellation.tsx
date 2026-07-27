import React from 'react';

export default function Constellation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40 mix-blend-screen">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        
        {/* Inner Orbit */}
        <path 
          id="orbit1" 
          d="M 500,500 m -350,0 a 350,350 0 1,1 700,0 a 350,350 0 1,1 -700,0" 
          fill="none" 
          stroke="rgba(243,200,146,0.1)" 
          strokeWidth="1" 
          strokeDasharray="4,8" 
        />
        <circle r="3" fill="#f3c892" style={{ filter: 'drop-shadow(0 0 6px #f3c892)' }}>
          <animateMotion dur="45s" repeatCount="indefinite">
            <mpath href="#orbit1" />
          </animateMotion>
        </circle>

        {/* Outer Orbit (Reverse direction) */}
        <path 
          id="orbit2" 
          d="M 500,500 m -550,0 a 550,550 0 1,0 1100,0 a 550,550 0 1,0 -1100,0" 
          fill="none" 
          stroke="rgba(243,200,146,0.05)" 
          strokeWidth="1" 
        />
        <circle r="2" fill="#e5b980" style={{ filter: 'drop-shadow(0 0 4px #e5b980)' }}>
          <animateMotion dur="70s" repeatCount="indefinite">
            <mpath href="#orbit2" />
          </animateMotion>
        </circle>
        
        {/* Linear Path */}
        <path 
          id="line1" 
          d="M -200,800 L 1200,200" 
          fill="none" 
          stroke="rgba(243,200,146,0.05)" 
          strokeWidth="1" 
        />
        <circle r="2" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 4px #ffffff)' }}>
           <animateMotion dur="25s" repeatCount="indefinite">
             <mpath href="#line1" />
           </animateMotion>
        </circle>
        
        {/* Subtle decorative crosses */}
        <path d="M 150,500 L 150,510 M 145,505 L 155,505" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <path d="M 850,200 L 850,210 M 845,205 L 855,205" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      </svg>
    </div>
  );
}
