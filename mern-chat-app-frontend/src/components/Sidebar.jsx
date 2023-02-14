import React, { useContext, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import "./Sidebar.css";

const Sidebar = () => {
  const rooms = ["First", "Second", "Third"];
  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item
            key={idx}
            // onClick={() => joinRoom(room)}
            // active={room == currentRoom}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {room}{" "}
            {/*currentRoom !== room && (
              <span className="badge rounded-pill bg-primary">
                {user.newMessages[room]}
              </span>
            )*/}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
      {/*members.map((member) => (
        <ListGroup.Item
          key={member.id}
          style={{ cursor: "pointer" }}
          active={privateMemberMsg?._id == member?._id}
          onClick={() => handlePrivateMemberMsg(member)}
          disabled={member._id === user._id}
        >
          <Row>
            <Col xs={2} className="Member-status">
              <img src={member.picture} className="Member-status-img" />
              {member.status == "online" ? (
                <i className="fas fa-circle Sidebar-online-status"></i>
              ) : (
                <i className="fas fa-circle Sidebar-offline-status"></i>
              )}
            </Col>
            <Col xs={9}>
              {member.name}
              {member._id === user?._id && " (You)"}
              {member.status == "offline" && " (Offline)"}
            </Col>
            <Col xs={1}>
              <span className="badge rounded-pill bg-primary">
                {user.newMessages[orderIds(member._id, user._id)]}
              </span>
            </Col>
          </Row>
        </ListGroup.Item>
              ))*/}
    </>
  );
};

export default Sidebar;
