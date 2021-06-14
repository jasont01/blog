import { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import axios from 'axios';

const formFields = {
  title: '',
  description: '',
  image: '',
  url: '',
};

const Featured = ({ setSnackBar, token }) => {
  const [config, setConfig] = useState(formFields);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/featured`)
      .then((res) => setConfig({ ...formFields, ...res.data }))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/admin/featured`, config, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>
        setSnackBar({
          isOpen: true,
          severity: 'success',
          msg: 'Featured Post Updated',
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
        id='title'
        label='Title'
        value={config.title}
        variant='standard'
        error={!config.title}
        helperText={!config.title && 'cannnot be blank'}
        onChange={(e) => setConfig({ ...config, title: e.target.value })}
      />
      <TextField
        id='description'
        label='Description'
        multiline
        value={config.description}
        variant='standard'
        error={!config.description}
        helperText={!config.description && 'cannnot be blank'}
        onChange={(e) => setConfig({ ...config, description: e.target.value })}
      />
      <TextField
        id='image'
        label='Image URL'
        value={config.image}
        variant='standard'
        error={!config.image}
        helperText={!config.image && 'cannnot be blank'}
        onChange={(e) => setConfig({ ...config, image: e.target.value })}
      />
      <TextField
        id='url'
        label='URL'
        value={config.url}
        variant='standard'
        error={!config.url}
        helperText={!config.url && 'cannnot be blank'}
        onChange={(e) => setConfig({ ...config, url: e.target.value })}
      />
      <Button
        disabled={
          !config.title || !config.description || !config.image || !config.url
        }
        onClick={handleSubmit}
      >
        Save
      </Button>
    </Box>
  );
};

export default Featured;
