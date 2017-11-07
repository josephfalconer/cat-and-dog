import * as ShutterActionTypes from '../actiontypes/shutters';

const initialState = {
	widthStyle: '50%',
	imgClass: 'get-food',
	message: 'Loading',
}


export default function Shutters(state=initialState, action) {

	switch(action.type) {

		case ShutterActionTypes.UPDATE_IMGCLASS: {
				return {
					...state,
					imgClass: action.imgClass
				};
			}

		case ShutterActionTypes.UPDATE_MESSAGE: {
				return {
					...state,
					message: action.message
				}
			}
			
		default:
			return state
	}
	
	
}


