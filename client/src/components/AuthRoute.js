import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ children, isLogedIn, ...other }) => {
  return (
    <Route
      {...other}
      render={() => {
        return isLogedIn ? children : <Redirect to='/login' />;
      }}
    />
  );
};

export default AuthRoute;
