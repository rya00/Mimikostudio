import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listEvents, deleteEvent, createEvent } from '../actions/eventActions'
import { EVENT_CREATE_RESET } from '../constants/eventConstants'


function EventListScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const { id } = useParams()

    const eventList = useSelector(state => state.eventList)
    // Destructuring eventList and pulling out data
    const {loading, error, events, pages, page} = eventList

    const eventDelete = useSelector(state => state.eventDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = eventDelete
    
    const eventCreate = useSelector(state => state.eventCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, event:createdEvent} = eventCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const location = useLocation()

    let keyword = location.search

    useEffect(() => {
        dispatch({type:EVENT_CREATE_RESET})

        if(!userInfo.isAdmin){
            navigate('/login')
        }

        if(successCreate){
            navigate(`/admin/event/${createdEvent._id}/edit`)
        }else{
            dispatch(listEvents(keyword))
        }
        
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdEvent, keyword])

    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure you want to delete this event?')){
            dispatch(deleteEvent(id))
        }
    }

    const createEventHandler = () =>{
        dispatch(createEvent())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='auto-underline-animation'>Events</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3 standard-btn' onClick={createEventHandler}>
                        <i className='fa fa-plus'></i>Add Event
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading 
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>DATE</th>
                                        <th>LOCATION</th>
                                        <th></th>
                                    </tr> 
                                </thead>

                                <tbody>
                                    {events.map(event => (
                                        <tr key={event._id}>
                                            <td>{event._id}</td>
                                            <td>{event.title}</td>
                                            <td>{event.date}</td>
                                            <td>{event.location}</td>
                                            <td>
                                                <LinkContainer to={`/admin/event/${event._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>
                                                
                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(event._id)}>
                                                        <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true} />
                        </div>
                    ) 
            }
        
        </div>
    )
}

export default EventListScreen
