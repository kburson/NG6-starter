import angular from 'angular';
import 'angular-ui-router';

import messageDisplayBannerComponent from './messageDisplayBanner.component';

let messageDisplayBannerModule = angular.module('messageDisplayBanner', [
	'ui.router'
])
.directive('messageDisplayBanner', messageDisplayBannerComponent);

export default messageDisplayBannerModule;