import { observer } from 'mobx-react-lite';
import {
  PageContainer,
  Content,
  PageTitle,
  Text,
  HeaderImageContainer,
} from '../styles/HomePage.styles';
import { Section } from '../styles/Page.styles';
import SafeImg from '../components/SafeImg';
import { LinkButton } from '../components/LinkButton';
import { Button } from '../styles/Page.styles';
import MainStreetImage from '/images/Main Street east side_0001.jpg';

const Home = () => {
  return (
    <>
      <HeaderImageContainer>
        <PageTitle fontWeight={400} letterSpacing="0.5rem" as="h1" overlay>
          NU ART FILM CLUB
        </PageTitle>
        <SafeImg
          src={MainStreetImage}
          alt="Historic Main Street"
          loading="lazy"
        />
      </HeaderImageContainer>

      <PageContainer>
        <Content id="main">
          <Section>
            <Text>
              Discover cinema that matters. Curated screenings. Thoughtful
              discussion. Independent spirit.
            </Text>

            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                marginTop: '0.5rem',
              }}
            >
              <Button>
                <LinkButton
                  to="/NuArtFilmClub/films"
                  aria-label="View schedule"
                >
                  View schedule
                </LinkButton>
              </Button>
            </div>
          </Section>
        </Content>
      </PageContainer>
    </>
  );
};

const ObservedHome = observer(Home);
export default ObservedHome;
