import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Auth from './components/Auth/Auth'
import Login from "./components/Login/Login";
import AddMoney from "./components/Home/AddMoney/AddMoney";
import SpendMoney from "./components/Home/SpendMoney/SpendMoeny";
import ViewHistory from "./components/viewHistory";
import Signup from "./components/Signup/Signup";
import TransactionDetails from "./components/TransactionDetails/TransactionDetails";
import { useState } from "react";
import NotFound from "./components/NotFound/NotFound";


const App = () => {
  const [isLogged, setisLogged] = useState(localStorage.getItem('isLogged'))
  
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

      <div className='w-screen bg-white h-screen m-0 text-white overflow-x-hidden '>
        <Navbar isLogged={Auth.getAuth()} />
        <Switch>
          <PrivateRoute path='/home' exact component={Home} />
          <PrivateRoute path="/about" exact component={About} />
          <Route path="/" exact render={() => (<Redirect to="/home" />)} />
          <PrivateRoute path='/add-money' component={AddMoney} />
          <PrivateRoute path='/spend-money' component={SpendMoney} />
          <PrivateRoute path='/view-history' component={ViewHistory} />
          <PrivateRoute path='/transaction-details' component={TransactionDetails} />
          <Route path="/login" exact render={() => isLogged == 'true' ? <><Navbar /><Home /></> : <Login />} />
          <Route path='/signup' exact render={() => isLogged == 'true' ? <><Navbar /><Home /></> : <Signup />} />

          <Route path="" component={NotFound} />
          {/* for 404 */}

        </Switch>
      </div>
    </Router>
  );
}

export default App;
