import Grid from "../components/Grid";
import Column from "../components/Column";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import styled, { keyframes } from "styled-components";
import { useState, useRef } from "react";
import GLButton from "../components/GLButton";
import * as Breakpoints from "../styles/breakpoints";

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
  border: 1px solid #00f;
  border-radius: 2px;
  border-top-width: 0;
  border-right-width: 0;
  display: block;
  color: #424242;
  font-family: "Yrsa", "Times New Roman", Times, serif;
  font-size: 1rem;
  width: 100%;
  /* box-shadow: inset 1px -1px 0 0px #00f; */
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

const Info = styled.p`
  margin-top: 0;
  max-width: 420px;
  @media screen and (max-width: ${Breakpoints.M}px) {
    max-width: none;
  }
`;

const StyledForm = styled.form`
  transition: 0.3s opacity;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Thanks = styled.h3`
  animation: 0.5s ${fadeIn};
  position: absolute;
  top: 40px;
  width: 100%;
  left: 0;
  text-align: center;
`;

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const form = useRef<HTMLFormElement>();
  const formURL =
    "https://script.google.com/macros/s/AKfycbxaJXofM8cZoaCuJY3ltWPOSRyeQ4SNS1qTTaL-ICoYINFLEvJwD7W-bQ/exec";
  return (
    <div id="contact">
      <Section dir="right">
        <Grid>
          <Column width={4} medWidth={12}>
            <SectionTitle>Contact</SectionTitle>
          </Column>
        </Grid>
        <Grid>
          <Column width={4} medWidth={12}>
            <Info>
              For general inquiries, email{" "}
              <a href="mailto:hello@openset.tech">hello@openset.tech</a> or fill
              out this form.
            </Info>
          </Column>
          <Column width={6} medWidth={12}>
            <div>
              <StyledForm
                action={formURL}
                method="POST"
                ref={form}
                style={{ opacity: submitted ? 0 : 1 }}
                onSubmit={e => {
                  e.preventDefault();
                  const body = new FormData();
                  const elements = Array.from(form.current.elements);
                  elements.forEach((el: HTMLInputElement) => {
                    if (el.name && el.value) {
                      body.append(el.name, el.value);
                    }
                  });
                  fetch(formURL, {
                    method: "POST",
                    body
                  });
                  setSubmitted(true);
                }}
              >
                <Label htmlFor="name">
                  <Input
                    name="name"
                    id="name"
                    type="text"
                    required
                    placeholder=" "
                  />
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
                  <Input
                    as="textarea"
                    name="message"
                    id="message"
                    placeholder=" "
                  />
                  <span>Message</span>
                </Label>
                {/* @ts-ignore */}
                <GLButton style={{ float: "right" }}>Send</GLButton>
              </StyledForm>
              {submitted && (
                <Thanks>
                  Thanks for your inquiry. We'll be in touch with you soon!
                </Thanks>
              )}
            </div>
          </Column>
        </Grid>
      </Section>
    </div>
  );
};

export default Contact;
