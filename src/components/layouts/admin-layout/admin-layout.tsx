import shopLogo from "../../../assets/images/sport-shop-logo-2.png"
import { Col, Row, Menu, Typography, Avatar, Button } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    ProductOutlined,
    AppstoreAddOutlined,
    UserOutlined,
} from "@ant-design/icons";

const { Text } = Typography


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return { key, icon, children, label, type } as MenuItem;
}

const items: MenuItem[] = [
    getItem('รายการสินค้า', 'product-admin', <ProductOutlined />),
    getItem(<Link to="add">เพิ่มสินค้า</Link>, 'product-add', <AppstoreAddOutlined />),
    getItem(<Link to="/">รายการสินค้า(ผู้ใช้งาน)</Link>, 'user', 
        <Avatar shape="square" style={{ backgroundColor: "white" }} size={14} icon={<UserOutlined />} 
    />),
];


function AdminLayout(props: any) {

    const { contentComponent } = props;
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [logOut, setLogOut] = useState<boolean>(true)

    let navigate = useNavigate()

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key == "product-admin") {
            window.location.reload()
        } 
      };

    const goToProductListPage = () => {
        navigate(`#`);
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
                        <img onClick={goToProductListPage} src={shopLogo} style={{ borderRadius: '50%', width: '15%', height: '50%' }} />
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
            <Row style={{ height: "88vh" }}>

                {/* sider */}
                <Col span={4}>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                        style={{ height: "100%" }}
                        onClick={onClick}
                    />
                </Col>

                {/* content */}
                <Col span={20}
                    style={{ width: "90%", height: "80%", padding: "2%" }}
                >
                    {contentComponent}
                    {/* Should to use width: "85%" and height: "80%" for content. */}
                </Col>
            </Row>

            {/* footer */}
            <Row justify="start" style={{ paddingLeft: "1rem", backgroundColor: "#2582b0", width: "100vw" }}>
                <Text style={{ color: "#e8eced" }}>© 2024 Sport Shop. All rights reserved.</Text>
            </Row>

        </div>
    )
}

export default AdminLayout;