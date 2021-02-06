import { VALIDAR_EMAIL, VERIFY_EMAIL, USERNAME_RECOVERY } from "../types/emailTypes";

const initialState = {
    newEmail: {},
    verify: [],
    username: []
};

export function emailReducer(state = initialState, action) {
    switch (action.type) {

        case VALIDAR_EMAIL:
            return {
                ...state,
                newEmail: action.payload,
            };  
            case VERIFY_EMAIL:
            return {
                ...state,
                verify: action.payload,
            }; 
            case USERNAME_RECOVERY:
                return {
                    ...state,
                    username: action.payload
                }      
    
        default:
            return state;
    }
}