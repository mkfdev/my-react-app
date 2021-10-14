import { Route } from 'react-router';
import './App.css';
import Home from './components/Home/Home';
import Join from './components/Join/Join';
import Login from './components/Login/Login';
import PetInfo from './components/PetInfo/PetInfo';

function App() {
  return (
    <div>
      <Route path="/" component={Home} exact={true} />
      <Route path="/login" component={Login} />
      <Route path="/join" component={Join} />
      <Route path="/petInfo" component={PetInfo} />
    </div>
  );
}

export default App;
