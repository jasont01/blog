import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import axios from 'axios';
import Editor from '../components/Editor';

const Create = ({ setSnackBar, adminUser }) => {
  const [redirect, setRedirect] = useState('');

  const createNewPost = (post) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/admin/post`, post, {
        headers: { Authorization: `Bearer ${adminUser.token}` },
      })
      .then((res) => {
        setSnackBar({
          isOpen: true,
          severity: 'success',
          msg: 'Blog post successfully created',
        });
        setRedirect('/admin');
      })
      .catch((err) => {
        setSnackBar({
          isOpen: true,
          severity: 'error',
          msg: `Error: ${err.response.data.error}`,
        });
      });
  };

  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <Box mt={3}>
      <Box display='flex'>
        <Typography variant='h4' sx={{ margin: 'auto' }}>
          Create Blog Post
        </Typography>
      </Box>
      <Editor handleSubmit={createNewPost} />
    </Box>
  );
};

export default Create;
