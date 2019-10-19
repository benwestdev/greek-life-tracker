import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { withAuthorization, AuthUserContext } from "../Session";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import Loader from "../Loader";
import HeaderImage from "../HeaderImage";
import AttendanceCard from "../AttendanceCard";
import PointsCard from "../PointsCard";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button
} from "reactstrap";

const UserPoints = ({ firebase }) => (
  <AuthUserContext.Consumer>
    {authUser => <UserPointsList authUser={authUser} firebase={firebase} />}
  </AuthUserContext.Consumer>
);

const UserPointsList = ({ authUser, firebase }) => {
  const [loading, setLoading] = useState(false);
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    setLoading(true);
    firebase.AttendanceApi.getAttendanceByUser(authUser.uid).then(
      attendanceResults => {
        setAttendances(attendanceResults);
        setLoading(false);
      }
    );
  }, []);

  const userImage = authUser.picture
    ? authUser.picture
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaphpj5pqruSVEcscDz7Qq3zDEeE-TxVudp8yNf3lOWCBGUoGe";
  return (
    <>
      <HeaderImage authUser={authUser} />

      <Container className="mt--7" fluid>
        <Row>
          <Col
            className="order-xl-2 mb-5 mb-xl-0"
            xl="4"
            style={{ margin: "0 auto" }}
          >
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={userImage}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Link to={ROUTES.ACCOUNT}>
                    <Button className="mr-4" color="info" size="sm">
                      Edit Profile
                    </Button>
                  </Link>
                  <Link to={ROUTES.SUPPORT}>
                    <Button className="float-right" color="default" size="sm">
                      Need Help?
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <PointsCard attendances={attendances} />
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Attendance Records</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {loading && <Loader />}
                <Row>
                  {attendances.length > 0 &&
                    attendances.map(attendance => (
                      <AttendanceCard
                        attendance={attendance}
                        key={attendance.uid}
                      />
                    ))}
                </Row>
                {!loading && attendances.length === 0 && (
                  <Row
                    className="justify-content-center text-center"
                    style={{ margin: "0 auto" }}
                  >
                    <Col lg="5" md="6">
                      <h1>No Events!</h1>
                      <p className="text-lead ">
                        Looks like you haven't attended anything
                      </p>
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const condition = authUser => authUser && !!authUser.roles[ROLES.STUDENT];
export default compose(
  withAuthorization(condition),
  withFirebase
)(UserPoints);
