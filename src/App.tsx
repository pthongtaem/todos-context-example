import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Layout, Button } from 'antd';
import Todos from './pages/Todos';
import Login from './pages/Login';
import { AuthProvider, useAuthContext, logout } from './context/AuthContext';
import { TodosProvider } from './context/TodosContext';
import { VisibilityFilterProvider } from './context/VisibilityFilterContext';

const { Header, Content } = Layout;

const Greeting = () => {
  const { auth, dispatch } = useAuthContext();

  const isLoggedIn = auth?.isLoggedIn;
  const name = auth?.name;

  if (isLoggedIn)
    return (
      <p>
        Hello, {name}!{' '}
        <Button size="small" onClick={e => dispatch!(logout())}>
          Logout
        </Button>
      </p>
    );
  return <p>You are not logged in</p>;
};

const PrivateRoute: React.FC<{ path: string; exact?: boolean }> = ({
  children,
  ...rest
}) => {
  const { auth } = useAuthContext();
  const isLoggedIn = auth?.isLoggedIn;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Header style={{ background: '#ffffff' }}>
            <Greeting />
          </Header>
          <Content style={{ background: '#ffffff', padding: '0 50px' }}>
            <Switch>
              <PrivateRoute path="/todos" exact>
                <TodosProvider>
                  <VisibilityFilterProvider>
                    <Todos />
                  </VisibilityFilterProvider>
                </TodosProvider>
              </PrivateRoute>
              <Route path="/" exact>
                <Login />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
