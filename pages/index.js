import styled from "styled-components";

import Layout from "../components/Layout";

const Intro = styled.p`
  text-align: center;
`;

const IndexPage = () => {
  return (
    <Layout>
      <Intro>
        Use the search field above to find your clan and show your Guardian
        Games 2020 leaderboard!
      </Intro>
    </Layout>
  );
};

export default IndexPage;
