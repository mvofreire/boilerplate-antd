import React, { PureComponent } from "react";
import { Row, Col, Form, Icon, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { doLogin } from "services/login";

class Login extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.requestAuthentication(values);
      }
    });
  };

  requestAuthentication = async credentials => {
    const { setUserSession, history, session } = this.props;
    try {
      const data = await doLogin(credentials);
      setUserSession(data);

      console.log(session);
      history.push("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="space-around" align="middle">
        <Col span={8}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "Por favor, insira um email valido"
                  },
                  { required: true, message: "Por favor, insira um usuario" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="E-mail"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "POr favor! insira uma senha." }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <Link to="/register">cadastre-se!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);

export default WrappedNormalLoginForm;
