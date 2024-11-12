import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { Home } from './pages/Home';
import { Demo } from './pages/Demo';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { Plan } from './pages/account/Plan';
import { PersonalInfo } from './pages/account/PersonalInfo';
import { TeamMembers } from './pages/account/TeamMembers';
import { NDA } from './pages/account/NDA';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="demo" element={<Demo />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="account/plan" element={<Plan />} />
          <Route path="account/personal" element={<PersonalInfo />} />
          <Route path="account/team" element={<TeamMembers />} />
          <Route path="account/nda" element={<NDA />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;