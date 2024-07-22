import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import TableKaryawan from "../components/EmployeeTable/Table";

const MainPage = () => {
  return (
    <Container fluid className="">
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <h1 className="text-center">Data Employees</h1>
        </Col>
      </Row>
	  <TableKaryawan />
    </Container>
  );
};

export default MainPage;
