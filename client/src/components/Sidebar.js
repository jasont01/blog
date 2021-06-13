import Grid from '@material-ui/core/Grid';
import Stack from '@material-ui/core/Stack';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

function Sidebar() {
  const { archives, description, social, title } = {
    title: 'About',
    description:
      'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
      { title: 'March 2020', url: '#' },
      { title: 'February 2020', url: '#' },
      { title: 'January 2020', url: '#' },
      { title: 'November 1999', url: '#' },
      { title: 'October 1999', url: '#' },
      { title: 'September 1999', url: '#' },
      { title: 'August 1999', url: '#' },
      { title: 'July 1999', url: '#' },
      { title: 'June 1999', url: '#' },
      { title: 'May 1999', url: '#' },
      { title: 'April 1999', url: '#' },
    ],
    social: [
      { name: 'GitHub', icon: GitHubIcon },
      { name: 'Twitter', icon: TwitterIcon },
      { name: 'Facebook', icon: FacebookIcon },
    ],
  };

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant='h6' gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
        Archives
      </Typography>
      {archives.map((archive) => (
        <Link
          display='block'
          variant='body1'
          href={archive.url}
          key={archive.title}
        >
          {archive.title}
        </Link>
      ))}

      <Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
        Social
      </Typography>
      {social.map((network) => (
        <Link
          display='block'
          variant='body1'
          href='#'
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction='row' spacing={1} alignItems='center'>
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </Grid>
  );
}

export default Sidebar;
