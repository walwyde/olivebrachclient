import React, { useEffect, Fragment } from "react";
import "material-icons/iconfont/material-icons.css";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./css/content_page.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Landing from "./components/Landing";
import Content from "./components/Content";
import NotFound from "./components/NotFound";
import Navbar from "./components/layouts/Navbar";
import ErrMessage from "./components/layouts/404";
import Resources from "./components/Resources";
import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import CreateUserProfile from "./components/Forms/CreateUserProfile";
import EditProfile from "./components/Forms/EditProfile";
import EditStaffProfile from "./components/Forms/EditStaffProfile";
import CreateStaffProfile from "./components/Forms/CreateStaffProfile";
import { ToastContainer } from "react-toastify";
import Appointments from "./components/appointments/Appointments";
import Appointment from "./components/appointments/Appointment";
import Dashboard from "./components/Dashboard";
import ProfileView from "./components/ProfileView";
import Messages from "./components/messaging/Messages";
import Conversation from "./components/messaging/Conversation";
import Alerts from "./components/layouts/Alerts";
import PrivateRoute from "./components/layouts/PrivateRoute";
import UpdatePassword from "./components/Forms/UpdatePassword";
import EditAvatar from "./components/Forms/EditAvatar";

import { loadUser } from "./Actions/auth";
import { loadNewMessages } from "./Actions/messaging";
import { getBookedAppointments } from "./Actions/appointment";
import Footer from "./components/layouts/Footer";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getBookedAppointments());
    M.AutoInit();
  }, [loadNewMessages]);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alerts />
          <div className="container">
            <Switch>
              <PrivateRoute
                exact
                path="/edit-avatar/:id"
                component={EditAvatar}
              />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateUserProfile}
              />
              <PrivateRoute
                exact
                path="/create-staff-profile"
                component={CreateStaffProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile/:id"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/edit-staff-profile/:id"
                component={EditStaffProfile}
              />
              <Route
                exact
                path="/reset-password/:token"
                component={UpdatePassword}
              />

              <PrivateRoute
                exact
                path="/appointments"
                component={Appointments}
              />
              <PrivateRoute
                exact
                path="/appointments/:id"
                component={Appointment}
              />
              <PrivateRoute exact path="/messages" component={Messages} />
              <PrivateRoute
                exact
                path="/messages/:id"
                component={Conversation}
              />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/404" component={ErrMessage} />
              <Route exact path="/content" component={Content} />
              <Route exact path="/profile/:id" component={ProfileView} />
              <Route exact path="/resources" component={Resources} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/not-found" component={NotFound} />
            </Switch>
            <ToastContainer />
          </div>
          <Route exact path="/" component={Landing} />
          < Footer />
        </Fragment>
        {/* <Redirect to="/not-found" /> */}
      </Router>
    </Provider>
  );
};

export default App;
