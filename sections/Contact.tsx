import Grid from "../components/Grid";
import Column from "../components/Column";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import styled from "styled-components";
import { useState, useRef } from "react";
import GLButton from "../components/GLButton";

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

const Button = styled.button`
  appearance: none;
  color: #fff;
  background: #00f;
  font-size: 24px;
  padding: 6px 20px;
  border: 0 none;
  border-radius: 2px;
  font-family: "Yrsa", "Times New Roman", Times, serif;
  float: right;
  cursor: pointer;
`;

const Info = styled.p`
  margin-top: 0;
`;

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const form = useRef<HTMLFormElement>();
  const formURL =
    "https://script.google.com/macros/s/AKfycbxcJUO7z9UW0MG30WtR2GvdGVeTIqNi7Mged52e-VTlNmf6luBx/exec";
  return (
    <div id="contact">
      <Section dir="right">
        <Grid>
          <Column width={6} medWidth={12}>
            <SectionTitle>Contact</SectionTitle>
          </Column>
        </Grid>
        <Grid>
          <Column width={3} largeWidth={5} medWidth={12}>
            <Info>
              For general inquiries, email{" "}
              <a href="mailto:hello@openset.tech">hello@openset.tech</a> or fill
              out this form.
            </Info>
          </Column>
          <Column width={6} medWidth={12}>
            {!submitted ? (
              <form
                action={formURL}
                method="POST"
                ref={form}
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
                    body,
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
              </form>
            ) : (
              "Thanks for getting in touch."
            )}
          </Column>
        </Grid>
      </Section>
    </div>
  );
};

export default Contact;
