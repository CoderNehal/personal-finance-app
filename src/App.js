import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Auth from './components/Auth/Auth'
import Login from "./components/Login/Login";
import ToRedirect from "./components/ToRedirect/ToRedirect";
import AddMoney from "./components/Home/AddMoney/AddMoney";


const App = () => {

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        Auth.getAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );

  return (
    <Router>
      <div className=' bg-secondary h-screen m-0 text-white '>
        <Navbar />
        <Switch>
          <Route path='/home' exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={ToRedirect} />
          <Route path='/add-money' component={AddMoney} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
