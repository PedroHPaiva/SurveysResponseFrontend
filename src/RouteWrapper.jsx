/* eslint-disable react/prop-types */
import { useContext } from 'react';
import moment from 'moment';
import { Navigate } from 'react-router-dom';

//Context
import { AuthContext } from './context/auth';

//Components
import Header from './components/header/Header';

function renderHeader(component, expandedHeader, setExpandedHeader) {
  return window.innerWidth < 768 ? (
    <>
      <Header visible={expandedHeader} setVisible={setExpandedHeader} />
      {component}
    </>
  ) : (
    <div className="flex">
      <div className="z-5	fixed">
        <Header visible={expandedHeader} setVisible={setExpandedHeader} />
      </div>

      <div className="tableWrapper">{component}</div>
    </div>
  );
}

export const ProtectedRoute = ({
  component,
  expandedHeader,
  setExpandedHeader,
}) => {
  const { user, signOut } = useContext(AuthContext);

  function getSessionHours(user) {
    const now = moment(new Date()); // Data de hoje
    const past = moment(user.LoginTime); // Data de Login
    const duration = moment.duration(now.diff(past));

    // Mostra a diferença em horas
    const hours = duration.asHours();
    return hours;
  }

  const signed = user ? true : false;

  if (!signed) {
    return <Navigate to="/" />;
  }

  if (signed) {
    const hours = getSessionHours(user);

    if (hours > 6) {
      signOut(history);
    }
  }

  return renderHeader(component, expandedHeader, setExpandedHeader);
};
