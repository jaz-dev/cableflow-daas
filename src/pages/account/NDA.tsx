import React from 'react';
import { FileText, Download } from 'lucide-react';

export const NDA = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Non-Disclosure Agreement</h1>
        <p className="text-gray-600">
          View and download your signed NDA or request a new one
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 bg-blue-100 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-1">
              CableFlow NDA
            </h2>
            <p className="text-sm text-gray-600">
              Last signed: February 15, 2024
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Download className="h-5 w-5" />
            Download signed NDA
          </button>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Request new NDA
          </button>
        </div>
      </div>
    </div>
  );
};