import { Route } from 'react-router';
import './App.scss';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PetInfo from './components/PetInfo/PetInfo';
import Register from './components/Register/Register';

function App() {
  return (
    <div className="app-wrapper">
      <Route path="/" component={Home} exact={true} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/petInfo" component={PetInfo} />
    </div>
  );
}

export default App;
