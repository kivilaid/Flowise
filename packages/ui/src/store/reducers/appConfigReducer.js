// action - state management
import { APP_CONFIG } from '../actions'

export const initialState = {
    hiddenMenuItems: []
}

// ==============================|| APP CONFIG REDUCER ||============================== //

const appConfigReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_CONFIG:
            return {
                ...state,
                ...action.config
            }
        default:
            return state
    }
}

export default appConfigReducer