import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import Leaderboard from "../../components/Leaderboard";
import { ClanProvider } from "../../context/clan";
import bungieFetch from "../../lib/bungieFetch";

const ClanPage = () => {
  const router = useRouter();
  const { clanId } = router.query;

  const [clanDetail, setClanDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!clanId) return;

    bungieFetch(`/Platform/GroupV2/${clanId}`)
      .then((res) => {
        setClanDetail(res.detail);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setClanDetail(null);
        setError(err);
      });
  }, [clanId]);

  return (
    <ClanProvider value={clanDetail}>
      <Layout pageTitleParts={[clanDetail ? clanDetail.name : `Loading...`]}>
        <Leaderboard clanId={clanId} />
      </Layout>
    </ClanProvider>
  );
};

export default ClanPage;
