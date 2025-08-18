import {
  PageContainer,
  Content,
  PageTitle,
  Text,
  HeaderImage,
  HeaderImageContainer,
} from '../styles/HomePage.styles';
import MainStreetImage from '/images/Main Street east side_0001.jpg';

export default function Home() {
  return (
    <>
      <HeaderImageContainer>
        <PageTitle fontWeight={400} letterSpacing="0.5rem" as="h1" overlay>
          NU ART FILM SOCIETY
        </PageTitle>
        <HeaderImage src={MainStreetImage} alt="Main Street" />
      </HeaderImageContainer>
      <PageContainer>
        <Content>
          <Text>
            Discover the world of cinema through our carefully curated film
            screenings. Join us for an unforgettable journey through classic and
            contemporary films.
          </Text>
        </Content>
      </PageContainer>
    </>
  );
}
