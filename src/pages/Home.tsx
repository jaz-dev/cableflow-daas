import { useNavigate } from 'react-router-dom';
import { FolderKanban, LineChart } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Cable<span className="text-blue-600">Flow</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Streamline your cable drawing design process with our professional services
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate('/projects')}
          className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 text-left"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FolderKanban className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">View Projects</h2>
          </div>
          <p className="text-gray-600">
            Access and manage your cable drawing projects in one place
          </p>
        </button>

        <button
          onClick={() => navigate('/account/plan')}
          className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 text-left"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <LineChart className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">View Plans</h2>
          </div>
          <p className="text-gray-600">
            Explore our flexible pricing plans and find the perfect fit for your needs
          </p>
        </button>
      </div>
    </div>
  );
};