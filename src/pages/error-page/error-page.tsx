import { Card, Typography, Button } from "antd"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FrownOutlined } from "@ant-design/icons"

const { Text } = Typography

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 5vh;
  bottom: 5rem;
`;

const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  padding-top: 5%;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40vh;
  padding: 3%;
`;

const ButtonBox = styled.div`
  margin-top: 3rem;
  height: 10vh;
`;

const ErrorPage = () => {
  let navigate = useNavigate();

  const goBack = () => {
    navigate(`/`, { replace: true });
  };

  return (
    <div>
      <CardContainer>
        <Card
          style={{
            width: "85vw",
            borderRadius: "3rem",
            backgroundColor: "rgba(37, 130, 176, 0.906)"
          }}
        >
          <ErrorPageContainer>
            <IconBox>
              <FrownOutlined style={{fontSize: "20rem"}} />
            </IconBox>
            <TextBox>
              <Text style={{fontSize: "4.8rem"}}> 404 </Text>
              <Text style={{fontSize: "3.6rem"}}> Not found </Text>
              <Text style={{fontSize: "2.2rem"}}> Sorry, cannot find this page </Text>
            </TextBox>
            <ButtonBox>
              <Button size={"large"} onClick={goBack}>
                GO BACK
              </Button>
            </ButtonBox>
          </ErrorPageContainer>
        </Card>
      </CardContainer>
    </div>
  );
};

export default ErrorPage;
