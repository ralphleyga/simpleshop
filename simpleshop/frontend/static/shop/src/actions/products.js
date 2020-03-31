import axios from 'axios'

export const productFetch = () => {
    return async dispatch => {
        let resp = await axios.get('products')
        let { data } = resp.data;
        return dispatch({type: 'FETCH_PRODUCTS', payload: resp.data })
    }
}

export const categoryFetch = () => {
    return async dispatch => {
        let resp =  await axios.get('categories/')
        let { data } = resp.data
        return dispatch({type: 'FETCH_CATEGORY', payload: resp.data})
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

export const updateCart = item => {
    return dispatch => {
        return axios.put('cart-update/' + item.id + '/', {
                    quantity: item.quantity
                })
                .then(resp => {
                    axios.get('orders/')
                        .then(resp => {
                            dispatch({type: 'FETCH_ORDERS', payload: resp.data})
                        })
                })
    }
}

export const checkoutCart = item => {
    return dispatch => {
        return axios.post('checkout/', {
            address: item.address,
            payment_method: 1 // COD
            }).then(resp => {
                axios.get('orders/')
                    .then(resp => {
                        dispatch({type: 'FETCH_ORDERS', payload: resp.data})
                    })
            })
    }
}