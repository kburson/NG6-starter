import template from './component.html!text';
import controller from './component.controller';
import './component.css!';

let messageDisplayBannerComponent = function(){
	return {
		template,
		controller,
		restrict: 'E',
		controllerAs: 'vm',
		scope: {},
		bindToController: true
	};
};

export default messageDisplayBannerComponent;