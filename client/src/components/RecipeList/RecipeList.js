import React from "react";

// RecipeList renders a bootstrap list item
export const RecipeList = props => (
  <ul className="card-deck">{props.children}</ul>
);
