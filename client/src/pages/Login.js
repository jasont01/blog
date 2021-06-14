import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Redirect } from 'react-router';

const Login = ({ setSnackBar, setAdminUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState();

  const handleSubmit = () => {
    const request = { username, password };
    axios
      .post(`${process.env.REACT_APP_API_URL}/authenticate`, request)
      .then((res) => {
        const { username, token } = res.data;
        setAdminUser({ isLogedIn: true, username, token });
        setRedirect('/admin');
      })
      .catch((err) => {
        setSnackBar({
          isOpen: true,
          severity: 'error',
          msg: `Error: Login Invalid`,
        });
      });
  };

  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <Container component='main' maxWidth='xs'>
      <Box mt={5}>
        <Avatar sx={{ margin: 'auto' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>

        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='username'
          label='Username'
          name='username'
          autoComplete='username'
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
