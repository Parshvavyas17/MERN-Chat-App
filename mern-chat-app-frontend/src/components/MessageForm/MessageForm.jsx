import "./MessageForm.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useState, useEffect, useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const messageEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      console.log("No message created!");
      return;
    }
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  };

  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return month + "/" + day + "/" + year;
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  // const handleMessageChange = (e) => {
  //   console.log(e.target.value, " ", message);
  //   setMessage(e.target.vlaue);
  // };

  return (
    <>
      <div className="Message-output">
        {user && !privateMemberMsg?._id && (
          <div className="alert alert-info">
            You are in the {currentRoom} room
          </div>
        )}
        {user && privateMemberMsg?._id && (
          <>
            <div className="alert alert-info Conversation-info">
              <div>
                Your conversation with {privateMemberMsg.name}{" "}
                {
                  <img
                    src={privateMemberMsg.picture}
                    className="Conversation-profile-pic"
                    alt="Member User"
                  />
                }
              </div>
            </div>
          </>
        )}
        {!user && <div className="alert alert-danger">Please login</div>}
        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="alert alert-info text-center Message-date-indicator">
                {date}
              </p>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgIdx) => (
                  <div
                    className={
                      sender?.email === user?.email
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
                          alt="Member User"
                        />
                        <p className="Message-sender">
                          {sender._id === user?._id ? "You" : sender.name}
                        </p>
                      </div>
                      <p className="Message-content">{content}</p>
                      <p className="Message-timestamp-left">{time}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        {<div ref={messageEndRef} />}
      </div>
      <Form>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Your message"
                disabled={!user}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", backgroundColor: "orange" }}
              disabled={!user}
              onClick={handleSubmit}
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
