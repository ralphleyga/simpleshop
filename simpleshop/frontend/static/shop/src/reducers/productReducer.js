const initState = {
    products: [],
    categories: [],
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
        default:
            return state
    }
    
}

export default productReducer