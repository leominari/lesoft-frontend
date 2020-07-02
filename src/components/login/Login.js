import React from "react"
import './login.css'
import { Form, Input, Button } from 'antd'
import { setToken, isAuthenticated } from "../../utils/auth"
import api from '../../services/api'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Authenticated: isAuthenticated()
        }
    }

    componentDidMount() {
        if (this.state.Authenticated) {
            window.location.replace("/home")
        }
    }

    render() {

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }

        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        }

        const onFinish = values => {
            api.post('login', values)
                .then(res => {
                    if (res.status === 200) {
                        setToken(res.data.token)
                        window.location.replace("/home")
                    }
                }).catch(e => console.log(e))
        }

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        }

        if(this.state.Authenticated){
            return (<></>)
        }

        return (
            <div className="login-box">
                <Form
                    {...layout}
                    className="login"
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Usuário"
                        name="username"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Senha"
                        name="password"
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} >
                        <Button type="primary" htmlType="submit">
                            Entrar
                     </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

}

export default Login;

