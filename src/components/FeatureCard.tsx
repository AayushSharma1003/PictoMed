
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: 'blue' | 'green';
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  color = 'blue',
  delay = 0
}) => {
  const bgColor = color === 'blue' ? 'bg-picto-blue-light' : 'bg-picto-green-light';
  const iconColor = color === 'blue' ? 'text-picto-blue-dark' : 'text-picto-green-dark';
  
  return (
    <div 
      className="feature-card flex flex-col items-center text-center"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mb-6`}>
        <Icon className={`h-8 w-8 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-medium text-picto-gray-dark mb-3">{title}</h3>
      <p className="text-picto-gray-medium">{description}</p>
    </div>
  );
};

export default FeatureCard;
