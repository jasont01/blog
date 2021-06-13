import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      {new Date().getFullYear()}{' '}
      <Link color='inherit' href='https://siliconaddict.blog/'>
        siliconAddict
      </Link>
      {'.'}
    </Typography>
  );
}

function Footer(props) {
  const { description, title } = props;

  return (
    <Box component='footer' sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth='lg'>
        <Typography variant='h6' align='center' gutterBottom>
          {title}
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='text.secondary'
          component='p'
        >
          {description}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;
