const initState = {
    products: [],
    categories: [],
    cart: [],
    placed_order: [],
    canceled: [],
    addresses: []
}

const updateOrders = (state = initState, action) => {
    const cart = 1
    const placed_order = 2
    const canceled = 3

    const cartList = action.payload.results.find(order => {
        return order.status === cart
    })

    const placedOrderList = action.payload.results.filter(order => {
        return order.status === placed_order
    })

    const canceledList = action.payload.results.filter(order => {
        return order.status === canceled
    })

    return {
        ...state,
        cart: cartList,
        canceled: canceledList,
        placed_order: placedOrderList
    }
}


const productReducer = (state = initState, action) => {

    switch (action.type) {
        case 'FETCH_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }
        case 'FETCH_CATEGORY':
            return {
                ...state,
                categories: action.payload
            }
        case 'FETCH_ORDERS':
            return updateOrders(state, action)
        case 'FETCH_ADDRESSES':
            return {
                ...state,
                addresses: action.payload.results
            }
        case 'CART_ADD_ITEM':
            return {
                ...state,
                cart: action.payload
            }
        default:
            return state
    }
    
}

export default productReducer