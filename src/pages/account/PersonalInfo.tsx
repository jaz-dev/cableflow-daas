import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Pencil } from 'lucide-react';

export const PersonalInfo = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Personal Information</h1>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <Pencil className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First name
            </label>
            <div className="text-gray-900">{user?.firstName}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <div className="text-gray-900">{user?.lastName}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job title
            </label>
            <div className="text-gray-900">Software Engineer</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="text-gray-900">{user?.email}</div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Change your password</h2>
          <p className="text-gray-600 mb-4">
            We'll email you a link to change your password
          </p>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Set a new password
          </button>
        </div>
      </div>
    </div>
  );
};