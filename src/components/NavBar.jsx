import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';

function NavBar() {
  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <NavLink to='/' activeclassname="active">Movie App</NavLink>
      </div>
      <div className='navbar-links'>
        <NavLink to='/' className='nav-link' activeclassname="active">Search</NavLink>
        <NavLink to='/library' className='nav-link' activeclassname="active">Library</NavLink>
        <NavLink to='/favorites' className='nav-link' activeclassname="active">Favorites</NavLink>
        <NavLink to='/backups' className='nav-link' activeclassname="active">Backups</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;