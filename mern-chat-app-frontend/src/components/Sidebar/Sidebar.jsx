import { ListGroup, Row, Col } from "react-bootstrap";
import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { addNotifications, resetNotifications } from "../../redux/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const joinRoom = (room, isPublic = true) => {
    if (!user) {
      alert("Please Login!");
      navigate("/login");
    }

    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }

    dispatch(resetNotifications(room));
  };

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom !== room) dispatch(addNotifications(room));
  });

  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  };

  const handlePrivateMemberMsg = (member) => {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  };

  useEffect(() => {
    if (user) {
      setCurrentRoom("General");
      getRooms();
      socket.emit("join-room", "General");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  const getRooms = async () => {
    const res = await axios.get("http://localhost:5000/room");
    const response = res.data;
    setRooms(response);
  };

  if (!user) {
    return <></>;
  }

  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item
            key={idx}
            onClick={() => joinRoom(room)}
            active={room === currentRoom}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {room}{" "}
            {currentRoom !== room && (
              <span className="badge rounded-pill bg-primary">
                {user.newMessages[room]}
              </span>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
      {members.map((member) => (
        <ListGroup.Item
          key={member.id}
          style={{ cursor: "pointer" }}
          active={privateMemberMsg?._id === member?._id}
          onClick={() => handlePrivateMemberMsg(member)}
          disabled={member._id === user._id}
        >
          <Row>
            <Col xs={2} className="Member-status">
              <img
                src={member.picture}
                className="Member-status-img"
                alt="User DP"
              />
              {member.status === "online" ? (
                <i className="fas fa-circle Sidebar-online-status"></i>
              ) : (
                <i className="fas fa-circle Sidebar-offline-status"></i>
              )}
            </Col>
            <Col xs={9}>
              {member.name}
              {member._id === user?._id && " (You)"}
              {member.status === "offline" && " (Offline)"}
            </Col>
            <Col xs={1}>
              <span className="badge rounded-pill bg-primary">
                {user.newMessages[orderIds(member._id, user._id)]}
              </span>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </>
  );
};

export default Sidebar;
