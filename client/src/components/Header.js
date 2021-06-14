import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';

const Header = ({ isLogedIn, handleLogin }) => {
  const adminBtn = () => <Link to='/admin'>admin</Link>;

  return (
    <>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {isLogedIn && adminBtn()}
        <Button
          variant='contained'
          size='small'
          sx={{ margin: '10px' }}
          onClick={handleLogin}
        >
          {isLogedIn ? 'Log Out' : 'Log In'}
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
};

export default Header;
