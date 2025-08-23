import { observer } from 'mobx-react-lite';
import {
  HeaderImageContainer,
  PageTitle,
} from '../styles/HomePage.styles';
import SafeImg from '../components/SafeImg';
import MobileActionCard from '../components/MobileActionCard';
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
        <MobileActionCard />
      </HeaderImageContainer>
    </>
  );
};

const ObservedHome = observer(Home);
export default ObservedHome;
