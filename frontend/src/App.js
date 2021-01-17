import './App.css';
import {Button} from '@material-ui/core'
import MiniDrawer from './Drawer';

function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <MiniDrawer></MiniDrawer>
    </div>
  );
}

export default App;
