import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Login } from './pages/auth/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import { useAuthStore } from './store/authStore';

// Real Page Components
import { ManageUsers } from './pages/teacher/ManageUsers';
import { CreateTest } from './pages/teacher/CreateTest';
import { TeacherDashboard } from './pages/teacher/Dashboard';
import { ResultsAnalytics } from './pages/teacher/ResultsAnalytics';
import { ThemeShowcase } from './pages/ThemeShowcase';
import { AvailableTests } from './pages/learner/AvailableTests';
import { TakeTest } from './pages/learner/TakeTest';
import { MyResults } from './pages/learner/Results';
import { LearnerDashboard } from './pages/learner/Dashboard';
import { SettingsPage } from './pages/learner/Settings';
import { NotificationCreator } from './pages/teacher/Notifier';
import { NotificationViewer } from './pages/learner/Notifications';
import LibraryWidget from './pages/learner/Library';

const TestAnalytics = () => <ResultsAnalytics />;
const PersonalAnalytics = () => <LearnerDashboard />;

const DashboardSwitch = () => {
  const { user } = useAuthStore();
  if (user?.rank === 'teacher') return <TeacherDashboard />;
  return <LearnerDashboard />;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/themes',
    element: <ThemeShowcase />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardSwitch />,
      },
      // Teacher Routes
      {
        path: 'create-test',
        element: <ProtectedRoute allowedRanks={['teacher']}><CreateTest /></ProtectedRoute>,
      },
      {
        path: 'manage-users',
        element: <ProtectedRoute allowedRanks={['teacher']}><ManageUsers /></ProtectedRoute>,
      },
      {
        path: 'results-analytics',
        element: <ProtectedRoute allowedRanks={['teacher']}><ResultsAnalytics /></ProtectedRoute>,
      },
      {
        path: 'test-analytics',
        element: <ProtectedRoute allowedRanks={['teacher']}><TestAnalytics /></ProtectedRoute>,
      },
      {
        path: 'notifier',
        element: <ProtectedRoute allowedRanks={['teacher']}><NotificationCreator /></ProtectedRoute>,
      },
      {
        path: 'my_notifications',
        element: <ProtectedRoute allowedRanks={['teacher']}><NotificationViewer /></ProtectedRoute>,
      },
      {
        path: 'admin_settings',
        element: <ProtectedRoute allowedRanks={['teacher']}><SettingsPage /></ProtectedRoute>,
      },
      {
        path: 'my_library',
        element: <ProtectedRoute allowedRanks={['teacher']}><LibraryWidget /></ProtectedRoute>,
      },




      // Learner Routes
      {
        path: 'tests',
        element: <ProtectedRoute allowedRanks={['learner']}><AvailableTests /></ProtectedRoute>,
      },
      {
        path: 'take-test/:testId',
        element: <ProtectedRoute allowedRanks={['learner']}><TakeTest /></ProtectedRoute>,
      },
      {
        path: 'results',
        element: <ProtectedRoute allowedRanks={['learner']}><MyResults /></ProtectedRoute>,
      },
      {
        path: 'notifications',
        element: <ProtectedRoute allowedRanks={['learner']}><NotificationViewer /></ProtectedRoute>,
      },
      {
        path: 'personal_settings',
        element: <ProtectedRoute allowedRanks={['learner']}><SettingsPage /></ProtectedRoute>,
      },
      {
        path: 'library',
        element: <ProtectedRoute allowedRanks={['teacher']}><LibraryWidget /></ProtectedRoute>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <>
        <Toaster
          position="top-center"
          richColors
          duration={3000}
        />

        <RouterProvider router={router} />
      </>
    </AuthProvider>
  );
}
