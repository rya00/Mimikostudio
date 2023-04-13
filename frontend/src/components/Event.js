import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import { SEED } from "../env";
import { Link } from "react-router-dom";

function Event({ event }) {
  return (
    <div>
      <Card className="product-card">
          <div className="product-img-container">
            <Card.Img src={`${SEED}${event.image}`} />
          </div>

        <Card.Body className="product-card-body">
          <Card.Title as="div">
            <strong>{event.title}</strong>
          </Card.Title>

          <Card.Text>{event.location}</Card.Text>

          <Card.Text>{event.date.substring(0, 10)}</Card.Text>

          <Card.Text>{event.event_description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Event;
