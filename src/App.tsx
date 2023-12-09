import { Home, Project } from 'pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/project/:id',
      element: <Project />,
    },
  ]);

  return <RouterProvider router={router} />;
}
