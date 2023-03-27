// useState and useEffect used for connecting to backend
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import Event from '../components/Event'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listEvents } from '../actions/eventActions'

/* <Message>{error}</Message> -> Error is passed as child in the component */

function EventScreen() {
  const location = useLocation()
  
  const dispatch = useDispatch()
  const eventList = useSelector(state => state.eventList)
  // Destructuring eventListReducer
  const {error, loading, events, page, pages} = eventList

  let keyword = location.search

  // useEffect ->  Triggered every single time the component loads or when a state value gets updated
  // In our app it gets triggered when the component first loads
  // Empty array kept because we only want this to update when the component loads not when an actual state element gets updated
  useEffect(() => {
    dispatch(listEvents(keyword))
  }, [dispatch, keyword]) 
  
  return (
    <div>
      {!keyword}

      <h1>Events</h1>
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          :
          <div>
            <Row>
              {events.map(event => (
                  // Key attribute is needed to map for looping in react
                  <Col key={event._id} sm={12} md={6} lg={4} xl={3}>
                      <Event event ={event} />
                  </Col>
              ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword}/>
          </div>
      }      
    </div>
  )
}

export default EventScreen