import { createRoot } from 'react-dom/client'
import App from './comps/App.jsx'
import './css/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './comps/NotFound.jsx';
import { UserProvider } from './context/UserProvider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
)
