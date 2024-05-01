import { Card, Row, Col, Typography, Button, Form, Input, Avatar, Modal } from "antd"
import shopLogo from "../../../assets/images/sport-shop-logo-2.png"
import type { FormProps } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"
import axios from "axios";

const { Text } = Typography

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const url = "http://localhost:4200/api/account/login"

function Login() {
    let navigate = useNavigate()

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { username, password } = values

        try {
            const response = await axios.post(url, {
                username,
                password
            }, { timeout: 5000 });

            const { token } = response?.data;
            localStorage.setItem('token', token);

            Modal.success({
                title: 'LOGIN SUCCESSFUL',
            });

            setTimeout(function () {
                navigate(`product-list`, { replace: true });
            }, 3000);

        } catch (error) {
            Modal.error({
                title: 'LOGIN FAILED',
                content: 'Please try again.',
            });

            console.error('Login failed:', error);
        }
    };

    const goToHomePage = () => {
        navigate(`/`);
    };


    return (
        <div style={{ backgroundColor: "#b1c3e0" }}>
            {/* header */}
            <Row align="middle" justify="space-around" style={{ backgroundColor: "#50b2eb", height: "9vh" }}>
                <Col span={6}>
                    <div style={{ paddingLeft: '2rem' }}>
                        <img onClick={goToHomePage} src={shopLogo} style={{ borderRadius: '50%', width: '15%', height: '50%' }} />
                    </div>
                </Col>
                <Col span={18} />
            </Row>

            {/* body */}
            <Row style={{ height: "88vh" }}>
                {/* content */}
                <Col span={9} />
                <Col span={15}
                    style={{ width: "90%", height: "80%", padding: "2%", paddingTop: "6%", paddingLeft: "10%" }}
                >
                    <Card
                        style={{
                            height: "60vh",
                            width: "40vw",
                            padding: "1rem",
                            paddingTop: "2rem",
                            borderRadius: "2rem",
                            backgroundColor: "rgba(37, 130, 176, 0.906)",
                            flexWrap: "wrap",
                            overflowX: "hidden"
                        }}
                    >
                        <Row justify="center" style={{ paddingTop: "3%" }}>
                            <Avatar size={102} icon={<UserOutlined />} />
                        </Row>
                        <Row justify="center" style={{ paddingTop: "5%" }}>

                            <Form
                                name="login-form"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600 }}
                                onFinish={onFinish}
                            >
                                <Form.Item<FieldType>
                                    label="Username"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button htmlType="submit" style={{ backgroundColor: "#b1c3e0", color: "black" }}>
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>

                        </Row>
                    </Card>
                    <Row style={{ height: '10vh', display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                        <Button size={"large"} onClick={goToHomePage}>
                            GO BACK
                        </Button>
                    </Row>
                </Col>
            </Row>

            {/* footer */}
            <Row justify="start" style={{ paddingLeft: "1rem", backgroundColor: "#2582b0", width: "100vw" }}>
                <Text style={{ color: "#e8eced" }}>© 2024 Sport Shop. All rights reserved.</Text>
            </Row>

        </div>
    )
}

export default Login