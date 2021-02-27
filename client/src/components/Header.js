import React from 'react'
import {Link} from 'react-router-dom';
import '../css/header.css';
import { useStateValue } from '../StateProvider';

function Header() {
  //getting the user form the context
   const [{user},dispatch] = useStateValue();

    return (
        <header className="header">
            <nav className="nav">
                <div className="logo">
                    <h2>stock management</h2>
                </div>
                {user ?
                  <div className="nav-left">
                      <div className="signin-name">
                       {` Hello ${user?.name}`}
                      </div>
                    <Link to="/login" onClick={e=>dispatch({type: 'USER', user: null})}>
                      <div className="signin-link">
                        Sign out
                      </div>
                    </Link>
                  </div>:  <Link to="/login">
                      <div className="signin-link">
                        Sign in
                      </div>
                    </Link>
                }
            </nav>
        </header>
    )
}

export default Header
