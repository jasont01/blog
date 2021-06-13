import { Grid, Toolbar, Link } from '@material-ui/core';
import FeaturedPost from '../components/FeaturedPost';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Travel', url: '#' },
];

const Home = () => {
  return (
    <main>
      <Toolbar
        component='nav'
        variant='dense'
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color='inherit'
            noWrap
            key={section.title}
            variant='body2'
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
      <FeaturedPost />
      <Grid container spacing={5} sx={{ mt: 3 }}>
        <Main title='From the firehose' />
        <Sidebar />
      </Grid>
    </main>
  );
};

export default Home;
