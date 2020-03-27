import { combineReducers } from 'redux'

import authReducer from './authReducer'
import productReducer from './productReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    productReducer: productReducer
})

export default rootReducer