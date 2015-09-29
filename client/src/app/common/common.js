import angular from 'angular';

import 'normalize.css';
import 'angular-material'; // NOTE: No .css! since this will load the *.css.js created by jspm

import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import User from './user/user';


let commonModule = angular.module('app.common', [
    'ngMaterial',
	Navbar.name,
	Hero.name,
	User.name
]);

export default commonModule;