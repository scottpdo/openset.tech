import Grid from "../components/Grid";
import Column from "../components/Column";
import Section from "../components/Section";

const Contact = () => (
  <Section>
    <Grid>
      <Column width={2} />
      <Column width={4}>
        <h3>Contact</h3>
        <p>
          For general inquiries, email{" "}
          <a href="mailto:hello@openset.tech">hello@openset.tech</a> or fill out
          this form.
        </p>
      </Column>
    </Grid>
  </Section>
);

export default Contact;
