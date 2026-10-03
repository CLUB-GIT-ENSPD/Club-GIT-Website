import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { ModalProvider } from './ModalContext';
import { HomePage } from '../pages/HomePage';
import { ClubPage } from '../pages/ClubPage';
import { TracksPage } from '../pages/TracksPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { BureauPage } from '../pages/BureauPage';
import { ServicesPage } from '../pages/ServicesPage';
import { GalleryPage } from '../pages/GalleryPage';
import { JoinPage } from '../pages/JoinPage';

export const router = createBrowserRouter([
  {
    // Shared shell: Navbar + Footer + mobile nav + global modals.
    element: (
      <ModalProvider>
        <Layout />
      </ModalProvider>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'club', element: <ClubPage /> },
      { path: 'filieres', element: <TracksPage /> },
      { path: 'projets', element: <ProjectsPage /> },
      { path: 'bureau', element: <BureauPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'galerie', element: <GalleryPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
  {
    // Standalone page with its own header (no site shell).
    path: 'rejoindre',
    element: <JoinPage />,
  },
]);
