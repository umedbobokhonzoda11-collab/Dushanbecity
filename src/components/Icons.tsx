import React from 'react';

// DC Wallet Brand Logo
export const DCLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background shape */}
      <circle cx="50" cy="50" r="45" fill="#F4F8FD" />
      
      {/* Stylized D (Blue) */}
      <path 
        d="M32 30H46C56 30 62 36 62 48C62 60 56 66 46 66H32V30ZM42 58H45C51 58 54 55 54 48C54 41 51 38 45 38H42V58Z" 
        fill="#0079FF" 
      />
      
      {/* Stylized C (Orange) overlapping slightly */}
      <path 
        d="M68 38C65 33 59 31 52 32C50.5 32.5 50 34 51 35.5C51.5 36.5 53 37 54.5 36.5C59 35.5 62 38 63 42C64.5 48 61 54 55 54.5C53.5 54.5 52 55.5 51.5 57C51 58.5 52 60 53.5 60C62 59 69 52 69 44C69 41.5 68.5 39.5 68 38Z" 
        fill="#FF7E00" 
      />
      
      {/* Little tag/star */}
      <rect x="42" y="46" width="6" height="4" rx="1" fill="#FF7E00" />
      <span className="sr-only">DC Logo</span>
    </svg>
  );
};

// Neru service logo (Green circular badge with energetic leaf energy indicator)
export const NeruLogo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="45" fill="#3AA757" />
      {/* Elegant Leaf/Lightning fusion */}
      <path 
        d="M50 20C33.4 20 25 35 25 50C25 68 37 80 50 80C63 80 75 68 75 50C75 25 50 20 50 20ZM40 55L55 35L48 50H58L42 65L47 52H40V55Z" 
        fill="white" 
      />
    </svg>
  );
};

// Parking service logo (Blue circular concentric P badge with mock red indicator)
export const ParkingLogo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => {
  return (
    <div className="relative">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="50" cy="50" r="45" fill="#1861D5" />
        {/* Concentric targets representing parking spot selection */}
        <circle cx="50" cy="50" r="30" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="4" />
        <circle cx="50" cy="50" r="22" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="2" />
        {/* P character in white */}
        <path d="M43 33H53C58 33 61 36 61 40.5C61 45 58 48 53 48H47V65H43V33ZM47 44H52.5C54.5 44 56.5 43 56.5 40.5C56.5 38 54.5 37 52.5 37H47V44Z" fill="white" />
      </svg>
      {/* Red notification dot exactly as shown in the screenshot */}
      <span className="absolute -top-[1px] -right-[1px] w-3.5 h-3.5 bg-[#FF3B30] border-2 border-white rounded-full animate-pulse shadow-md" />
    </div>
  );
};

// Shohin marketplace/courier logo (Orange with elegant high-speed falcon bird)
export const ShohinLogo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="45" fill="#F27E2B" />
      {/* High-speed Falcon symbol inside */}
      <path 
        d="M32 35C45 35 55 42 62 48C55 50 48 48 40 46C52 50 64 54 70 60C60 62 48 58 35 52C42 56 46 62 48 68C42 62 38 54 32 35Z" 
        fill="white" 
      />
    </svg>
  );
};

// PiggyBank/Wallet cartoon icon for payment card
export const PaymentIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Base shadows */}
      <ellipse cx="50" cy="85" rx="35" ry="10" fill="rgba(0, 110, 255, 0.06)" />
      {/* Main pocket pouch layer (translucent gradient) */}
      <path 
        d="M20 50C20 40 30 35 50 35C70 35 80 40 80 50V75C80 82 70 85 50 85C30 85 20 82 20 75V50Z" 
        fill="url(#clayGradient)" 
        stroke="#9CCAFF" 
        strokeWidth="1.5"
      />
      {/* Front card insertion slot */}
      <path 
        d="M25 58C35 62 65 62 75 58" 
        stroke="#FFFFFF" 
        strokeWidth="4" 
        strokeLinecap="round" 
        opacity="0.8"
      />
      {/* Soft overlay flap */}
      <path 
        d="M30 35C30 35 40 45 50 45C60 45 70 35 70 35" 
        stroke="#A5D1FF" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      <defs>
        <radialGradient id="clayGradient" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#D4E9FF" />
          <stop offset="100%" stopColor="#82BFFF" />
        </radialGradient>
      </defs>
    </svg>
  );
};

// Quick yellow credit card icon
export const CreditCardIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g filter="url(#shadowCard)">
        <rect x="15" y="32" width="70" height="46" rx="8" fill="#FCCE33" />
        {/* Chip */}
        <rect x="25" y="42" width="12" height="10" rx="2" fill="#E6A817" />
        {/* Visa / Master symbol layout */}
        <circle cx="64" cy="62" r="7" fill="#E6A817" opacity="0.8" />
        <circle cx="71" cy="62" r="7" fill="#E6A817" opacity="0.6" />
        {/* Stripe */}
        <rect x="15" y="56" width="70" height="3" fill="#DF9F10" />
      </g>
      <defs>
        <filter id="shadowCard" x="10" y="28" width="80" height="56" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#B89000" floodOpacity="0.2" />
        </filter>
      </defs>
    </svg>
  );
};

// Alif Mobi Logo with high-fidelity path details matching screenshot
export const AlifLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="46" fill="#10B981" />
      {/* Dynamic crescent/A curve */}
      <path 
        d="M50 25C36 25 25 36 25 50C25 64 36 75 50 75C59.5 75 67.5 69.5 71.5 61.5" 
        stroke="white" 
        strokeWidth="7.5" 
        strokeLinecap="round" 
      />
      {/* Alif arrow stem inside */}
      <path 
        d="M50 48V75" 
        stroke="white" 
        strokeWidth="7.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M50 48L65 33" 
        stroke="white" 
        strokeWidth="7.5" 
        strokeLinecap="round" 
      />
    </svg>
  );
};

// Anor Pomegranate Logo with high-fidelity path details matching screenshot
export const AnorLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* White circle card base */}
      <circle cx="50" cy="50" r="46" fill="white" />
      {/* Blue border ring */}
      <circle cx="50" cy="50" r="42" stroke="#0056C6" strokeWidth="2.5" />
      
      {/* Pomegranate body path */}
      <path 
        d="M50 28C39 29 34 38 34 49C34 61 41.5 69 50 69C58.5 69 66 61 66 49C66 38 61 29 50 28Z" 
        fill="#0056C6" 
      />
      
      {/* Crown elements on top of pomegranate */}
      <path 
        d="M44 28 L40 21 L47 25 Z" 
        fill="#0056C6" 
      />
      <path 
        d="M50 28 L50 19 L54 26 Z" 
        fill="#0056C6" 
      />
      <path 
        d="M56 28 L60 21 L53 25 Z" 
        fill="#0056C6" 
      />
      
      {/* Inside elegant loop structure representing pomegranate seeds and letter A */}
      <path 
        d="M50 62C46.5 58.5 43.5 53.5 44 48C44.5 42.5 49 40.5 50 45C51 40.5 55.5 42.5 56 48C56.5 53.5 53.5 58.5 50 62Z" 
        fill="white" 
      />
      
      {/* Central loop node connections */}
      <circle cx="50" cy="49" r="2.5" fill="#0056C6" />
      <circle cx="47" cy="54" r="2" fill="#0056C6" />
      <circle cx="53" cy="54" r="2" fill="#0056C6" />
    </svg>
  );
};
