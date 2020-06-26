import React from "react"
import './login.css'
import { Form, Input, Button } from 'antd'
import { setToken, isAuthenticated } from "../../utils/auth"
import api from '../../services/api'
export default function Login() {

    if (isAuthenticated()) {
        window.location.replace("/home")
    }

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



    return (
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
                rules={[{ required: true, message: 'Por favor preencha o Usuário!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Senha"
                name="password"
                rules={[{ required: true, message: 'Por favor preencha a Senha!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} >
                <Button type="primary" htmlType="submit">
                    Entrar
                     </Button>
            </Form.Item>
        </Form>
    )
}