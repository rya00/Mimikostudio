import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listEvents, updateEvent } from '../actions/eventActions'
import { EVENT_UPDATE_RESET } from '../constants/eventConstants'

function EventListScreen() {
    const {id} = useParams()

    const eventId = id

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState(0)
    const [event_description, setEventDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const eventDetails = useSelector(state => state.eventDetails)
    const {error, loading, event} = eventDetails

    const eventUpdate = useSelector(state => state.eventUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = eventUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type:EVENT_UPDATE_RESET})
            navigate('/admin/eventlist')
        }else{
            if(!event.title || event._id !== Number(eventId)){
                dispatch(listEvents(eventId))
            }else{
                setTitle(event.title)
                setDate(event.date)
                setImage(event.image)
                setLocation(event.location)
                setEventDescription(event.event_description)
            }
        }
    }, [dispatch, event, eventId, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateEvent({
            _id:eventId,
            title,
            date,
            image,
            location,
            event_description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        // Using form data function and adding file and event id to form data
        const formData = new FormData()

        formData.append('image', file)
        formData.append('event_id', eventId)

        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/events/upload/', formData, config)

            setImage(data)
            setUploading(false)
        }catch(error){
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/eventlist'>
                Go Back            
            </Link>
            <FormContainer>
                <h1> Edit Event</h1>
                {loadingUpdate && < Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
                    :(
                        <Form onSubmit={ submitHandler }>
                            <Form.Group controlId='title'>
                                <Form.Label>Title:</Form.Label>
                                <Form.Control
                                    type='title'
                                    placeholder='Enter title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value) }
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='date'>
                                <Form.Label>Date:</Form.Label>
                                <Form.Control
                                    type='date'
                                    placeholder='Enter Date'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value) }
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Image:</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value) }
                                >
                                </Form.Control>
                                <Form.Control
                                    type='file'
                                    name='file'
                                    onChange={uploadFileHandler}
                                >
                                </Form.Control>
                                {uploading && <Loader />}
                            </Form.Group>

                            <Form.Group controlId='location'>
                                <Form.Label>Location:</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter location'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value) }
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='event_description'>
                                <Form.Label>Description:</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter description'
                                    value={event_description}
                                    onChange={(e) => setEventDescription(e.target.value) }
                                >
                                </Form.Control>
                            </Form.Group>                           

                            <Button type='submit' variant='primary'> 
                                Update
                            </Button>
                        </Form>
                    )
                }                        
            </FormContainer>
        </div>
    )
}

export default EventListScreen
