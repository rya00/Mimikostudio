import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import { SEED } from "../env";
import { Link } from "react-router-dom";
import { IoLocationSharp, IoCalendar } from "react-icons/io5";

function Event({ event }) {
  return (
    <div>
      <Card className="product-card">
        <div className="product-img-container" style={{minHeight: "50%"}}>
          <Card.Img src={`${SEED}${event.image}`} />
        </div>

        <Card.Body className="product-card-body">
          <div className="product-card-title">
            <p className="painting-title">{event.title}</p>
          </div>

          <div className="event-location">
            <IoLocationSharp />
            <p>{event.location}</p>
          </div>

          <div className="event-date">
            <IoCalendar />
            <p>{event.date.substring(0, 10)}</p>
          </div>

          <p>Description: {event.event_description}</p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Event;
