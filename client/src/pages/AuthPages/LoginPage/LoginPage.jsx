import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../AuthPage.module.css"; // We only need to import the combined styles now.

export default function LoginPage({ onSignupOrLogin }) {
  const [formObj, setFormObj] = useState({
    username: "",
    password: "",
  });

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // add signup/login logic here
    onSignupOrLogin();
  };

  return (
    <div className={styles.AuthPage}>
      {" "}
      {/* Updated to AuthPage */}
      <Form name="login_form" className={styles.authForm} onFinish={onFinish}>
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
              e // Fixed the missing parameter
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
            className={styles.authFormButton}
          >
            Log in
          </Button>
        </Form.Item>
        <div className={styles.switchLink}>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </Form>
    </div>
  );
}
