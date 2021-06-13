import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline, Container, Snackbar, Alert } from '@material-ui/core';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Create from './pages/Create';
import Edit from './pages/Edit';

const App = () => {
  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    severity: 'success',
    msg: '',
  });

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
        <Header title='siliconAddict' />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/admin'>
            <Admin setSnackBar={setSnackBar} />
          </Route>
          <Route path='/create'>
            <Create setSnackBar={setSnackBar} />
          </Route>
          <Route path='/edit/:id'>
            <Edit setSnackBar={setSnackBar} />
          </Route>
        </Switch>
      </Container>
      <Footer
        // title='Footer'
        description='Something here to give the footer a purpose!'
      />
    </>
  );
};

export default App;
