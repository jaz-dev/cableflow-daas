import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { MainLayout } from './components/Layout/MainLayout';
import { Login } from './pages/Login';
import { PersonalInfo } from './pages/account/PersonalInfo';
import { BlankPage } from './pages/BlankPage';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<BlankPage />} />
            <Route path="cables" element={<BlankPage />} />
            <Route path="orders" element={<BlankPage />} />
            <Route path="shipping" element={<BlankPage />} />
            <Route path="account/personal" element={<PersonalInfo />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;