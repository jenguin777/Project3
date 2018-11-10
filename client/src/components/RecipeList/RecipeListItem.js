import React from "react";
import Thumbnail from "../Thumbnail";
import { Row, Col } from "../Grid";
import "./RecipeListItem.css";

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export const RecipeListItem = props => (
  <li className="list-group-item">

      <Row>
        <Col size="xs-3 sm-2">
          <Thumbnail src={props.thumbnail} />
        </Col>
        <Col size="xs-7 sm-9">
          <h3>{props.title}</h3>
          <p>Ingredients: {props.ingredients}</p>
          <a rel="noreferrer noopener" target="_blank" href={props.href}>
            Go to recipe!
          </a>
        </Col>
        <span className="fave-btn" onClick={() => props.onClick(props.index)}>
          <i className="fas fa-heart"></i>
        </span>
      </Row>

  </li>
);
