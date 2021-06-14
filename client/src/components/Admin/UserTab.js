import { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import axios from 'axios';

const UserTab = ({ setSnackBar, adminUser }) => {
  const [username, setUsername] = useState(adminUser.username);
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!username) return;
    const payload = password ? { username, password } : { username };
    axios
      .put(`${process.env.REACT_APP_API_URL}/admin/user`, payload, {
        headers: { Authorization: `Bearer ${adminUser.token}` },
      })
      .then((res) =>
        setSnackBar({
          isOpen: true,
          severity: 'success',
          msg: 'User Updated',
        })
      )
      .catch((err) =>
        setSnackBar({
          isOpen: true,
          severity: 'error',
          msg: `${err}`,
        })
      );
  };

  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        id='username'
        label='Username'
        value={username}
        variant='standard'
        error={!username.length}
        helperText={!username.length && 'username cannot be empty'}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        id='password'
        label='Password'
        helperText='Leave blank to not change it'
        value={password}
        variant='standard'
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={!username.length} onClick={handleSubmit}>
        Save
      </Button>
    </Box>
  );
};

export default UserTab;
