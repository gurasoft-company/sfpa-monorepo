import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';

import LoginPage from '@/pages/Login';
import DashboardPage from '@/pages/Dashboard';
import MediaPage from '@/pages/Media';
import DonationsPage from '@/pages/Donations';
import NotFoundPage from '@/pages/NotFound';
import ProjectsPage from '@/pages/Projects';
import FormationsPage from '@/pages/Formations';
import PartnersPage from '@/pages/Partners';
import TestimonialsPage from '@/pages/Testimonials';
import ContactsPage from '@/pages/Contacts';
import MembersPage from '@/pages/Members';
import VolunteersPage from '@/pages/Volunteers';
import PostsPage from '@/pages/Posts';
import PagesPage from '@/pages/Pages';
import SettingsPage from '@/pages/Settings';



export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Contenu */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/pages" element={<PagesPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/formations" element={<FormationsPage />} />
        <Route path="/partners" element={<PartnersPage />} />

        {/* Formulaires */}
        
        <Route path="/members" element={<MembersPage />} />
        <Route path="/volunteers" element={<VolunteersPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />

        {/* Finance */}
        <Route path="/donations" element={<DonationsPage />} />

        {/* Système */}
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}