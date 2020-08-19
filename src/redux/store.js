import { createStore } from 'redux';
import {
    colaboratorAction,
    productAction,
    orderAction,
    accountAction,
    transactionAction,
    BillAction
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

const BillReducer = (state = [], action = {}) => {
    if (action.type === BillAction.SET) {
        state = action.bills
        return state;
    }
    return state;
}


export const ColaboratorStore = createStore(colaboratorReducer)
export const ProductStore = createStore(productReducer)
export const OrderStore = createStore(orderReducer)
export const AccountStore = createStore(AccountReducer)
export const TransactionStore = createStore(TransactionReducer)
export const BillStore = createStore(BillReducer)
