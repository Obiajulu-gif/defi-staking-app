import React, { Component } from 'react';
import bank from '../assets/bank.png'; // Adjust the path if necessary

class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-dark fixed-top shadow p-0"
        style={{ backgroundColor: 'black' }}
      >
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/"
          style={{ color: 'white' }}
        >
          <img src={bank} width="30" height="30" className="d-inline-block align-top" alt="bank logo" />
          &nbsp; DAPP Yield Staking (Decentralized Banking)
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small style={{ color: 'white' }}>
              {this.props.account || 'Account Number'}
            </small> 
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;