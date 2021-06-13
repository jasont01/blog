import { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Box, Typography, Divider, Pagination } from '@material-ui/core/';
import { format } from 'date-fns';
import Markdown from './Markdown';
//import Card from './Card';

const postsPerPage = 5;

function Main({ title }) {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [totalNumPosts, setTotalNumPosts] = useState(0);

  const pages = Math.ceil(totalNumPosts / postsPerPage) || 1;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts?page=${page}`)
      .then((res) => {
        setPosts(res.data.posts);
        setTotalNumPosts(res.data.totalNumPosts);
      });
  }, [page]);

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      {/* <Typography variant='h6' gutterBottom>
        Blog Posts
      </Typography> */}
      <Divider />
      <Grid container flexDirection='column'>
        {posts.map((post) => (
          <Box key={post._id} className='markdown'>
            <Typography gutterBottom variant='h4' component='h1'>
              {post.title}
            </Typography>
            <Typography variant='caption' paragraph>
              {format(new Date(post.date), 'MMMM d yyyy')}
            </Typography>
            <Markdown>{post.article}</Markdown>
            {/* <Card key={post._id} post={post} /> */}
          </Box>
        ))}
      </Grid>

      <Box display='flex' justifyContent='center' mt={2}>
        <Pagination
          count={pages}
          size='small'
          onChange={(e, value) => setPage(value - 1)}
        />
      </Box>
    </Grid>
  );
}

export default Main;
