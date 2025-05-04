import React from 'react';
import { useRole } from '@/context/RoleContext';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const RoleToggle: React.FC = () => {
  const { role, setRole } = useRole();

  return (
    <div className="flex items-center">
      <ToggleGroup type="single" value={role} onValueChange={(value) => value && setRole(value as 'learner' | 'contributor')}>
        <ToggleGroupItem 
          value="learner" 
          className={cn(
            "px-4 py-2 rounded-l-full text-sm font-medium transition-colors",
            role === 'learner' 
              ? "bg-orange-500 text-white shadow-md" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          Learner
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="contributor" 
          className={cn(
            "px-4 py-2 rounded-r-full text-sm font-medium transition-colors",
            role === 'contributor' 
              ? "bg-orange-500 text-white shadow-md" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          Contributor
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default RoleToggle;
