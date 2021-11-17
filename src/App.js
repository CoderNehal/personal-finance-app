import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Auth from './components/Auth/Auth'
import Login from "./components/Login/Login";
import ToRedirect from "./components/ToRedirect/ToRedirect";
import AddMoney from "./components/Home/AddMoney/AddMoney";
import SpendMoney from "./components/Home/SpendMoney/SpendMoeny";
import ViewHistory from "./components/viewHistory";
import Signup from "./components/Signup/Signup";


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

      <div className=' bg-white h-screen m-0 text-white overflow-x-hidden '>
        <Navbar isLogged={Auth.getAuth()} />
        <Switch>
          <PrivateRoute path='/home' exact component={Home} />
          <PrivateRoute path="/about" exact component={About} />
          <PrivateRoute path="/" exact component={ToRedirect} />
          <PrivateRoute path='/add-money' component={AddMoney} />
          <PrivateRoute path='/spend-money' component={SpendMoney} />
          <PrivateRoute path='/view-history' component={ViewHistory} />
          <Route path="/login" exact component={Login} />
          <Route path='/signup' component={Signup} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
