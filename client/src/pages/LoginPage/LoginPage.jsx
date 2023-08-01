import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./LoginPage.module.css";

export default function LoginPage({ onSignupOrLogin }) {
  const [formObj, setFormObj] = useState({
    username: "",
    password: "",
  });

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    onSignupOrLogin();
  };

  return (
    <div className={styles.LoginPage}>
      <Form name="login_form" className={styles.loginForm} onFinish={onFinish}>
        <h2>Login to ChatGPT Clone</h2>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            placeholder="Username"
            value={formObj.username}
            onChange={(
              e // You missed the event parameter here.
            ) =>
              setFormObj({
                ...formObj,
                username: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            value={formObj.password}
            onChange={(e) =>
              setFormObj({
                ...formObj,
                password: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="ghost"
            className={styles.loginFormButton}
          >
            Log in
          </Button>
        </Form.Item>
        <div className={styles.registerLink}>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </Form>
    </div>
  );
}
