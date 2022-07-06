import styled from "styled-components";

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  color: var(--calcite-ui-text-inverse);
  z-index: 2;
  justify-content: space-between;
  align-items: center;
  line-height: normal;
  padding: 0.5rem 0;
  background: var(--calcite-ui-brand);
`;

const StyledH1 = styled.h1`
  font-family: var(--calcite-accent-family);
  color: var(--calcite-ui-text-inverse);
  font-size: 2rem;
  line-height: inherit;
  text-align: center;
  margin: 0;

  a {
    color: var(--calcite-ui-text-inverse);
    text-decoration: none;
  }
`;

const SearchWrapper = styled.div`
  color: var(--calcite-ui-foreground-1);
  width: 16rem;
  margin-inline-start: 1rem;
  text-align: start;

  @media (max-width: 575px) {
    width: 100%;
  }

  input {
    border: 0;
    margin: 0;
  }
`;

const UserWrapper = styled.div`
  text-align: end;
  margin-inline-end: 1rem;
`;

export {
  StyledHeader,
  StyledH1,
  SearchWrapper,
  UserWrapper,
};

