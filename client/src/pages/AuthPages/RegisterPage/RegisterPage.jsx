import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../AuthPage.module.css";

export default function RegisterPage({ onSignupOrLogin }) {
  const [formObj, setFormObj] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // add registration logic here
    onSignupOrLogin();
  };

  return (
    <div className={styles.AuthPage}>
      {" "}
      <Form
        name="register_form"
        className={styles.authForm}
        onFinish={onFinish}
      >
        <h2>Register for ChatGPT Clone</h2>
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
            onChange={(e) =>
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
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your Password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm Password"
            value={formObj.confirmPassword}
            onChange={(e) =>
              setFormObj({
                ...formObj,
                confirmPassword: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="ghost"
            className={styles.authFormButton} // Updated className to authFormButton
          >
            Register
          </Button>
        </Form.Item>
        <div className={styles.switchLink}>
          {" "}
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Form>
    </div>
  );
}
