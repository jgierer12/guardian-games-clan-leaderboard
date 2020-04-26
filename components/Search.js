import { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";

import { useClan } from "../context/clan";
import useOnClickOutside from "../lib/useOnClickOutside";
import SearchDropdown from "./SearchDropdown";

const Container = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`;

const Input = styled.input`
  display: block;
  height: 50px;
  width: 100%;
  padding: 0 20px;

  text-align: center;
  font-size: 24px;
  font-family: "Inter", sans-serif;
  font-weight: 500;

  background: #555e6b;
  color: #fff;

  border: none;
  border-radius: 4px;

  ${(props) =>
    props.isExpanded &&
    css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
`;

const Search = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const clan = useClan();
  const [value, setValue] = useState();

  useEffect(() => {
    if (clan) setValue(clan.name);
  }, [clan]);

  const handleClickOutside = () => {
    setIsExpanded(false);
  };

  const containerRef = useRef();
  useOnClickOutside(containerRef, handleClickOutside);

  return (
    <Container ref={containerRef}>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClick={() => setIsExpanded(true)}
        isExpanded={isExpanded}
      />
      {isExpanded && <SearchDropdown value={value} />}
    </Container>
  );
};

export default Search;
