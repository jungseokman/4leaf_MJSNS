import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { LOGIN_REQUEST } from "../reducers/user";

const Login = () => {
  const dispatch = useDispatch();

  const loginFinish = (data) => {
    console.log(data);

    dispatch({
      type: LOGIN_REQUEST,
      data: {
        userId: data.userId,
        password: data.password,
      },
    });
  };

  return (
    <div style={{ padding: "100px" }}>
      <Form
        onFinish={loginFinish}
        wrapperCol={{ span: 20 }}
        labelCol={{ span: 4 }}
      >
        <Form.Item label="아이다" name="userId">
          <Input />
        </Form.Item>

        <Form.Item label="비밀번호" name="password">
          <Input type="password" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          제출하기
        </Button>
      </Form>
    </div>
  );
};

export default Login;
