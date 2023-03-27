import React from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import { SEED } from '../env'
import { Link } from 'react-router-dom'

function Event({event}) {

  return (
    <div>
    <Card className='my-3 p-3 rounded'>
        <Link to={`/event/${event._id}`}> 
            <Card.Img src={`${SEED}${event.image}`} />
        </Link>

        <Card.Body>
            <Link to={`/event/${event._id}`}> 
                <Card.Title as="div">
                    <strong>{event.title}</strong>
                </Card.Title>
            </Link>

            <Card.Text as='h3'>
                {event.location}
            </Card.Text>

            <Card.Text as='h3'>
                {event.date}
            </Card.Text>

            <Card.Text>
                {event.event_description}
            </Card.Text>
        </Card.Body>        
    </Card>
    </div>
  )
}
 

export default Event
