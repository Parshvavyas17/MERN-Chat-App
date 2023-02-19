import "./Chat.css";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./../../components/Sidebar/Sidebar";
import MessageForm from "../../components/MessageForm/MessageForm";

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
