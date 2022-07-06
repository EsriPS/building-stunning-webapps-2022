import styled from 'styled-components';
import HeroImage from 'assets/main.png';

const StyledHero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 700px;
  min-height: 700px;
  width: 100%;
  background: var(--calcite-ui-brand);
  background-image: url(${() => HeroImage});
  background-attachment: fixed;
  background-position: top;
  background-size: cover;
`;

const StyledUser = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 500px;
  text-align: right;
`;

const StyledHeroTitle = styled.div`
  margin: 6rem auto 1rem;
  text-align: center;
  @media (max-width: 575px) {
    margin: 3rem auto 1rem;
  }
`;

const StyledH1 = styled.h1`
  font-family: var(--calcite-accent-family);
  text-shadow: 0 0 3px var(--calcite-ui-text-3);
  color: var(--calcite-ui-text-inverse);
  font-size: 6rem;
  font-weight: bold;
  line-height: 5rem;
  @media (max-width: 575px) {
    font-size: 3rem;
    line-height: 3rem;
  }
`;

const StyledH2 = styled.h2`
  font-weight: bold;
  color: var(--calcite-ui-text-inverse);
  text-shadow: 0 0 3px var(--calcite-ui-text-3);
  font-size: 2.5rem;
  font-family: var(--calcite-accent-family);
  @media (max-width: 575px) {
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
`;

const StyledHeroContainer = styled.div`
  display: flex;
  flex: 0 2 auto;
  flex-direction: column;
  width: 45rem;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  color: black;
  @media (max-width: 575px) {
    margin: 0 1rem;
    width: inherit;
  }
`;

export {
  StyledHero,
  StyledUser,
  StyledH1,
  StyledH2,
  StyledHeroContainer,
  StyledHeroTitle,
};
