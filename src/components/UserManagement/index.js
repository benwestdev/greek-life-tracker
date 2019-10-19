import React, { useState, useEffect } from "react";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import * as ROLES from "../../constants/roles";
import { withAuthorization } from "../Session";
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Table,
  UncontrolledAlert
} from "reactstrap";
import CircleBanner from "../CircleBanner";
import PageHeader from "../PageHeader";
import Loader from "../Loader";

const UserManagement = ({ firebase }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase.UserApi.getUsers().then(usersResult => {
      console.log("getting users: ", users);
      setUsers(usersResult);
      setLoading(false);
    });
  }, []);

  const editHandler = (user, role, newValue) => {
    if (newValue) {
      user.roles[role] = role;
    } else {
      delete user.roles[role];
    }
    firebase.UserApi.editUser(user.uid, user).then(response => {
      setSuccessMessage("User updated successfully");
    });
  };
  const pageHeaderText =
    "Use this page to manage users and give them the proper access within the app";
  return (
    <section className="section section-shaped section-lg">
      <CircleBanner color="success" />
      {successMessage && (
        <UncontrolledAlert color="success">{successMessage}</UncontrolledAlert>
      )}

      <PageHeader title="Manage Users" text={pageHeaderText} />

      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-2">
            <div className="text-muted text-center mt-1 mb-1">
              <h3>All Users</h3>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {loading && <Loader active inline="centered" color="primary" />}

            {users && users.length > 0 && (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Email</th>
                    <th scope="col">Faculty? </th>
                    <th scope="col">Student?</th>
                    <th scope="col">Admin?</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <UserRow
                      user={user}
                      firebase={firebase}
                      editHandler={editHandler}
                      key={user.uid}
                    />
                  ))}
                </tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </Col>
    </section>
  );
};

const UserRow = ({ user, firebase, editHandler }) => {
  if (user.email === "benjaminwest.co@gmail.com") console.log({ user });

  const [isViewer, setIsViewer] = useState(
    user.roles.hasOwnProperty([ROLES.VIEWER])
  );
  const [isStudent, setIsStudent] = useState(
    user.roles.hasOwnProperty([ROLES.STUDENT])
  );
  const [isAdmin, setIsAdmin] = useState(
    user.roles.hasOwnProperty([ROLES.ADMIN])
  );

  const changeHandler = type => {
    // console.log({ user });
    if (type === "VIEWER") {
      const newValue = !isViewer;
      setIsViewer(newValue);
      editHandler(user, type, newValue);
    }
  };

  return (
    <tr key={user.uid}>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
        <div className="custom-control custom-control-alternative custom-checkbox">
          <input
            className="custom-control-input"
            id={user.uid + "-viewer"}
            type="checkbox"
            checked={isViewer}
            onChange={e => changeHandler("VIEWER")}
          />

          <label
            className="custom-control-label"
            htmlFor={user.uid + "-viewer"}
          ></label>
        </div>
      </td>
      <td>
        <div className="custom-control custom-control-alternative custom-checkbox">
          <input
            className="custom-control-input"
            id={user.uid + "-student"}
            type="checkbox"
            checked={user.hasStudent}
            onChange={() => changeHandler("STUDENT", user)}
          />

          <label
            className="custom-control-label"
            htmlFor={user.uid + "-student"}
          ></label>
        </div>
      </td>
      <td>
        <div className="custom-control custom-control-alternative custom-checkbox">
          <input
            className="custom-control-input"
            id={user.uid + "-admin"}
            type="checkbox"
            checked={user.hasAdmin}
            onChange={() => changeHandler("ADMIN", user)}
          />

          <label
            className="custom-control-label"
            htmlFor={user.uid + "-admin"}
          ></label>
        </div>
      </td>
    </tr>
  );
};

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase
)(UserManagement);
