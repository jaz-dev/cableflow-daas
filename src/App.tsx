import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './providers/AuthProvider';
import { MainLayout } from './components/Layout/MainLayout';
import { PersonalInfo } from './pages/account/PersonalInfo';
import { BlankPage } from './pages/BlankPage';
import { Cables } from './pages/Cables';
import { Quote } from './pages/Quote';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Cables />} />
            <Route path="cables" element={<Cables />} />
            <Route path="orders" element={<BlankPage />} />
            <Route path="shipping" element={<BlankPage />} />
            <Route path="account/personal" element={<PersonalInfo />} />
            <Route path="quote" element={<Quote />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;