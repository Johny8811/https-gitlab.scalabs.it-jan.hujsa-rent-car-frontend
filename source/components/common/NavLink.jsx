/**
 * Created by Jan on 9.8.2016.
 */
import React from 'react';
import { Link } from 'react-router';

const NavLink = (props) => <Link {...props} activeClassName="active"/>;

export default NavLink;