import "./MessageForm.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

const MessageForm = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.vlaue);
  };

  return (
    <>
      <div className="messages-output">
        {
          /* user && !privateMemberMsg?._id && */ <div className="alert alert-info">
            You are in the {/* currentRoom */} room
          </div>
        }
        {
          /* user && privateMemberMsg?._id && */ <>
            <div className="alert alert-info Conversation-info">
              <div>
                Your conversation with {/* privateMemberMsg.name */}{" "}
                {/* <img
                  src={privateMemberMsg.picture}
                  className="Conversation-profile-pic"
                /> */}
              </div>
            </div>
          </>
        }
        {/* !user && */
        /*<div className="alert alert-danger">Please login</div> */}
        {/* user && */
        /*messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="alert alert-info text-center Message-date-indicator">
                {date}
              </p>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgIdx) => (
                  <div
                    className={
                      sender?.email == user?.email
                        ? "Message"
                        : "Incoming-message"
                    }
                    key={msgIdx}
                  >
                    <div className="Message-inner">
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src={sender.picture}
                          style={{
                            width: 35,
                            height: 35,
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginRight: 10,
                          }}
                        />
                        <p className="Message-sender">
                          {sender._id == user?._id ? "You" : sender.name}
                        </p>
                      </div>
                      <p className="Message-content">{content}</p>
                      <p className="Message-timestamp-left">{time}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))
        */}
        {/* <div ref={messageEndRef} /> */}
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Your message"
                // disabled={!user}
                value={message}
                onChange={handleMessageChange}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", backgroundColor: "orange" }}
              // disabled={!user}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessageForm;
