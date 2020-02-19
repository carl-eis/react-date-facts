import React, { FC } from 'react';

interface IProps {
  [x: string]: any;
}

export const AboutPage: FC<IProps> = (props) => {
  const {  } = props;
  return (
    <div>
      This is the about page
    </div>
  );
};

AboutPage.defaultProps = {};
