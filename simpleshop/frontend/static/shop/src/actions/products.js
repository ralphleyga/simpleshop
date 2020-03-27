import axios from 'axios'

export const productFetch = () => {
    return dispatch => {
        return axios.get('products/')
            .then(resp => {
                dispatch({type: 'FETCH_PRODUCTS', payload: resp.data })
            })
            .catch((err) => {
                // add error handler
            });
    }
}

export const categoryFetch = () => {
    return dispatch => {
        return axios.get('categories/')
                .then(resp => {
                    dispatch({type: 'FETCH_CATEGORY', payload: resp.data})
                })
                .catch((err) => {
                    // add error handler
                })
    }
}