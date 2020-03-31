import axios from 'axios'

export const userLoginFetch = user => {

    return dispatch => {
        return axios.post('token/', user)
                .then(resp => {
                    localStorage.setItem("token", resp.data.token)
                    localStorage.setItem('isLoggedIn', true)
                    dispatch({type: 'LOGIN_SUCCESS', payload: true })
                    dispatch({type: 'LOGIN_ERROR', payload: false})
                    // reload to have new session
                    window.location.reload()
                })
                .catch((err) => {
                    dispatch({type: 'LOGIN_ERROR', payload: true})
                })
    }
}

export const userLogout = () => {
    return dispatch => {
        localStorage.removeItem('token')
        localStorage.removeItem('isLoggedIn')
        dispatch({type: 'LOGOUT_USER', payload: false })
    }
}