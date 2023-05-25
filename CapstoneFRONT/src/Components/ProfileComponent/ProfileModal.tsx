import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ProfileModal.scss";
import { Form } from "react-bootstrap";
import { RootState } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { USER_MODIFY, modifyUser } from "../../Redux/ActionTypes";
import { userModify } from "../../Redux/Interface";

const ProfileModal = () => {
  const user = useSelector((state: RootState) => state.user.user);
const dispatch = useDispatch();
  const [userPayload, setUserPayload] = useState({
    username: user.username,
    email: user.email,
  });
  const handleChange = (e: any) => {
    setUserPayload({
      ...userPayload,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit=async (user:userModify,token:string,id:number)=>{
    let data = await modifyUser(user,token,id);
    console.log(data);
    
    dispatch({
      type:USER_MODIFY,
      payload: {username:data.username,email:data.email}
    })
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setUserPayload({
      username: user.username,
      email: user.email,
    })
  }, [show]);
  return (
    <>
      <Button className="profile-btn-modal" onClick={handleShow}>
        Modifica
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="mt-3">Nome</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder=""
                autoFocus
                name="username"
                value={userPayload.username}
                onChange={(e) => handleChange(e)}
              />
              <Form.Label className="mt-3">Email</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder=""
                name="email"
                value={userPayload.email}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="profile-btn-modal" onClick={handleClose}>
            Chiudi
          </Button>
          <Button className="profile-btn-modal" onClick={()=>{
            handleClose()
            handleSubmit(userPayload,user.accessToken,user.id)
            
          }}>
            Salva cambiamenti
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileModal;
