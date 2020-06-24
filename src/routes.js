import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'

// Padrão
import Home from './components/home/Home'
import Login from './components/login/Login'

// Home
import Colaborator from './components/colaborator/Colaborator'
import Product from './components/product/Product'
import Dashboard from './components/home/Dashboard'
import Order from './components/order/Order'


//Contas
import Account from './components/account/Account'
import ViewAccount from './components/account/ViewAccount'

//Financieiro
import Financial from './components/financial/Financial'
import Bill2 from './components/financial/bill2/Bill2'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/home" component={Home} />
        </BrowserRouter>
    )
}

export const HomeRoutes = () => {
    return (
        <Switch>
            <Route path="/home/colab">
                <Colaborator />
            </Route>
            <Route path="/home/produto">
                <Product />
            </Route>
            <Route path="/home/pedido">
                <Order />
            </Route>
            <Route path="/home/conta">
                <AccountRoutes />
            </Route>
            <Route path="/home/financeiro">
                <FinancialRoutes />
            </Route>
            <Route path="/home">
                <Dashboard />
            </Route>
        </Switch>
    )
}

export const AccountRoutes = () => {
    return (
        <Switch>
            <Route path="/home/conta/geral">
                <Account />
            </Route>
            <Route path="/home/conta/:id">
                <ViewAccount />
            </Route>
        </Switch>
    )
}

export const FinancialRoutes = () => {
    return (
        <Switch>
            <Route>
                <Route path="/home/financeiro/">
                    <Bill2 />
                </Route>
            </Route>
        </Switch>
    )
}


export default Routes;