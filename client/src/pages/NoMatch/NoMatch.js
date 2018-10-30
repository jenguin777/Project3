import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";

const NoMatch = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
        <Jumbotron>
          <h1>404 Page Not Found</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h1>
          <h6>
            Oops, It looks like a page got torn from the Recipe Book... Sorry!
          </h6>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

export default NoMatch;
