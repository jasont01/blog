import { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import axios from 'axios';

const formFields = {
  title: '',
  description: '',
  image: '',
  url: '',
};

const Featured = ({ setSnackBar }) => {
  const [config, setConfig] = useState(formFields);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/featured`)
      .then((res) => setConfig({ ...formFields, ...res.data }))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/admin/featured`, config)
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
          msg: `Error: ${err}`,
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
        onChange={(e) => setConfig({ ...config, title: e.target.value })}
      />
      <TextField
        id='description'
        label='Description'
        multiline
        value={config.description}
        variant='standard'
        onChange={(e) => setConfig({ ...config, description: e.target.value })}
      />
      <TextField
        id='image'
        label='Image URL'
        value={config.image}
        variant='standard'
        onChange={(e) => setConfig({ ...config, image: e.target.value })}
      />
      <TextField
        id='url'
        label='URL'
        value={config.url}
        variant='standard'
        onChange={(e) => setConfig({ ...config, url: e.target.value })}
      />
      <Button onClick={handleSubmit}>Save</Button>
    </Box>
  );
};

export default Featured;
