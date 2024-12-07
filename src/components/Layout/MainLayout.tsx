import { Outlet } from 'react-router-dom';
import { useAuthGuard } from '../../hooks/useAuthGuard';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const MainLayout = () => {
  const { isLoading } = useAuthGuard();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};