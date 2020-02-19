import React, { FC } from 'react';

interface IProps {
  [x: string]: any;
}

const HomePage: FC<IProps> = (props) => {
  const {  } = props;
  return (
    <div>
      This is the home page
    </div>
  );
};

HomePage.defaultProps = {};

export default HomePage;
