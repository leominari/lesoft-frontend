import React from 'react'
import { Link } from 'react-router-dom';

export default function Financial() {
    return <>
        <p>Financeiro</p> 
        <Link to="/home/financeiro/cap">Contas a Pagar</Link>
        <br></br>
        <Link to="/home/financeiro/car">Contas a Receber</Link>
    </>
}