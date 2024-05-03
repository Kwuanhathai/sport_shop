import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Card, Typography, Image, Row, Col } from "antd"
import { BackwardOutlined } from "@ant-design/icons"


const { Text } = Typography;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 5vh;
  bottom: 5vh;
`;

const IconBox = styled.div`
  height: 8vh;
  width: 70vw;
`;

const StyledProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleBox = styled.div`
  height: 12vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const ContentBox = styled.div`
  height: 40vh;
  width: 50vw;

`;

const StyledText = styled(Text)`
  font-family: Mali;
  font-weight: bolder;
`

const ProductDetails = () => {
  const [productItem, setProductItem]: any = useState({});
  const { productID } = useParams();

  async function getProduct(ProductId: any) {
    const response = await fetch(
      `https://sport-shop-8.onrender.com/api/product-details/${ProductId}`
    );

    const ProductData = await response.json();
    setProductItem(ProductData);
  }

  useEffect(() => {
    getProduct(productID);
  }, [productID]);

  let navigate = useNavigate();

  const goBack = () => {
    navigate(`/`);
  };


  return (
    <div>

      <CardContainer>
        <Card style={{
          width: "80%",
          height: "80%",
          borderRadius: "2rem",
          backgroundColor: "rgba(37, 130, 176, 0.906)",
          flexWrap: "wrap",
          overflowX: "hidden"
        }}
        >
          <IconBox>
            <BackwardOutlined
              style={{ fontSize: "3rem" }}
              onClick={goBack}
            />
          </IconBox>

          <StyledProductDetail>
            <TitleBox>
              <StyledText style={{ fontSize: "2rem" }}>
                {productItem?.name}
              </StyledText>
            </TitleBox>

            <Row>
              <Col span={1} />
              <Col span={11}>
                <ContentBox style={{alignItems: 'flex-start'}}>
                  <Image
                    src={`https://sport-shop-8.onrender.com/image/${productItem?.picture}`}
                    style={{
                      width: "25vw",
                      height: "35wh",
                      borderRadius: "2rem"
                    }}
                  />
                </ContentBox>
              </Col>

              <Col span={11}>
                <Row>
                  <ContentBox>
                    <StyledText style={{ fontSize: "1.6rem" }}>
                      {productItem?.description}
                    </StyledText>
                  </ContentBox>
                </Row>
                <Row justify="end">
                  <div style={{ justifyContent: "end", alignItems: "end" }}>
                    <StyledText style={{ fontSize: "7rem" }}>
                      {productItem?.price.toLocaleString()}
                    </StyledText>
                    <StyledText style={{ fontSize: "1.6rem", paddingLeft: "2rem" }}> บาท</StyledText>
                  </div>
                </Row>
              </Col>

              <Col span={1} />
            </Row>
          </StyledProductDetail>
          <Row style={{ height: '4vh' }} />
        </Card>
      </CardContainer>

    </div>
  );
};

export default ProductDetails;
