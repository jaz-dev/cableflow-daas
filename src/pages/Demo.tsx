import React from 'react';
import { PlayCircle } from 'lucide-react';

export const Demo = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg">
            <PlayCircle className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Demo Project</h1>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-600">
            This is a demo project showcasing CableFlow's cable drawing design capabilities.
            Explore our features and see how we can help streamline your design process.
          </p>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Sample Features</h2>
            <ul className="space-y-2 text-gray-600">
              <li>Automated cable routing optimization</li>
              <li>Real-time collaboration tools</li>
              <li>Comprehensive design validation</li>
              <li>Detailed documentation generation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};