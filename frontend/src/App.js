import './App.css';
import MiniDrawer from './Drawer';
import React from 'react'
import { Login } from './components/Login';
import { AuthContext, SetReloadContext } from './contexts'
import { SnackbarProvider } from 'notistack';

function App() {
  const [auth, setAuth] = React.useState({
    haslogin: false,
    name: '',
    password: '',
    identity: "User"
  });
  const {reload, setReload} = React.useState(false)

  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <AuthContext.Provider value={auth}>
        <SetReloadContext.Provider value={setReload}>
          <SnackbarProvider maxSnack={3}>
            {auth.haslogin ? (
              <MiniDrawer setAuth={setAuth} reload={reload} />
            ) : (
                <Login setAuth={setAuth} />
              )}
          </SnackbarProvider>
        </SetReloadContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
