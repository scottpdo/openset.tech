import Grid from "../components/Grid";
import Column from "../components/Column";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  position: relative;

  span {
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.3s transform;
    transform-origin: 0 0;
    transform: scale(1) translate3d(10px, 10px, 0);
    font-smooth: always;
    -webkit-font-smoothing: always;
  }
`;

const Input = styled.input`
  background: transparent;
  display: block;
  color: #424242;
  font-family: "Yrsa", "Times New Roman", Times, serif;
  font-size: 1rem;
  width: 100%;
  box-shadow: inset 3px -3px 0 0px #00f;
  border: 0 none;
  border-radius: 0;
  padding: 10px 10px 10px 8px;
  margin-bottom: 20px;

  &:focus {
    outline: 0;
  }

  &:focus + span,
  &:not(:placeholder-shown) + span {
    transform: scale(0.7) translate3d(10px, -8px, 0);
  }
`;

const Button = styled.button`
  appearance: none;
  color: #fff;
  background: #00f;
  font-size: 24px;
  padding: 6px 20px;
  border: 0 none;
  border-radius: 0;
  font-family: "Yrsa", "Times New Roman", Times, serif;
  float: right;
  cursor: pointer;

  &:after {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    border: 3px solid #00f;
    z-index: -1;
    transform: translate3d(6px, 5px, 0);
    top: 0;
    left: 0;
    transition: 0.3s transform;
  }

  &:hover {
    &:after {
      transform: translate3d(10px, 9px, 0);
    }
  }

  &:active {
    &:after {
      transform: translate3d(0, 0, 0);
    }
  }
`;

const Contact = () => (
  <Section>
    <Grid>
      <Column width={2} largeWidth={1} medWidth={12} />
      <Column width={4} largeWidth={5} medWidth={12}>
        <SectionTitle>Contact</SectionTitle>
      </Column>
    </Grid>
    <Grid>
      <Column width={2} largeWidth={1} medWidth={12} />
      <Column width={4} largeWidth={5} medWidth={12}>
        <p style={{ marginTop: 0 }}>
          For general inquiries, email{" "}
          <a href="mailto:hello@openset.tech">hello@openset.tech</a> or fill out
          this form.
        </p>
      </Column>
      <Column width={6} medWidth={12}>
        <form action="" method="POST">
          <Label htmlFor="name">
            <Input name="name" id="name" type="text" required placeholder=" " />
            <span>Name</span>
          </Label>
          <Label htmlFor="email">
            <Input
              name="email"
              id="email"
              type="email"
              required
              placeholder=" "
            />
            <span>Email</span>
          </Label>
          <Label htmlFor="message">
            <Input as="textarea" name="message" id="message" placeholder=" " />
            <span>Message</span>
          </Label>
          <Button>Send</Button>
        </form>
      </Column>
    </Grid>
  </Section>
);

export default Contact;