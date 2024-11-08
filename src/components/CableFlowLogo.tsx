import React from 'react';
import { Zap } from 'lucide-react';

export const CableFlowLogo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Zap className="text-blue-600" />
      <span className="font-bold text-xl">
        Cable<span className="text-blue-600">Flow</span>
      </span>
    </div>
  );
};