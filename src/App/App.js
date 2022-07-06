// Framework and third-party non-ui
import { Routes, Route } from 'react-router-dom';

// Hooks, context, and constants
import AppRoutes from 'constants/routes';

// App pages & components
import HomePage from 'pages/HomePage';
import MapPage from 'pages/MapPage';

// Third-party components (buttons, icons, etc.)

const App = () => {
  return (
    <>
      <Routes>
        <Route path={AppRoutes.Home} element={<HomePage />} />
      </Routes>
      <MapPage />
    </>
  );
};

export default App;
