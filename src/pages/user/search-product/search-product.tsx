import { Row, Card, Typography, Input } from "antd"
import { useState } from "react";
import styled from "styled-components"
import SportCard from "../../../components/subcomponents/sport-card/sport-card"

const { Text } = Typography;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 5rem;
  bottom: 5rem;
`;

const StyleRow = styled(Row)`
  justify-content: center;
  align-items: center;
  height: 9vh;
  padding-bottom: 2rem;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const SearchDiv = styled.div`
  height: 9vh;
  width: 60%;
  margin-bottom: 0.5vh;
`;

const SportCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow-x: hidden;
  height: 65vh;
  width: 100%;
`;


const SearchProduct = (props: any) => {

  const { data } = props

  const [searchText, setSearchText] = useState("");

  const filteredSportCard = data?.filter((sportCard: any) => {
    return sportCard?.name?.toLowerCase().includes(searchText.toLowerCase());
  });

  const sportCardElement = filteredSportCard?.map((data: any, index: number) => {
    return <SportCard key={index} data={data} />;
  });


  return (
    <div>
      <CardContainer>
        <Card
          style={{
            width: "90%",
            height: "80%",
            padding: "1rem",
            borderRadius: "2rem",
            backgroundColor: "rgba(37, 130, 176, 0.906)",
            flexWrap: "wrap",
            overflowX: "hidden"
          }}
        >
          <StyleRow>
            <Text style={{ fontSize: "3rem", fontWeight: "bolder", fontFamily: "Mali" }}>SPORT FASHION</Text>
          </StyleRow>
          <SearchContainer>
            <SearchDiv>
              <Input
                placeholder="ค้นหารายการสินค้า"
                onChange={(event) => {
                  setSearchText(event.target.value);
                }}
              />
            </SearchDiv>
          </SearchContainer>
          <SportCardContainer>
            {sportCardElement}
          </SportCardContainer>
        </Card>
      </CardContainer>
    </div>
  );
};

export default SearchProduct
