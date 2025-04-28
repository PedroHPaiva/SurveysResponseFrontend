/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import React from 'react';
import { Router } from 'react-router-dom';

export default function CustomRouter({ basename, children, history }) {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
}
