import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import AddUsers from "./users/pages/AddUsers";
import Dashboard from "./Dashboard";
import DisplayUsers from "./users/pages/DisplayUsers";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import AddWork from "./works/pages/AddWork";
import DisplayWorks from "./works/pages/DisplayWorks";
import UpdateWork from "./works/pages/UpdateWork";
import DeleteWork from "./works/pages/DeleteWork";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/user" exact>
          <DisplayUsers />
        </Route>
        <Route path="/user/new" exact>
          <AddUsers />
        </Route>
        <Route path="/work/new" exact>
          <AddWork />
        </Route>
        <Route path="/work/update/:workId" exact>
          <UpdateWork />
        </Route>
        <Route path="/work/delete/:workId" exact>
          <DeleteWork />
        </Route>
        <Route path="/work" exact>
          <DisplayWorks />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login" exact>
          <Auth />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <div className="wrapper ">
        <Router>{routes}</Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
