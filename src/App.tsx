import { Home, Project } from 'pages';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ScrollToTop } from './components';

export default function App() {
  const router = createBrowserRouter([
    {
      element: <ScrollToTop />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/project/:id',
          element: <Project />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
