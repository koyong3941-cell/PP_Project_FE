import {
  FooterWrapper,
  FooterContainer,
  InfoGroup,
  Section,
  BrandingArea,
  Right,
} from "./Footer.styles";
import link from "../../../assets/link.png";
import insta from "../../../assets/insta.png";
import youtube from "../../../assets/youtube.png";
import twitter from "../../../assets/twitter.png";

function Footer() {
  return (
    <FooterWrapper>
      <FooterContainer>
        <InfoGroup>
          <Section>
            <h3>WESTWOOD CREST MIDDLE SCHOOL</h3>
            <p>2415 CANDYLAND LANE</p>
            <p>LOS ANGELES, CA 90025</p>
          </Section>
          <Section>
            <p>PAPER LANTERNS © 2025</p>
            <p>HELLO@FIGMA.COM</p>
            <p>646.555.1234</p>
          </Section>
        </InfoGroup>

        <BrandingArea>
          <h1>Plant Plant</h1>
          <Right>
            <a href="#">
              <img src={link} style={{ width: "24px" }} />
            </a>
            <a href="#">
              <img src={insta} style={{ width: "24px" }} />
            </a>
            <a href="#">
              <img src={youtube} style={{ width: "24px" }} />
            </a>{" "}
            <a href="#">
              <img src={twitter} style={{ width: "24px" }} />
            </a>
          </Right>
        </BrandingArea>
      </FooterContainer>
    </FooterWrapper>
  );
}

export default Footer;
