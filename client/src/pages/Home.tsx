import {
  PageContainer,
  Content,
  PageTitle,
  Text,
  HeaderImage,
} from '../styles/Page.styles';
import MainStreetImage from '/images/Main Street east side_0001.jpg';
import styled from '@emotion/styled';

const HomeContainer = styled.div`
  position: relative;
`;

export default function Home() {
  return (
    <HomeContainer>
      <HeaderImage src={MainStreetImage} alt="Main Street" />
      <PageContainer>
        <Content>
          <PageTitle>NuArt Film Society</PageTitle>
          <Text>
            Discover the world of cinema through our carefully curated film
            screenings. Join us for an unforgettable journey through classic and
            contemporary films.
          </Text>
        </Content>
      </PageContainer>
    </HomeContainer>
  );
}
