import React from "react";
import { compose } from "recompose";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { withAuthorization } from "../Session";
import CircleBanner from "../CircleBanner";
import ChangePasswordForm from "../ChangePasswordForm";
import PageHeader from "../PageHeader";

const ProfileBase = ({ firebase }) => {
  const pageHeaderText = "Having a problem? Let us know!";
  return (
    <section className="section section-shaped section-lg">
      <CircleBanner color="success" />
      <PageHeader title="Support" text={pageHeaderText} />

      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-2">
            <div className="text-muted text-center mt-1 mb-1">
              <small>Submit a problem or a feature request</small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <p>
              If you have any questions, concerns or issues please contact us at
              support@greekwise.com
            </p>
          </CardBody>
        </Card>
      </Col>
    </section>
  );
};

const condition = authUser => !!authUser;
const Profile = compose(withAuthorization(condition))(ProfileBase);
export default Profile;
