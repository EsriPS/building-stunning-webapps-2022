/* eslint-disable react-hooks/exhaustive-deps */
import { createContext } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';

import { webmapId } from 'constants/map';

import { when } from '@arcgis/core/core/reactiveUtils';

export const MapContext = createContext();

const MapContextProvider = (props) => {
  return <MapContext.Provider value={{}}>{props.children}</MapContext.Provider>;
};

export default MapContextProvider;
