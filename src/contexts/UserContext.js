import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [ready, setReady] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [oauthInfo, setOauthInfo] = useState(null);

  async function loadDirections() {
    const { initDirections } = await import('data/map');
    initDirections();
  }

  useEffect(() => {
    setReady(true);     
    if (userInfo) {
      loadDirections();
    }
  }, [userInfo]);

  return (
    <UserContext.Provider
      value={{ ready, userInfo, setUserInfo, oauthInfo, setOauthInfo }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
