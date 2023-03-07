import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../index.css"

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`);
    } else {
      navigate(navigate(navigate.location.pathname));
    }
  };
  return (
    <Form onSubmit={submitHandler}>
      <div className="search-item-container">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          className="mr-sm-2 ml-sm-5 search-bar"
        ></Form.Control>

        <Button type="submit" variant="outline-success" className="p-2 searh-item-submit">
          Search
        </Button>
      </div>
    </Form>
  );
}

export default SearchBox;
