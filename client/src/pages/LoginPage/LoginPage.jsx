import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // Handle your login logic here
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
          <Input placeholder="Username" />
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
          <Input.Password placeholder="Password" />
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
