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

export const ordersFetch = () => {
    return dispatch => {
        return axios.get('orders/')
                .then(resp => {
                    dispatch({type: 'FETCH_ORDERS', payload: resp.data})
                })
    }
}

export const addressFetch = () => {
    return dispatch => {
        return axios.get('address/')
                .then(resp => {
                    dispatch({type: 'FETCH_ADDRESSES', payload: resp.data})
                })
    }
}

export const addCart = item => {
    return dispatch => {
        return axios.post('cart/', {
                    item: item.id,
                    quantity: 1
                })
                .then(resp => {
                    dispatch({
                        type: 'CART_ADD_ITEM',
                        payload: resp.data
                    })
                })
    }
}