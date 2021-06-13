import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { Box, TextField, Button } from '@material-ui/core';
import MDEditor from '@uiw/react-md-editor';

const Editor = ({ title = '', article = '', handleSubmit }) => {
  const [titleField, setTitleField] = useState('');
  const [articleField, setArticleField] = useState('');
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    setTitleField(title);
    setArticleField(article);
  }, [title, article]);

  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <Box>
      <Box>
        <TextField
          label='Article Title'
          variant='standard'
          value={titleField}
          onChange={(e) => setTitleField(e.target.value)}
        />
      </Box>
      <Box my={2}>
        <MDEditor
          preview='edit'
          value={articleField}
          onChange={setArticleField}
        />
      </Box>
      <Box display='flex' justifyContent='flex-end'>
        <Button onClick={() => setRedirect('/admin')}>Cancel</Button>
        <Button
          sx={{ marginLeft: '16px' }}
          onClick={() =>
            handleSubmit({
              title: titleField,
              article: articleField,
            })
          }
        >
          Submit
        </Button>
      </Box>
      <Box padding={4}>
        <MDEditor.Markdown source={articleField} />
      </Box>
    </Box>
  );
};

export default Editor;
