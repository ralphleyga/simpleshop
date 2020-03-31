import axios from 'axios'

export const productFetch = () => {
    return async dispatch => {
        let resp = await axios.get('products')
        return dispatch({type: 'FETCH_PRODUCTS', payload: resp.data })
    }
}

export const categoryFetch = () => {
    return async dispatch => {
        let resp =  await axios.get('categories/')
        return dispatch({type: 'FETCH_CATEGORY', payload: resp.data})
    }
}

export const ordersFetch = () => {
    return async dispatch => {
        let resp = await axios.get('orders/')
        return dispatch({type: 'FETCH_ORDERS', payload: resp.data})
    }
}

export const addressFetch = () => {
    return async dispatch => {
        let resp = await axios.get('address/')
        return dispatch({type: 'FETCH_ADDRESSES', payload: resp.data})
    }
}

export const addCart = item => {
    return async dispatch => {
        let resp = await axios.post('cart/', {
                    item: item.id,
                    quantity: 1
                })
        return dispatch({ type: 'CART_ADD_ITEM', payload: resp.data })
    }
}

export const updateCart = item => {
    return async dispatch => {
        await axios.put('cart-update/' + item.id + '/', {
                    quantity: item.quantity
                })
        let resp = await axios.get('orders/')
        return  dispatch({type: 'FETCH_ORDERS', payload: resp.data})
    }
}

export const checkoutCart = item => {
    return async dispatch => {
        await axios.post('checkout/', {
            address: item.address,
            payment_method: 1 // COD
            })
        // pull latest orders data
        let resp = axios.get('orders/')
        return dispatch({type: 'FETCH_ORDERS', payload: resp.data})
    }
}