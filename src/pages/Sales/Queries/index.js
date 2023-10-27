import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'

export default function QueriesComp() {
  return (
    <React.StrictMode>
      <div className="page-content">
        <Container fluid>

          <div className="main_column_box_wrap">
            <Row>
              <Col md={4} xl={4}>
                <div className="column_box">
                <h2>Quotation Won</h2>
                <Card>
                  <CardBody>
                    <h4 className="card-title">userId: <b>123456DA</b></h4>
                    
                    <div className="btn_wrap d-flex">
                      <Link to="#" className="btn btn-primary waves-effect waves-light">View</Link>
                    <Link to="#" className="btn btn-primary waves-effect waves-light">Edit</Link>
                    </div>
                  </CardBody>
                </Card>
                </div>

              </Col>

              <Col md={4} xl={4}>
              <div className="column_box">
              <h2>Quotation Lost</h2>
                <Card>
                  <CardBody>
                    <h4 className="card-title">userId: <b>123456DA</b></h4>
                    
                    <div className="btn_wrap d-flex">
                      <Link to="#" className="btn btn-primary waves-effect waves-light">View</Link>
                    <Link to="#" className="btn btn-primary waves-effect waves-light">Edit</Link>
                    </div>
                  </CardBody>
                </Card>
                </div>

              </Col>

              <Col md={4} xl={4}>

              <div className="column_box">
              <h2>Quotation In Progress</h2>
                <Card>
                  <CardBody>
                    <h4 className="card-title">userId: <b>123456DA</b></h4>
                    
                    <div className="btn_wrap d-flex">
                      <Link to="#" className="btn btn-primary waves-effect waves-light">View</Link>
                    <Link to="#" className="btn btn-primary waves-effect waves-light">Edit</Link>
                    </div>
                  </CardBody>
                </Card>
                </div>

              </Col>
            </Row>
          </div>

        </Container>
      </div>
    </React.StrictMode>
  )
}
