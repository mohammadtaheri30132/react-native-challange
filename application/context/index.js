import React from 'react';

export var UserContext = React.createContext();
export var SetUserContext = React.createContext();
export var SetLibraryContext = React.createContext();
export var LibraryContext = React.createContext();
export var ReloadLibrary = React.createContext();
export var SetreloadLibrary = React.createContext();

const UserProvider = ({children}) => {
  const [info, setInfo] = React.useState({
    versionFor: 'bazar',
    name: '',
    username: '',
    sub: '',
    needUpdate: false,
    urlUpdate: 'chekida.com',
    image: '/media/profile_image/2021/07/29/9ac9fdb7-288.jpg',
  });
  const [Library, setLibrary] = React.useState([]);
  const [reloadLibrary, setreloadLibrary] = React.useState(false);
  return (
    <UserContext.Provider value={info}>
      <SetUserContext.Provider value={setInfo}>
        <LibraryContext.Provider value={Library}>
          <SetLibraryContext.Provider value={setLibrary}>
            <ReloadLibrary.Provider value={reloadLibrary}>
              <SetreloadLibrary.Provider value={setreloadLibrary}>
                {children}
              </SetreloadLibrary.Provider>
            </ReloadLibrary.Provider>
          </SetLibraryContext.Provider>
        </LibraryContext.Provider>
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
};
export default UserProvider;
