import { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CssBaseline, Container, Snackbar, Alert } from '@material-ui/core';
import AuthRoute from './components/AuthRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Create from './pages/Create';
import Edit from './pages/Edit';

const App = () => {
  const [adminUser, setAdminUser] = useState();
  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    severity: 'success',
    msg: '',
  });

  const history = useHistory();

  const handleLogin = () => {
    if (adminUser?.isLogedIn) {
      setAdminUser({});
      history.push('/');
    } else {
      history.push('/login');
    }
  };

  return (
    <>
      <CssBaseline />
      <Snackbar
        open={snackBar.isOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBar({ isOpen: false })}
      >
        <Alert severity={snackBar.severity}>{snackBar.msg}</Alert>
      </Snackbar>
      <Container maxWidth='lg'>
        <Header isLogedIn={adminUser?.isLogedIn} handleLogin={handleLogin} />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/login'>
            <Login setSnackBar={setSnackBar} setAdminUser={setAdminUser} />
          </Route>

          <AuthRoute path='/admin' isLogedIn={adminUser?.isLogedIn}>
            <Admin setSnackBar={setSnackBar} adminUser={adminUser} />
          </AuthRoute>
          <AuthRoute path='/create' isLogedIn={adminUser?.isLogedIn}>
            <Create setSnackBar={setSnackBar} adminUser={adminUser} />
          </AuthRoute>
          <AuthRoute path='/edit/:id' isLogedIn={adminUser?.isLogedIn}>
            <Edit setSnackBar={setSnackBar} adminUser={adminUser} />
          </AuthRoute>
        </Switch>
      </Container>
      <Footer description='Something here to give the footer a purpose!' />
    </>
  );
};

export default App;
