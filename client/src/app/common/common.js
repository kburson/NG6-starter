import angular from 'angular';

import 'normalize.css';
import 'angular-material.css'; // do I get the angular-material.css too ?

import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import User from './user/user';


let commonModule = angular.module('app.common', [
	Navbar.name,
	Hero.name,
	User.name
]);

export default commonModule;