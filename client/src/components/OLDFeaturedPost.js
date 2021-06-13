import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

function FeaturedPost({ post }) {
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component='a' href={post.url}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component='h2' variant='h5'>
              {post.title}
            </Typography>
            <Typography variant='subtitle1' color='text.secondary'>
              {post.date}
            </Typography>
            <Typography variant='subtitle1' paragraph>
              {post.description}
            </Typography>
            <Typography variant='subtitle1' color='primary'>
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            title={post.imageText}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default FeaturedPost;
