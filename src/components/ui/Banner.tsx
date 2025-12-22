import React from 'react';
import { Link } from 'react-router-dom';

interface BannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonLink?: string;
  height?: 'small' | 'medium' | 'large';
}

const Banner: React.FC<BannerProps> = ({ 
  title, 
  subtitle, 
  backgroundImage,
  buttonText,
  buttonLink,
  height = 'medium'
}) => {
  const heightClasses = {
    small: 'py-16',
    medium: 'py-24',
    large: 'py-32 md:py-40'
  };

  return (
    <div 
      className={`relative bg-gradient-to-r from-green-forest to-green-medium ${heightClasses[height]} overflow-hidden`}
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(0, 75, 151, 0.7), rgba(28, 81, 55, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : {}}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-loose tracking-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {subtitle}
            </p>
          )}
          {buttonText && buttonLink && (
            <Link
              to={buttonLink}
              className="inline-block bg-copper hover:bg-copper/90 text-blue-black font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;