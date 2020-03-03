import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import { HomePage } from '../../pages';

interface IProps {
  [x: string]: any;
}

export const AppRouter: FC<IProps> = (props) => {
  return (
    <Switch>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  );
};

AppRouter.defaultProps = {};

