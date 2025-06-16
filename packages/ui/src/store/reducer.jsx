import { combineReducers } from 'redux'

// reducer import
import customizationReducer from './reducers/customizationReducer'
import canvasReducer from './reducers/canvasReducer'
import notifierReducer from './reducers/notifierReducer'
import dialogReducer from './reducers/dialogReducer'
import authReducer from './reducers/authSlice'
import appConfigReducer from './reducers/appConfigReducer'

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    canvas: canvasReducer,
    notifier: notifierReducer,
    dialog: dialogReducer,
    auth: authReducer,
    appConfig: appConfigReducer
})

export default reducer
