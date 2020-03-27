const initState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') ? true:false,
    loginError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: action.payload
            }
        
        case 'LOGIN_ERROR':
            return {
                ...state,
                loginError: action.payload
            }

        case 'LOGOUT_USER':
            return {
                ...state,
                isLoggedIn: action.payload
            }
    
        default:
            return state
    }
}

export default authReducer