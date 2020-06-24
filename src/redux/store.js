import { createStore } from 'redux';
import {
    colaboratorAction,
    productAction,
    orderProductAction,
    orderAction,
    accountAction,
    transactionAction,
    Bill2Action
} from './actions'

const colaboratorReducer = (state = [], action = {}) => {
    if (action.type === colaboratorAction.SET) {
        state = action.colaborators
        return state;
    }
    return state;
}

const productReducer = (state = [], action = {}) => {
    if (action.type === productAction.SET) {
        state = action.products
        return state;
    }
    return state;
}

const orderProductReducer = (state = [], action = {}) => {
    if (action.type === orderProductAction.ADD) {
        state.push(action.products)
        return state
    }

    if (action.type === orderProductAction.REMOVE) {
        const prods = state
        state = prods.filter(prod => prod.key != action.product)
        return state
    }

    return state;
}

const orderReducer = (state = [], action = {}) => {
    if (action.type === orderAction.SET) {
        state = action.orders
        return state;
    }

    return state;
}


const AccountReducer = (state = [], action = {}) => {
    if (action.type === accountAction.SET) {
        state = action.accounts
        return state;
    }
    return state;
}

const TransactionReducer = (state = [], action = {}) => {
    if (action.type === transactionAction.SET) {
        state = action.transactions
        return state;
    }
    return state;
}

const Bill2Reducer = (state = [], action = {}) => {
    if (action.type === Bill2Action.SET) {
        state = action.bill2s
        return state;
    }
    return state;
}


export const ColaboratorStore = createStore(colaboratorReducer)
export const ProductStore = createStore(productReducer)
export const OrderStore = createStore(orderReducer)
export const OrderProductStore = createStore(orderProductReducer)
export const AccountStore = createStore(AccountReducer)
export const TransactionStore = createStore(TransactionReducer)
export const Bill2Store = createStore(Bill2Reducer)
