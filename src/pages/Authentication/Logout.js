import PropTypes from "prop-types"
import React, { useEffect } from "react"

import { logoutUser } from "../../store/actions"

//redux
import { useDispatch } from "react-redux"
import { Col, Container, Row } from "reactstrap"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/images/logo-sm.png";
import CarouselPage from '../../pages/AuthenticationInner/CarouselPage'



const Logout = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutUser(props.history))
  }, [dispatch, props.history])

  return (
    <React.Fragment>
      <div className="container-fluid p-0 login_auth_wrap ">
        <Container fluid>
          <Row className="row g-0">
            <Col xxl={3} lg={4} md={5}>
              <div className="auth-full-page-content d-flex">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5 text-center">
                      <Link to="index.html" className="d-block auth-logo">
                        <img src={logo} alt="" height="64" />
                      </Link>
                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <div className="avatar-xl mx-auto">
                          <div className="avatar-title bg-light-subtle text-primary h1 rounded-circle">
                            <i className="bx bxs-user"></i>
                          </div>
                        </div>

                        <div className="mt-4 pt-2">
                          <h5>You are Logged Out</h5>
                          <p className="text-muted font-size-15">Thank you for using <span className="fw-semibold text-primary">Tarifftales</span></p>
                          <div className="mt-4">
                            {/* <button className="btn btn-primary w-100 waves-effect waves-light">Sign In</button> */}
                            <Link to="/" className="btn btn-primary w-100 waves-effect waves-light">Sign In</Link>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 text-center">
                        <p className="text-muted mb-0">Don't have an account ? <Link to="/register"
                          className="text-primary fw-semibold"> Signup</Link> </p>
                      </div>
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">© 2022-2023 Tarifftales All rights reserved.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <CarouselPage />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Logout.propTypes = {
  history: PropTypes.object,
}

export default Logout
