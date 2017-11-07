import * as ShutterActionTypes from '../actiontypes/shutters';

export const updateImg = imgClass => {
	return {
		type: ShutterActionTypes.UPDATE_IMGCLASS,
		imgClass
	}
};

export const updateMessage = message => {
	return {
		type: ShutterActionTypes.UPDATE_MESSAGE,
		message
	}
}


