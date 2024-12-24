import { useEffect, useMemo, useState } from 'react';
import { Search, Plus, Loader2 } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserStore } from '../../stores/userStore';

export const TeamMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { getAccessTokenSilently } = useAuth0();
  const { fetchAllUsers, users, isLoading } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        await fetchAllUsers(token);
      } catch (err) {
        console.error("Error fetching token:", err);
      }
    };

    fetchData();
  }, [getAccessTokenSilently, fetchAllUsers]);

  const filteredMembers = useMemo(() => {
    return users.filter(
      member =>
        member.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <Loader2 className="h-5 w-5 text-gray-600 animate-spin" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">Loading users...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Team Members</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-5 w-5" />
          Add team member
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th> */}
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member?.first_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member?.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.email}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.role}
                </td> */}
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    member.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {member.status}
                  </span>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-sm font-medium text-gray-900 mb-4">Role Descriptions</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li><strong>Admin:</strong> Can manage projects/designs/reports and company information including billing and users</li>
          <li><strong>Maintainer:</strong> Can manage projects/designs/reports but cannot see or edit billing details and users</li>
          <li><strong>Viewer:</strong> Can view projects and reports but cannot edit project data or see billing details and users</li>
        </ul>
      </div> */}
    </div>
  );
};