import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';

function Header() {
  return (
    <>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Link to='/admin'>admin</Link>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant='contained' size='small' sx={{ margin: '10px' }}>
          Log In
        </Button>
        <Button variant='outlined' size='small'>
          Sign up
        </Button>
      </Toolbar>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          justifyContent: 'space-between',
          padding: '24px',
          paddingTop: 0,
          marginTop: '-12px',
          flexWrap: 'wrap',
        }}
      >
        <Link to='/'>
          <Logo className='logo' />
        </Link>
      </Toolbar>
    </>
  );
}

export default Header;
