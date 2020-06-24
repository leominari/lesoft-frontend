import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConfigProvider } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'


ReactDOM.render(
    <ConfigProvider locale={ptBR}>
        <App />
    </ConfigProvider>
    , document.getElementById('root'));
