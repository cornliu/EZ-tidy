import './App.css';
import MiniDrawer from './Drawer';
import React from 'react'
import { Login } from './components/Login';
import { AuthContext } from './contexts'
import { SnackbarProvider } from 'notistack';

function App() {
  const [auth, setAuth] = React.useState({
    haslogin: false,
    name: '',
    password: '',
    identity: "User"
  });

  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <AuthContext.Provider value={auth}>
        <SnackbarProvider maxSnack={3}>
          {auth.haslogin ? (
            <MiniDrawer setAuth={setAuth} />
          ) : (
              <Login setAuth={setAuth} />
            )}
        </SnackbarProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
