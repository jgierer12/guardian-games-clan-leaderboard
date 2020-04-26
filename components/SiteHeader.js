import styled from "styled-components";

import Search from "./Search";

const Container = styled.header`
  padding: 40px 20px;
  text-align: center;
`;

const Heading = styled.h2`
  color: #aeb8c5;
  font-weight: 500;
  margin-bottom: 20px;
`;

const SiteHeader = () => {
  return (
    <Container>
      <Heading>Guardian Games Clan Leaderboard</Heading>
      <Search />
    </Container>
  );
};

export default SiteHeader;
