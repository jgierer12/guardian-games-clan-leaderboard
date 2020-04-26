import styled, { css } from "styled-components";

const Row = styled.tr`
  &:nth-child(odd) {
    background: #3e4a58;
  }
  &:nth-child(even) {
    background: #475261;
  }
`;

const Td = styled.td`
  padding: 15px 20px;
  text-align: ${(props) => props.align || `left`};
  &:not(:first-child) {
    border-left: 1px solid rgba(54, 62, 74, 0.5);
  }

  ${(props) =>
    props.isNumber &&
    css`
      font-variant-numeric: tabular-nums;
    `}
`;

const Details = ({ data }) => {
  if (!data) {
    return (
      <Td colSpan="3" align="center">
        loading...
      </Td>
    );
  }

  if (data.noRecords) {
    return (
      <Td colSpan="3" align="center">
        no data
      </Td>
    );
  }

  return (
    <>
      <Td align="right" isNumber>
        {data.medals}
      </Td>
      <Td align="right" isNumber>
        {data.goldMedals}
      </Td>
      <Td align="right" isNumber>
        {data.laurels}
      </Td>
    </>
  );
};

const Member = ({ data, index }) => {
  return (
    <Row>
      <Td align="center" isNumber>
        {data.details && !data.details.noRecords ? index + 1 : `?`}
      </Td>
      <Td>{data.name}</Td>
      <Details data={data.details} />
    </Row>
  );
};

export default Member;
