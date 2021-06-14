import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import axios from 'axios';
import Editor from '../components/Editor';

const Edit = ({ setSnackBar, adminUser }) => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => {
        setSnackBar({
          isOpen: true,
          severity: 'error',
          msg: `Error: ${err.response.data.error}`,
        });
        setRedirect('/');
      });
  }, [id, setSnackBar]);

  const updatePost = (post) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/admin/post`,
        {
          ...post,
          post_id: id,
        },
        {
          headers: { Authorization: `Bearer ${adminUser.token}` },
        }
      )
      .then((res) => {
        setSnackBar({
          isOpen: true,
          severity: 'success',
          msg: 'Blog post updated',
        });
        setRedirect('/');
      })
      .catch((err) =>
        setSnackBar({
          isOpen: true,
          severity: 'error',
          msg: `Error: ${err.response.data.error}`,
        })
      );
  };

  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <Box mt={3}>
      <Box display='flex'>
        <Typography variant='h4' sx={{ margin: 'auto' }}>
          Edit Blog Post
        </Typography>
      </Box>
      <Editor
        title={post.title}
        article={post.article}
        handleSubmit={updatePost}
      />
    </Box>
  );
};

export default Edit;
