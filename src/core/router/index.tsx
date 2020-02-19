import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  AboutPage,
  HomePage,
} from '../../pages';

interface IProps {
  [x: string]: any;
}

export const AppRouter: FC<IProps> = (props) => {
  return (
    <Switch>
      <Route path="/about">
        <AboutPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  );
};

AppRouter.defaultProps = {};

