import React from "react";
import { Card, CardHeader, CardBody, Col, Container } from "reactstrap";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import CircleBanner from "../CircleBanner";
import FacebookLogo from "../../assets/facebook.png";
import GoogleLogo from "../../assets/google.svg";
import LoginLinks from "../LoginLinks";
import LoginForm from "../LoginForm";
import SocialLoginButton from "../SocialLoginButton";
import "./style.css";

const LoginBase = ({ firebase, history }) => {
  const socialLoginHandler = type => {
    if (type.toLowerCase() === "google") {
      firebase.AuthApi.doSignInWithGoogle().then(() => {
        history.push(ROUTES.HOME);
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

      <Container fluid>
        <div className="header-body">
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Sign in with</small>
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
                  <small>Or sign in with credentials</small>
                </div>
                <LoginForm firebase={firebase} history={history} />
              </CardBody>
            </Card>
            <LoginLinks text="Don't have an account?" route={ROUTES.SIGN_UP} />
          </Col>
        </div>
      </Container>
    </section>
  );
};

const Login = compose(
  withRouter,
  withFirebase
)(LoginBase);
export default Login;
