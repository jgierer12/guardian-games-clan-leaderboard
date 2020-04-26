import { useState, useEffect, useRef } from "react";

import bungieFetch from "../lib/bungieFetch";
import getMemberDetails from "../lib/getMemberDetails";
import Table from "./Table";

const Leaderboard = ({ clanId }) => {
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [memberData, setMemberData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!clanId) return;

    bungieFetch(`/Platform/GroupV2/${clanId}/Members/`)
      .then((res) => {
        if (!isMounted.current) return;

        const members = res.results;
        const limitedMembers = [members[0]];

        let partialMemberData = {};
        members.forEach((member) => {
          const memberId = member.destinyUserInfo.membershipId;
          partialMemberData[memberId] = {
            name: member.destinyUserInfo.LastSeenDisplayName,
            details: null,
            internal: {
              id: memberId,
              type: member.destinyUserInfo.membershipType,
            },
          };
        });

        setMemberData(partialMemberData);

        Object.values(partialMemberData).forEach((partialMember) => {
          bungieFetch(
            `/Platform/Destiny2/${partialMember.internal.type}/Profile/${partialMember.internal.id}/?components=100,900`
          )
            .then((res) => {
              if (!isMounted.current) return;

              const details = getMemberDetails(res);

              setMemberData((prevMemberData) => ({
                ...prevMemberData,
                [partialMember.internal.id]: { ...partialMember, details },
              }));
            })
            .catch((err) => {
              console.error(err);

              if (!isMounted.current) return;
              setMemberData(null);
              setError(err);
            });
        });
      })
      .catch((err) => {
        console.error(err);

        if (!isMounted.current) return;
        setMemberData(null);
        setError(err);
      });
  }, [clanId]);

  if (error) return <div>failed to load: {JSON.stringify(error, null, 2)}</div>;
  if (!memberData) return <div>loading...</div>;
  return <Table memberData={Object.values(memberData)} />;
};

export default Leaderboard;
