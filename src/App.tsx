import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Layout, Button } from 'antd';
import store from './store';
import Todos from './pages/Todos';
import Login from './pages/Login';
import { RootState } from './reducers';
import { logout } from './reducers/auth';

const { Header, Content } = Layout;

const Greeting = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const name = useSelector((state: RootState) => state.auth.name);
  const dispatch = useDispatch();

  if (isLoggedIn)
    return (
      <p>
        Hello, {name}!{' '}
        <Button size="small" onClick={e => dispatch(logout())}>
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
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

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
    <Provider store={store}>
      <Router>
        <Layout>
          <Header style={{ background: '#ffffff' }}>
            <Greeting />
          </Header>
          <Content style={{ background: '#ffffff', padding: '0 50px' }}>
            <Switch>
              <PrivateRoute path="/todos" exact>
                <Todos />
              </PrivateRoute>
              <Route path="/" exact>
                <Login />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
