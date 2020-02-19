import React, { FC } from 'react';

interface IProps {
  [x: string]: any;
}

export const HomePage: FC<IProps> = (props) => {
  const {  } = props;
  return (
    <div>
      This is the home page
    </div>
  );
};

HomePage.defaultProps = {};
