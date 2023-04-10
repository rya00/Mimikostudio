import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {BsSearch} from "react-icons/bs"
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
    <Form onSubmit={submitHandler} style={{marginLeft: "auto"}}>
      <div className="search-item-container">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          className="mr-sm-2 ml-sm-5 search-bar"
          placeholder="Search for painting..."
        ></Form.Control>

        <Button type="submit" variant="outline-success" className="search-item-submit">
          <BsSearch size={20} style={{color: 'white'}}/>
        </Button>
      </div>
    </Form>
  );
}

export default SearchBox;
