import { Form, Input, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import userService from "../../../utils/userService";

import styles from "../AuthPage.module.css";

export default function RegisterPage({ onSignupOrLogin }) {
  const navigate = useNavigate();

  const [formObj, setFormObj] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    try {
      await userService.signup(formObj);
    } catch (err) {
      alert(err.message);
      // console.log(err);
    }
    onSignupOrLogin();
  };

  return (
    <div className={styles.AuthPage}>
      <Button
        onClick={() => navigate("/")}
        style={{ position: "absolute", top: "10px", left: "10px" }}
        type="link"
      >
        <ArrowLeftOutlined /> Back to Welcome
      </Button>
      <Form
        name="register_form"
        className={styles.authForm}
        onFinish={onFinish}
      >
        <h2>Register for ReactChatBot</h2>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            className={styles.Input}
            type="email"
            placeholder="Email"
            bordered={false}
            value={formObj.email}
            onChange={(e) =>
              setFormObj({
                ...formObj,
                email: e.target.value,
              })
            }
          />
        </Form.Item>
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
            className={styles.Input}
            type="text"
            placeholder="Username"
            bordered={false}
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
          <Input
            className={styles.Input}
            type="password"
            placeholder="Password"
            bordered={false}
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
          <Input
            className={styles.Input}
            type="password"
            placeholder="Confirm Password"
            bordered={false}
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
