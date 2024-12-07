import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { MainLayout } from './components/Layout/MainLayout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Demo } from './pages/Demo';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { JobDetails } from './pages/JobDetails';
import { Plan } from './pages/account/Plan';
import { PersonalInfo } from './pages/account/PersonalInfo';
import { TeamMembers } from './pages/account/TeamMembers';
import { NDA } from './pages/account/NDA';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="demo" element={<Demo />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route path="projects/:projectId/jobs/:jobId" element={<JobDetails />} />
            <Route path="account/plan" element={<Plan />} />
            <Route path="account/personal" element={<PersonalInfo />} />
            <Route path="account/team" element={<TeamMembers />} />
            <Route path="account/nda" element={<NDA />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;