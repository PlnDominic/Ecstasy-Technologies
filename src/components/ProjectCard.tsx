import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  clientName: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  progress,
  dueDate,
  clientName,
}) => {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span className="text-xs font-medium bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
          {clientName}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
      
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
        <span>Due: {dueDate}</span>
        <button className="text-primary-600 font-medium hover:text-primary-800">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProjectCard; 