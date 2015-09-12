import angular from 'angular';
import Navbar from './navbar/navbar';
import MessageDisplayBanner from './messageDisplayBanner/messageDisplayBanner';
import User from './user/user';

let commonModule = angular.module('app.common', [
	Navbar.name,
	MessageDisplayBanner.name,
	User.name
]);

export default commonModule;