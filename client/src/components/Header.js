import React from 'react';
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <nav class="navbar has-shadow">
              <div class="navbar-brand">
                <a class="navbar-item" href="#">
                </a>
                <div class="navbar-burger">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
          </nav>
        )
    }
}

export default Header;
