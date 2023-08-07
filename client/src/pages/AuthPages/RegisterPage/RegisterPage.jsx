import { Form, Input, Button, Upload, message } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import userService from "../../../utils/userService";

import styles from "../AuthPage.module.css";

export default function RegisterPage({ onSignupOrLogin }) {
  const navigate = useNavigate();

  const [fileList, setFileList] = useState([]);
  const [allowFileUpload, setAllowFileUpload] = useState(false);

  const onFileChange = (info) => {
    console.log(info);
    if (!allowFileUpload) {
      return;
    }
    if (info.file.status === "removed") {
      // file removed
      setFileList([]);
      message.success(`${info.file.name} file removed successfully.`);
      return;
    }

    console.log(info.file);

    // generate preview for antd upload list
    if (info.file && info.file instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(info.file);
      reader.onload = (e) => {
        const updatedFile = {
          uid: info.file.uid,
          status: info.file.status,
          name: info.file.name,
          size: info.file.size,
          type: info.file.type,
          thumbUrl: e.target.result,
        };
        setFileList([updatedFile]);
      };
    } else {
      setFileList([info.file]);
    }

    message.success(`${info.file.name} file uploaded successfully.`);
  };

  const beforeUpload = (file) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedFileTypes.includes(file.type)) {
      message.error(`${file.name} must be a JPG, JPEG, or PNG file.`);
      setAllowFileUpload(false);
      return false;
    }

    if (file.size > maxSize) {
      message.error(`${file.name} must be smaller than 5MB.`);
      setAllowFileUpload(false);
      return false;
    }

    setAllowFileUpload(true);
    return false; // still return false cos we're handling file upload ourselves
  };

  const [formObj, setFormObj] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    // if no file then use the default icon
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
        <ArrowLeftOutlined /> Back
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
          <Upload
            listType="picture"
            showUploadList={true}
            maxCount={1}
            beforeUpload={beforeUpload} // Stop automatic upload
            onChange={onFileChange}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Upload User Icon</Button>
          </Upload>
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
