import { Home, Project, NotFound } from 'pages';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ScrollToTop } from './components';

export default function App() {
  const router = createBrowserRouter([
    {
      element: <ScrollToTop />,
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/project/:id',
          element: <Project />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
