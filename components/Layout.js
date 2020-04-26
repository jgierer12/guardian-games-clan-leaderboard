import styled from "styled-components";
import Head from "next/head";

import SiteHeader from "./SiteHeader";

const Body = styled.div`
  background: #363e4a;
  height: 100%;
  min-height: 100vh;

  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 18px;
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const Main = styled.main``;

const Layout = ({ pageTitleParts = [], children }) => {
  const siteTitle = `Guardian Games Clan Leaderboard`;
  const pageTitle = [...pageTitleParts, siteTitle].join(` | `);
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Body>
        <Container>
          <SiteHeader />
          <Main>{children}</Main>
        </Container>
      </Body>
    </>
  );
};

export default Layout;
