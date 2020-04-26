import styled from "styled-components";
import { useState, useRef, useCallback, useEffect } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";

import bungieFetch from "../lib/bungieFetch";

const Dropdown = styled.ul`
  position: absolute;
  width: 100%;
  padding: 0 20px;

  background: #475261;

  box-shadow: 0 0 0 1px #363e4a;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const DropdownItem = styled.li`
  padding: 10px;
  a {
    color: #fff;
    text-decoration: none;
    display: block;
  }
`;

const DropdownResults = ({ results, error }) => {
  if (error) return <DropdownItem>error</DropdownItem>;
  if (!results) return <DropdownItem>loading...</DropdownItem>;
  if (results.length === 0) return <DropdownItem>no results</DropdownItem>;
  return results.map((result) => (
    <DropdownItem key={result.groupId}>
      <Link href={`/clan/${result.groupId}`}>
        <a>
          {result.name} [{result.clanInfo.clanCallsign}]
        </a>
      </Link>
    </DropdownItem>
  ));
};

const SearchDropdown = ({ value }) => {
  const [debouncedValue] = useDebounce(value, 250);

  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [lastChange, setLastChange] = useState(Date.now());

  useEffect(() => {
    const timestamp = Date.now();

    bungieFetch(`/Platform/GroupV2/Search/`, {
      name: debouncedValue,
      groupType: 1,
    })
      .then((res) => {
        if (lastChange < timestamp) {
          setResults(res.results);
          setError(null);
          setLastChange(timestamp);
        }
      })
      .catch((err) => {
        if (lastChange < timestamp) {
          setResults(null);
          setError(err);
          setLastChange(timestamp);
        }
      });
  }, [debouncedValue]);

  return (
    <Dropdown>
      <DropdownResults results={results} error={error} />
    </Dropdown>
  );
};

export default SearchDropdown;
