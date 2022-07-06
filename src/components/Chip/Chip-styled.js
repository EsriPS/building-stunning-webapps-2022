import styled, { css } from "styled-components";

const StyledChip = styled.span`
  padding: 0.1rem 1rem;
  font-size: 0.875rem;
  color: var(--calcite-ui-text-inverse);
  ${(props) =>
    props.difficulty === "easy" &&
    css`
      background: var(--difficulty-easy);
    `};
  ${(props) =>
    props.difficulty === "moderate" &&
    css`
      background: var(--difficulty-moderate);
    `};
  ${(props) =>
    props.difficulty === "difficult" &&
    css`
      background: var(--difficulty-difficult);
    `};
`;

export { StyledChip };

