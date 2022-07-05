import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import { getUserDetails } from "../actions/userAction";
import { listMyOrders } from "../actions/orderAction"

const ProfileScreen =({history})=>{
    // For UserDetails
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;
    const {userInfo} = userLogin;

    //For OrderDetails
    const orderList = useSelector(state => state.orderList);
    const {loading: loadingOrders, orders, error: errorOrders} = orderList;


    useEffect(()=>{
        if(!userInfo){
            history.push("/login");
        } else {
            if(!user.name){
                dispatch(getUserDetails("profile"));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    },[history, userInfo, dispatch, user])

    const submitHandler = (event)=>{
        event.preventDefault();
        
    }
    return<>
        <Row>
            <Col md={3}>
                <h1>Update Information</h1>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>{setName(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>
                    </Form.Group>
                    {/* <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmpassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Re-enter Password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">UPDATE</Button> */}
                </Form>
            </Col>
            <Col md={9}>
                <h1>My Orders</h1>
                {
                    loadingOrders ? <Loader/> : errorOrders ? <Message variant="danger">{errorOrders}</Message> :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order=>(
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0,10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0,10):<i className="fas fa-times" style={{color:"red"}}></i>}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0,10):<i className="fas fa-times" style={{color:"red"}}></i>}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant="light">Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                }
            </Col>
        </Row>
    </>
}

export default ProfileScreen;