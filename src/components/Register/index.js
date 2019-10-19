import React from "react";
import { Card, CardHeader, CardBody, Col } from "reactstrap";

import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import CircleBanner from "../CircleBanner";
import FacebookLogo from "../../assets/facebook.png";
import GoogleLogo from "../../assets/google.svg";
import LoginLinks from "../LoginLinks";
import SocialLoginButton from "../SocialLoginButton";
import RegisterForm from "../RegisterForm";

const RegisterBase = ({ firebase, history }) => {
  const socialLoginHandler = type => {
    if (type.toLowerCase() === "google") {
      firebase.AuthApi.doSignInWithGoogle().then(authUser => {
        console.log("inc created user");
        console.log({ authUser });
        if (authUser.additionalUserInfo.isNewUser) {
          console.log("new user");
          const username = authUser.additionalUserInfo.profile.name;
          const email = authUser.additionalUserInfo.profile.email;
          const picture = authUser.additionalUserInfo.profile.picture;
          const roles = {};

          roles[ROLES.STUDENT] = ROLES.STUDENT;

          firebase.firestore
            .collection("users")
            .doc(authUser.user.uid)
            .set({
              username,
              email,
              picture,
              roles
            })
            .then(response => {
              console.log({ response });
              history.push(ROUTES.HOME);
            });
        }
      });
    } else if (type.toLowerCase() === "facebook") {
      firebase.AuthApi.doSignInWithFacebook().then(() => {
        history.push(ROUTES.HOME);
      });
    } else {
      console.log("unknown social login");
    }
  };

  return (
    <section className="section section-shaped section-lg">
      <CircleBanner color="default" />

      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Register with social login</small>
            </div>
            <div className="btn-wrapper text-center">
              <SocialLoginButton
                clickHandler={socialLoginHandler}
                imageSrc={FacebookLogo}
                name="Facebook"
              />
              <SocialLoginButton
                clickHandler={socialLoginHandler}
                imageSrc={GoogleLogo}
                name="Google"
              />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or register with email and password</small>
            </div>
            <RegisterForm firebase={firebase} history={history} />
          </CardBody>
        </Card>
        <LoginLinks text={"Already have an account?"} route={ROUTES.SIGN_IN} />
      </Col>
    </section>
  );
};

const Register = compose(
  withRouter,
  withFirebase
)(RegisterBase);

export default Register;
