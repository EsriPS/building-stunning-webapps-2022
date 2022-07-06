import styled from "styled-components";

const StyledWhereTo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2rem;
  @media (max-width: 575px) {
    margin: 1.5rem;
  }
`;

const StyledH2 = styled.h2`
  margin: 0 0 1rem 0;
  font-weight: var(--calcite-font-weight-medium);

  @media (max-width: 575px) {
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin: 0 0 0.5rem 0;
  }
`;

const StyledQuickLinksContainer = styled.div`
  padding-top: 1rem;
  width: 100%;
  color: #4c4c4c;
  text-align: start;

  a {
    color: var(--calcite-ui-text-link);
    text-decoration: none;
    margin: 0 0.5rem;
    transition: 0.2s;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export {
  StyledWhereTo,
  StyledQuickLinksContainer,
  StyledH2,
};

