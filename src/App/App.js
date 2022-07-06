// Framework and third-party non-ui
import { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

// Hooks, context, and constants
import { UserContext } from 'contexts/UserContext';
import AppRoutes from 'constants/routes';
import { clientId } from 'constants/map';
import { initialize, checkCurrentStatus } from 'data/oauth';

// App pages & components
import HomePage from 'pages/HomePage';
import MapPage from 'pages/MapPage';

// Third-party components (buttons, icons, etc.)

const App = () => {
  const { setOauthInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Initialize the Identity Manager
        // Web App Item: https://prof-services.maps.arcgis.com/home/item.html?id=28028482a1104e04a6a5cac70945a42e
        const oauthInfo = await initialize(clientId);

        // Add oauthInfo to UserContext
        setOauthInfo(oauthInfo);

        // Check to see if a user is already signed in
        const userInfo = await checkCurrentStatus(oauthInfo);
        setUserInfo(userInfo);
        if (userInfo) {
          // If user is signed in, add userInfo to UserContext
        }
      } catch (error) {
        // User is not logged in, set userInfo to undefined
        setUserInfo(undefined);
      }
    };
    initAuth();
  }, [setOauthInfo, setUserInfo]);

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
