import React from 'react';
import { Switch } from 'react-router-dom';

import Blog from '@pages/Blog';
import CreateAppointment from '@pages/CreateAppointment';
import Dashboard from '@pages/Dashboard';
import ForgotPassword from '@pages/ForgotPassword';
import Profile from '@pages/Profile';
import Providers from '@pages/Providers';
import ResetPassword from '@pages/ResetPassword';
import SignIn from '@pages/SignIn';
import SignUp from '@pages/SignUp';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/blog/:slug?" component={Blog} isPrivate />

      <Route
        path="/create-appointment/:providerId"
        component={CreateAppointment}
        isPrivate
      />
      <Route path="/providers" component={Providers} isPrivate />
    </Switch>
  );
};

export default Routes;
