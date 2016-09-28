
(function($) {

$.hasMouse = function() {
	//console.log("inputDevice: hasMouse() "+$.inputDeviceDetector.hasMouse());
	return $.inputDeviceDetector.hasMouse();
};

$.hasTouch = function() {
	//console.log("inputDevice: hasTouch() "+$.inputDeviceDetector.hasTouch());
	return $.inputDeviceDetector.hasTouch();
};

function InputDeviceDetector() {
	var self = this,
		_firstEvent = true,
		_lastTouch = 0,
		_hasMouse = undefined,
		_hasTouch = false,
		_mouseDown = undefined,
		_touchDown = undefined,
		_TOUCH_MOUSE_EVENT_TIME_GAP = 100;

	//---------------------------------------------------------------------
	// public
	//---------------------------------------------------------------------
	self.hasMouse = function() {
		return _hasMouse;
	}
	//---------------------------------------------------------------------
	self.hasTouch = function() {
		return _hasTouch;
	}
	//---------------------------------------------------------------------
	self.mousemove = function() {
		//console.log("mousemove");
		_mouseEvent();
		// var dtSinceLastTouch = new Date().getTime() - _lastTouch;
		// if (dtSinceLastTouch>_TOUCH_MOUSE_EVENT_TIME_GAP) {
		// 	// no touch event for some time (not a simulated mousemove event)
		// 	_hasMouse = true;
		// 	console.log("inputDevice: hasMouse (no touch event for some time)");
		// }
		// if (_mouseDown===false) {
		// 	// mousemove while mouse is up
		// 	_hasMouse = true;
		// 	console.log("inputDevice: hasMouse (mousemove while mouse is up)");
		// }
	}
	self.mousedown = function() {
		//console.log("mousedown");
		_mouseEvent();
		_mouseDown = true;
	}
	self.mouseup = function() {
		//console.log("mouseup");
		_mouseEvent();
		_mouseDown = false;
	}
	// self.mouseenter = function() {
	// 	console.log("mouseenter");
	// 	_mouseEvent();
	// 	_hasMouse = true;
	// 	console.log("inputDevice: hasMouse (hover enter)");
	// }
	// self.mouseleave = function() {
	// 	console.log("mouseleave");
	// 	_mouseEvent();
	// 	_hasMouse = true;
	// 	console.log("inputDevice: hasMouse (hover leave)");
	// }
	self.touchmove = function() {
		_touchEvent();
		_hasTouch = true;
	}
	self.touchstart = function() {
		_touchEvent();
		_touchDown = true;
		_hasTouch = true;
	}
	self.touchend = function() {
		_touchEvent();
		_touchDown = false;
		_hasTouch = true;
	}

	//---------------------------------------------------------------------
	// private
	//---------------------------------------------------------------------
	function _mouseEvent() {
		if (_firstEvent) {
			_hasMouse = true;
			console.log("inputDevice: hasMouse (1st event)");
		}
		_firstEvent = false;
	}
	function _touchEvent() {
		_lastTouch = new Date().getTime();
		_firstEvent = false;
	}

	$(document).bind('mousemove', self.mousemove);
	$(document).bind('mousedown', self.mousedown);
	$(document).bind('mouseup', self.mouseup);
	// $(document).bind('mouseenter', self.mouseenter);
	// $(document).bind('mouseleave', self.mouseleave);
	
	$(document).bind('touchmove', self.touchmove);
	$(document).bind('touchstart', self.touchstart);
	$(document).bind('touchend', self.touchend);
}

$(function() {
	$.inputDeviceDetector = new InputDeviceDetector();
});

}(jQuery));



// emulate fastClick (via normal 'slow' click)
(function($) {
	$.fn.fastClick = function(handler) {
		$(this).bind('touchstart', function() {
			//console.log("tap 1");
			$.inputDeviceDetector._hasTouch = true;
			//console.log("tap 2 "+$.inputDeviceDetector.hasTouch());
		});
		return $(this).tap(handler);
	};
	$.fn.fastestClick = function(handler) {
		$(this).bind('touchstart', function() {
			//console.log("tapstart 1");
			$.inputDeviceDetector._hasTouch = true;
			//console.log("tapstart 2 "+$.inputDeviceDetector.hasTouch());
		});
		return $(this).tapstart(handler);
	};
}(jQuery));
