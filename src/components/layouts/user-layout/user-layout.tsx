import shopLogo from "../../../assets/images/sport-shop-logo-2.png"
import { Col, Row, Menu, Typography, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import {
  ProductOutlined,
  UserOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  InstagramOutlined
} from "@ant-design/icons";

const { Text } = Typography

const StyleText = styled(Text)`
    color: gray;
    margin: 1rem;
    padding-right: 2rem;
`

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
  getItem('รายการสินค้า', 'product-lists', <ProductOutlined />),
  getItem('ผู้ดูแลระบบ', 'admin', 
    <Avatar shape="square" style={{ backgroundColor: "white" }} size={14} icon={<UserOutlined />} />
  ),
];


function UserLayout(props: any) {

  const { contentComponent } = props;
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  let navigate = useNavigate()

  const checkToken = () => {
    const token = localStorage.getItem('token')
    if (token != null) {
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }
  };

  useEffect(() => {
    checkToken()
  }, [])

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key == "product-lists") {
      // window.location.reload()
      history.go(0)
    } 
    else if (e.key == "admin") {
      if (loggedIn) {
        navigate(`admin/product-list`, { replace: true })
      } 
      else {
        navigate(`admin`, { replace: true })
      }
    }
  };

  const goToHomePage = () => {
    navigate(`/`);
  };


  return (
    <div>

      {/* header */}
      <Row align="middle" style={{ backgroundColor: "#50b2eb", height: "9vh" }}>
        <Col span={6}>
          <div style={{ paddingLeft: '2rem' }}>
            <img onClick={goToHomePage} src={shopLogo} style={{ borderRadius: '50%', width: '15%', height: '50%' }} />
          </div>
        </Col>
      </Row>

      {/* body */}
      <Row style={{ height: "100vh" }}>

        {/* sider */}
        <Col span={4}>
          <Menu
            onClick={onClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            style={{ height: "100%" }}
          />
        </Col>

        {/* content */}
        <Col span={20} style={{ width: "90%", height: "80%" }}>
          {contentComponent}
          {/* Should to use width: "90%" and height: "80%" for content. */}
        </Col>
      </Row>

      {/* footer */}
      <Row>
        <Row justify="center" align="middle" style={{ backgroundColor: "#cbe5f2" }}>
          <Col span={8}>
            <Row style={{ paddingLeft: "1rem" }}>
              <img src={shopLogo} style={{ borderRadius: '50%', width: '50px', height: '50px' }}></img>
            </Row>
            <Row style={{ paddingLeft: "1rem" }}>
              <Text style={{ fontSize: "1.8rem", color: "gray" }}>Sport Shop - สินค้าคุณภาพสำหรับแฟชั่นกีฬา</Text>
            </Row>
          </Col>
          <Col span={16}>
            <Row>
              <Col span={11}>
                <Row justify="end" align="top">
                  <StyleText style={{ fontSize: "1.8rem", fontWeight: "bold" }}>ติดต่อเรา</StyleText>
                </Row>
                <Row justify="end" align="bottom" style={{ paddingTop: "5rem" }}>
                  <Col span={3}>
                    <FacebookOutlined style={{ fontSize: "2rem", color: "gray" }} />
                  </Col>
                  <Col span={3}>
                    <YoutubeOutlined style={{ fontSize: "2rem", color: "gray" }} />
                  </Col>
                  <Col span={3}>
                    <TwitterOutlined style={{ fontSize: "2rem", color: "gray" }} />
                  </Col>
                  <Col span={3}>
                    <InstagramOutlined style={{ fontSize: "2rem", color: "gray" }} />
                  </Col>
                </Row>
              </Col>
              <Col span={1} />
              <Col span={12}>
                <Row justify="end" align="bottom">
                  <StyleText style={{ fontSize: "1.8rem", fontWeight: "bold" }}>เกี่ยวกับเรา</StyleText>
                  <StyleText>ที่ Sport Shop เราคัดสรร และจัดจำหน่ายแต่สินค้าด้านแฟชั่นกีฬามายาวนานกว่า 15 ปี คุณจึงมันใจได้เลยว่าสินค้าของเราเป็นสินค้าแฟชั่นที่ทันยุคทันสมัย และเต็มเปี่ยมไปด้วยคุณภาพ</StyleText>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row justify="start" style={{ paddingLeft: "1rem", backgroundColor: "#2582b0", width: "100vw" }}>
          <Text style={{ color: "#e8eced" }}>© 2024 Sport Shop. All rights reserved.</Text>
        </Row>

      </Row>

    </div>
  )
}

export default UserLayout