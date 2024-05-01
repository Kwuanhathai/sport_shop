import shopLogo from "../../../assets/images/sport-shop-logo-2.png"
import { Col, Row, Typography, Avatar, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    UserOutlined,
} from "@ant-design/icons";

const { Text } = Typography


function SubAdminLayout(props: any) {

    const { contentComponent } = props;
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [logOut, setLogOut] = useState<boolean>(true)
    let navigate = useNavigate()

    const goToProductListPage = () => {
        navigate(-1);
    };

    const checkToken = () => {
        const token = localStorage.getItem('token')
        if (token != null) {
            setLoggedIn(true)
        }
        setLoggedIn(false)
    };

    useEffect(() => {
        checkToken()
    }, [logOut])

    const onLogOutClick = () => {
        localStorage.removeItem('token');
        setLogOut(!logOut)

        if (loggedIn == false) {
            navigate(`/`, { replace: true })
        }
    }


    return (
        <div>

            {/* header */}
            <Row align="middle" justify="space-around" style={{ backgroundColor: "#50b2eb", height: "9vh" }}>
                <Col span={6}>
                    <div style={{ paddingLeft: '2rem' }}>
                        <img src={shopLogo} style={{ borderRadius: '50%', width: '15%', height: '50%' }} />
                    </div>
                </Col>
                {/* <Col span={6} /> */}
                <Col span={18} style={{ display: "flex", justifyContent: "end", paddingRight: "2rem", alignItems: "center" }}>
                    <Row>
                        <Col style={{ paddingRight: "1rem", paddingTop: "0.3rem" }}>
                            <Avatar size={24} icon={<UserOutlined />} />
                        </Col>
                        <Col style={{ paddingRight: "2rem", paddingTop: "0.3rem" }}>
                            <Text>Sportshop Admin</Text>
                        </Col>
                        <Col style={{ paddingRight: "1rem" }}>
                            <Button type="primary" onClick={onLogOutClick}>Log out</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* body */}
            <Row style={{ height: "78vh" }}>
                <Col span={24} style={{ height: "80%", padding: "2%" }}>
                    {contentComponent}
                </Col>
            </Row>
            <Row align="middle" justify="center" style={{ height: '10vh' }}>
                <Button size={"large"} onClick={goToProductListPage}>
                    GO BACK
                </Button>
            </Row>
            <Row />

            {/* footer */}
            <Row justify="start" style={{ paddingLeft: "1rem", backgroundColor: "#2582b0", width: "100vw" }}>
                <Text style={{ color: "#e8eced" }}>© 2024 Sport Shop. All rights reserved.</Text>
            </Row>

        </div>
    )
}

export default SubAdminLayout;