import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

//Route middlewares
import CustomRouter from './CustomRouter';
import { ProtectedRoute } from './RouteWrapper';

//Context
import { AuthProvider } from './context/auth';

//Pages
import Dashboard from './pages/dashboard';
import Login from './pages/login';

import './App.css';

function App() {
  const history = createBrowserHistory();
  const [expandedHeader, setExpandedHeader] = useState(false);

  const redirect = (path) => {
    history.push(path);
  };

  return (
    <AuthProvider redirect={redirect}>
      <CustomRouter history={history}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                component={<Dashboard expandedHeader={expandedHeader} />}
                expandedHeader={expandedHeader}
                setExpandedHeader={setExpandedHeader}
              />
            }
          />

          <Route path="/" element={<Login />} />
        </Routes>
      </CustomRouter>
    </AuthProvider>
  );
}

export default App;
