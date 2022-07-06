//React
import React from 'react';
import ReactDOM from 'react-dom/client';

// React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Calcite Components React
import {
  applyPolyfills,
  defineCustomElements,
} from '@esri/calcite-components/dist/loader';
import '@esri/calcite-components/dist/calcite/calcite.css';

// App Setup
import packageJson from '../package.json';
import App from 'App';
import UserContextProvider from 'contexts/UserContext';
import MapContextProvider from 'contexts/MapContext';
import './index.css';

// App runs at the root locally, but under /{homepage} in production
let basename = '';
if (packageJson?.homepage && process.env.NODE_ENV !== 'production') {
  basename = packageJson.homepage;
}

// Apply polyfills and then define the custom elements
// polyfills are not needed if you don't support IE11 or Edge
applyPolyfills().then(() => {
  defineCustomElements(window);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <UserContextProvider>
        <MapContextProvider>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </MapContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
