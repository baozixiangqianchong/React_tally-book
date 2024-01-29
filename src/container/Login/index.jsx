import React, { useState, useCallback } from "react";
import { Input, Button, Checkbox, Toast } from "zarm";
import { Cell } from "react-vant";
import CustomIcon from "@/components/CustomIcon";
import Captcha from "react18-verify-code";
import s from "./style.module.less";
import { post } from "@/utils";
import cx from "classnames";
import { Outlet, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState(""); // 账号
  const [password, setPassword] = useState(""); // 密码
  const [verify, setVerify] = useState(""); // 验证码

  const [type, setType] = useState("login"); // 登录注册类型

  const [captcha, setCaptcha] = useState(""); // 验证码变化后存储值

  const navigate = useNavigate(); //路由跳转

  //  验证码变化，回调方法
  const handleChange = useCallback((captcha) => {
    setCaptcha(captcha);
  }, []);
  //点击事件
  const onSubmit = async () => {
    if (!username) {
      Toast.show("请输入账号");
      return;
    }
    if (!password) {
      Toast.show("请输入密码");
      return;
    }
    try {
      // 判断是否是登录状态
      if (type == "login") {
        // 执行登录接口，获取 token
        const { data } = await post("/api/user/login", {
          username,
          password,
        });
        // 将 token 写入 localStorage
        localStorage.setItem("token", data.token);
        Toast.show("登录成功");
        // 跳转到主页
        navigate("/");
      } else {
        if (!verify) {
          Toast.show("请输入验证码");
          return;
        }
        if (verify != captcha) {
          Toast.show("验证码错误");
          return;
        }
        const { data } = await post("/api/user/register", {
          username,
          password,
        });
        Toast.show("注册成功");
        // 注册成功，自动将 tab 切换到 login 状态
        setType("login");
      }
    } catch (error) {
      Toast.show("系统错误");
    }
  };
  return (
    <div className={s.auth}>
      <div className={s.kpur}></div>
      <div className={s.tab}>
        <span
          className={cx({ [s.avtive]: type == "login" })}
          onClick={() => setType("login")}
        >
          登录
        </span>
        <span
          className={cx({ [s.avtive]: type == "register" })}
          onClick={() => setType("register")}
        >
          注册
        </span>
      </div>
      <div className={s.form}>
        <Cell icon={<CustomIcon type="zhanghao" />} className={s.cell}>
          <Input
            clearable
            type="text"
            placeholder="请输入账号"
            onChange={(value) => setUsername(value.target.value)}
          />
        </Cell>
        <Cell icon={<CustomIcon type="mima" />} className={s.cell}>
          <Input
            clearable
            type="password"
            placeholder="请输入密码"
            onChange={(value) => setPassword(value.target.value)}
          />
        </Cell>

        {type == "register" ? (
          <Cell icon={<CustomIcon type="mima" />} className={s.cell}>
            <div className={s.content}>
              <Input
                clearable
                type="text"
                placeholder="请输入验证码"
                onChange={(value) => setVerify(value.target.value)}
              />
              <Captcha charNum={4} onChange={handleChange} />
            </div>
            {/* <Captcha ref={captchaRef} charNum={4} onChange={handleChange} /> */}
          </Cell>
        ) : null}
      </div>
      <div className={s.operation}>
        {type == "register" ? (
          <div className={s.agree}>
            <Checkbox />
            <label className={s.text}>
              阅读并同意<a>《掘掘手札条款》</a>
            </label>
          </div>
        ) : null}
        <Button onClick={onSubmit} block theme="primary">
          {type == "login" ? "登录" : "注册"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
