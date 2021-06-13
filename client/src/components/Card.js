import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Box,
  // Avatar,
} from '@material-ui/core';
import { format } from 'date-fns';

const Card = ({ post }) => {
  return (
    <MuiCard
      sx={{
        display: 'flex',
        maxWidth: '600px',
        margin: '16px',
      }}
    >
      <CardActionArea component='a' href={post.url}>
        <Box sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Box display='flex'>
              {/* <Avatar
                alt={post.author}
                src='/avatar'
                sx={{ width: '24px', height: '24px', marginRight: '8px' }}
              /> */}
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                {post.author}
              </Typography>
            </Box>
            <Typography component='h2' variant='h5'>
              {post.title}
            </Typography>
            <Typography variant='subtitle1' color='text.secondary'>
              {format(new Date(post.date), 'MMM d yyyy')}
            </Typography>
            <Typography variant='subtitle1' paragraph>
              {post.description}
            </Typography>
          </CardContent>

          <CardMedia
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image='https://source.unsplash.com/random'
            title='image title'
          />
        </Box>
      </CardActionArea>
    </MuiCard>
  );
};

export default Card;
