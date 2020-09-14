import React, { useState } from "react";
import { removeToken, getToken } from "../../utils/auth";
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    ProfileOutlined,
    SolutionOutlined,
    LogoutOutlined,
    BankOutlined,
    TagsOutlined,
    DollarCircleOutlined,
    SettingOutlined,
    CalendarOutlined,
    DatabaseOutlined,
    UnorderedListOutlined

} from '@ant-design/icons';
import './styles/home.css'
import { HomeRoutes } from '../../routes'
import api from "../../services/api";
import { notifError } from "../../components/notificacao/notificacao";
import SubMenu from "antd/lib/menu/SubMenu";


export default function Home(props) {

    const { Header, Content, Footer, Sider } = Layout;
    const [collapse, isCollapsed] = useState(false);
    const onCollapse = () => isCollapsed(!collapse)


    function logout() {
        api.post('/logout', { token: getToken() })
            .then(response => {
                if (response.data) {
                    removeToken();
                    window.location.replace("/")
                } else {
                    notifError('Erro ao Sair', 'Entre em contato com administração do sistema.')
                }
            }).catch(e => console.log(e))
    }
    //  <LogoutOutlined /> 

    return (
        <Layout style={{ minHeight: '100vh' }}>

            <Sider collapsible collapsed={collapse}
                onCollapse={onCollapse} >
                <div className="logo">
                    <Link to="/home">
                        <h1 className="LogoTemp">Lesoft</h1>
                    </Link>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
                    <SubMenu key="1" icon={<ProfileOutlined />} title="Pedidos">
                        <Menu.Item key="1.1" icon={<ProfileOutlined />} >
                            <Link to="/home/pedido" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                Pedidos
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="2" icon={<SolutionOutlined />} title="Pessoas">
                        <Menu.Item key="2.1" icon={<SolutionOutlined />} >
                            <Link className="LinkMenu" to="/home/colab" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                Colaboradores
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="3" icon={<DollarCircleOutlined />} title="Financeiro">
                        <Menu.Item key="3.1" icon={<CalendarOutlined />}>
                            <Link to="/home/financeiro/programacao" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                Programação
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3.2" icon={<BankOutlined />} >
                            <Link to="/home/financeiro/conta/geral" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                Contas
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3.3" icon={<UnorderedListOutlined />} >
                            <Link to="/home/financeiro/pc" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                Plano de Contas
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="4" icon={<DatabaseOutlined />} title="Estoque">
                        <Menu.Item key="4.1" icon={<TagsOutlined />} >
                            <Link to="/home/produto" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                Produtos
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="5" icon={<SettingOutlined />} title="Configuração">
                        <Menu.Item key="5.1">Colaboradores</Menu.Item>
                        <Menu.Item key="5.2">Despesas</Menu.Item>
                        <Menu.Item key="5.3">Acesso ao Sistema</Menu.Item>
                    </SubMenu>
                    <Menu.Item onClick={logout} key="10" icon={<LogoutOutlined />}>Sair</Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" >
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }} >
                    <div className="distancia-menu">
                        <HomeRoutes />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Lesoft ©2020</Footer>
            </Layout>

        </Layout>
    )



}