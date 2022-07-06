// Framework and third-party non-ui
import { Routes, Route } from 'react-router-dom';

// Hooks, context, and constants
import AppRoutes from 'constants/routes';

// App pages & components
import ComingSoon from 'components/ComingSoon';
import NoMatch from 'pages/NoMatch';

// Third-party components (buttons, icons, etc.)

const App = () => {
  return (
    <>
      <Routes>
        <Route path={AppRoutes.Home} element={<ComingSoon />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
