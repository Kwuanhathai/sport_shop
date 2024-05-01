import { Card, Typography, Image } from "antd"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { InfoCircleOutlined } from "@ant-design/icons"

const { Text } = Typography;

const IconContainer = styled.div`
  display: flex;
  justify-content: end;
  padding-bottom: 0.5rem;
`;

const StyledSportCard = styled.div`
  margin: 2rem;
  justify-content: center;
`;

const TextContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;


const SportCard = (props: any) => {

    const { data } = props

    let navigate = useNavigate();

    const handleOnIconInfoClick = () => {
        navigate(`product-details/${data?.id}`);
    };


    return (
        <StyledSportCard>
            <Card style={{
                width: "27rem",
                height: "27rem",
                padding: "1rem",
                borderRadius: "2rem",
                backgroundColor: "white",
                flexWrap: "wrap",
                overflowX: "hidden",
            }}
            >
                <IconContainer>
                    <InfoCircleOutlined
                        style={{ fontSize: "2rem" }}
                    onClick={handleOnIconInfoClick}
                    />
                </IconContainer>
                <Image
                    src={`https://sport-shop-8.onrender.com/image/${data.picture}`}
                    style={{
                        width: "20rem",
                        height: "15rem",
                        borderRadius: "1rem",
                        objectFit: "cover"
                    }}
                />
                <TextContainer>
                    <Text style={{ fontSize: "1.4rem", textAlign: "center", color: "black",fontWeight: "bolder", fontFamily: "Mali" }}>
                        {data.name}
                    </Text>
                </TextContainer>
            </Card>
        </StyledSportCard>


    );
};

export default SportCard;
