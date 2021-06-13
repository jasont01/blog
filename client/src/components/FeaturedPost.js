import { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

const defaultFeatured = {
  title: 'Featured Post Title',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  url: '#',
};

const FeaturedPost = () => {
  const [featured, setFeatured] = useState(defaultFeatured);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/featured`)
      .then((res) => setFeatured({ ...defaultFeatured, ...res.data }))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${featured.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={featured.image} alt='' />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component='h1'
              variant='h3'
              color='inherit'
              gutterBottom
            >
              {featured.title}
            </Typography>
            <Typography variant='h5' color='inherit' paragraph>
              {featured.description}
            </Typography>
            <Link variant='subtitle1' href={featured.url}>
              Continue reading...
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FeaturedPost;
