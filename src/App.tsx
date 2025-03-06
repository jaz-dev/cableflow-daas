import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './providers/AuthProvider';
import { MainLayout } from './components/Layout/MainLayout';
import { PersonalInfo } from './pages/account/PersonalInfo';
import { Cables } from './pages/Cables';
import { Quote } from './pages/Quote';
import Orders from './pages/Orders';
import { Login } from './pages/Login';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/quote" element={<MainLayout />}>
            <Route index element={<Quote />} />
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Cables />} />
            <Route path="cables" element={<Cables />} />
            <Route path="orders" element={<Orders />} />
            <Route path="account/personal" element={<PersonalInfo />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;