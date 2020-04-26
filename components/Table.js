import { useState, useMemo } from "react";
import styled, { css } from "styled-components";

import Member from "./Member";

const Container = styled.table`
  width: 100%;
`;

const Th = styled.th`
  padding: 15px 20px;
  text-align: ${(props) => props.align || `left`};
  &:not(:first-child) {
    border-left: 1px solid rgba(54, 62, 74, 0.5);
  }

  font-weight: 500;

  ${(props) =>
    props.clickable &&
    css`
      cursor: pointer;
    `}
`;

const HeaderRow = styled.tr`
  background: #545e6b;
  & > :first-child {
    border-top-left-radius: 4px;
  }
  & > :last-child {
    border-top-right-radius: 4px;
  }
  border-bottom: 1px solid rgba(54, 62, 74, 0.5);
`;

const Table = ({ memberData }) => {
  const [sortBy, setSortBy] = useState("medals");

  const sortedData = useMemo(() => {
    return memberData.sort((a, b) => {
      if (!b.details || b.details.noRecords) {
        return -1;
      }
      if (!a.details || a.details.noRecords) {
        return 1;
      }

      return b.details[sortBy] - a.details[sortBy];
    });
  }, [memberData, sortBy]);

  return (
    <Container>
      <thead>
        <HeaderRow>
          <Th align="center">#</Th>
          <Th>Member</Th>
          <Th
            onClick={() => setSortBy("medals")}
            clickable
            align="right"
            role="button"
          >
            Medals{" "}
            <span className="sortIndicator">
              {sortBy === "medals" ? "▾" : "▿"}
            </span>
          </Th>
          <Th
            onClick={() => setSortBy("goldMedals")}
            clickable
            align="right"
            role="button"
          >
            Gold Medals{" "}
            <span className="sortIndicator">
              {sortBy === "goldMedals" ? "▾" : "▿"}
            </span>
          </Th>
          <Th
            onClick={() => setSortBy("laurels")}
            clickable
            align="right"
            role="button"
          >
            Laurels{" "}
            <span className="sortIndicator">
              {sortBy === "laurels" ? "▾" : "▿"}
            </span>
          </Th>
        </HeaderRow>
      </thead>
      <tbody>
        {sortedData.map((member, i) => (
          <Member data={member} key={i} index={i} />
        ))}
      </tbody>
    </Container>
  );
};

export default Table;
