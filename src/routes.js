import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'

// Padrão
import Login from './modulos/login/Login'

// Home
import Home from './modulos/home/Home'
import Dashboard from './modulos/dashboard/Dashboard'

//Pessoas
import Colaborator from './modulos/pessoas/colaborator/Colaborator'

//Estoque
import Product from './modulos/estoque/product/Product'

//Pedidos
import Order from './modulos/pedidos/order/Order'


//Financieiro
import Bill from './modulos/financeiro/bill/Bill'
import Account from './modulos/financeiro/account/Account'
import ViewAccount from './modulos/financeiro/account/ViewAccount'
import PlanoContas from './modulos/financeiro/planoContas/PlanoContas'

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
            <Route path="/home/financeiro">
                <FinancialRoutes />
            </Route>
            <Route path="/home">
                <Dashboard />
            </Route>
        </Switch>
    )
}

export const FinancialRoutes = () => {
    return (
        <Switch>
            <Route>
                {/* Programação */}
                <Route path="/home/financeiro/programacao/">
                    <Bill />
                </Route>

                {/* Contas */}
                <Route path="/home/financeiro/conta/geral">
                    <Account />
                </Route>
                <Route path="/home/financeiro/conta/view/:id">
                    <ViewAccount />
                </Route>
                {/* Plano de Contas */}
                <Route path="/home/financeiro/pc">
                    <PlanoContas />
                </Route>
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

export default Routes;