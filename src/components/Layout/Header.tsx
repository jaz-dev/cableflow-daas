import { useAuth } from '../../hooks/useAuth';
import { CableFlowLogo } from '../CableFlowLogo';

export const Header = () => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-between">
      <CableFlowLogo className="h-8 w-auto" />
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</div>
            <div className="text-xs text-gray-500">{user?.company}</div>
          </div>
        </div>
      </div>
    </header>
  );
};