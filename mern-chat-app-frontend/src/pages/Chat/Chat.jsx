import "./Chat.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "./../../components/Sidebar";
import MessageForm from "../../components/MessageForm";

const Chat = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={8}>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
