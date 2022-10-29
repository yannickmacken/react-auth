import { Link } from 'react-router-dom';
import { useContext } from 'react';

import TokenContext from '../../store/context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  
  // Get auth context token
  const [token, setToken] = useContext(TokenContext)

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
          {token? 
            <ul>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button>Logout</button>
              </li>
            </ul>
            :
            <ul>
              <li>
                <Link to='/auth'>Login</Link>
              </li>
            </ul>
          }
      </nav>
    </header>
  );
};

export default MainNavigation;
