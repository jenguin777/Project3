import React from "react";
import Thumbnail from "../Thumbnail";
import { Row, Col } from "../Grid";

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export const RecipeListItem = props => (
  <Col size="md-6">
    <div className="card-deck">
      <div className="card">
        <Row>
          <div className="card-img-top" alt="Card image cap">
            <Col size="sm-4 sm-12">
              <Thumbnail src={props.thumbnail || "https://i.imgur.com/m02Q9u2.png"} />
            </Col>
          </div>
          <div className="card-body">
            <Col size="sm-3 md-12">
              <div className="card-title">
                <h3>{props.title}</h3>
              </div>
              <div className="card-text">
                <p>Ingredients: {props.ingredients}</p>
                <a rel="noreferrer noopener" target="_blank" href={props.href}>
                  Go to recipe!
                </a>
                <span className="fave-btn" onClick={() => props.onClick(props.index)}>
                  <i className="far fa-heart" data-test="pulse">  Save</i>
                </span>
              </div>
            </Col>
          </div>
        </Row>
      </div>
    </div>
  </Col>
);
