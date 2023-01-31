import HeroSlider, { Overlay, Slide, MenuNav } from "hero-slider";
import Wrapper from "./Wrapper";
import Title from "./Title";
import Subtitle from "./Subtitle";
import image1 from "../../assets/image1.jpeg";
import image2 from "../../assets/image2.jpeg";
import image3 from "../../assets/image3.jpeg";
import image4 from "../../assets/image4.jpeg";

const bogliasco = `${image1}`;
const countyClare = `${image2}`;
const craterRock = `${image3}`;
const giauPass = `${image4}`;

export default function BasicSlider() {
  return (
    <HeroSlider
      className="heroSlider"
      height={"70vh"}
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 100,
        onSliding: (nextSlide) =>
          console.debug("onSliding(nextSlide): ", nextSlide),
        onBeforeSliding: (previousSlide, nextSlide) =>
          console.debug(
            "onBeforeSliding(previousSlide, nextSlide): ",
            previousSlide,
            nextSlide
          ),
        onAfterSliding: (nextSlide) =>
          console.debug("onAfterSliding(nextSlide): ", nextSlide),
      }}
    >
      {/* <Overlay>
        <Wrapper>
          <Title>FIN Investments Inc.</Title>
          <Subtitle>Friends In Need</Subtitle>
        </Wrapper>
      </Overlay> */}

      <Slide
        shouldRenderMask
        background={{
          backgroundImageSrc: giauPass,
        }}
      />

      <Slide
        shouldRenderMask
        background={{
          backgroundImageSrc: bogliasco,
        }}
      />

      <Slide
        shouldRenderMask
        background={{
          backgroundImageSrc: countyClare,
        }}
      />

      <Slide
        shouldRenderMask
        background={{
          backgroundImageSrc: craterRock,
        }}
      />
    </HeroSlider>
  );
}
