import { Form, Input, Button, Card, Divider } from "antd";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
// import TwitterLogin from "react-twitter-login";
import TwitterLogin from "react-twitter-auth/lib/react-twitter-auth-component.js";

import {
  GoogleOutlined,
  FacebookFilled,
  WechatOutlined,
  TwitterOutlined,
  LockOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import { LoginIconColor, useApp, User } from "./../context";
import { PieWechatLogin } from "./PieWechatLogin";
import { useState } from "react";

export const PieLogin = (props: { style?: {} }) => {
  const {
    loginIconColor,
    loginButtonLarge,
    antdThemeColor,
    setCurrentUser,
    setLoginDrawerVisible,
  } = useApp();

  const [wechatLogin, setWechatLogin] = useState(false);

  const styles = {
    button: {
      width: loginButtonLarge ? "100%" : "6.4rem",
      backgroundColor: antdThemeColor.primary,
      borderColor: antdThemeColor.primary,
      transition: `background-color .3s linear, border-color .3s, width .5s`,
    },
  };
  const loginGoogleRes = (res: any) => {
    const profile = res.getBasicProfile();
    setLoginDrawerVisible(false);
    setCurrentUser({ avatar: profile.getImageUrl(), name: profile.getName() });
    // console.log(res.getAuthResponse());
  };

  const loginFacebookRes = (res: any) => {
    // console.log(res);
    setLoginDrawerVisible(false);
    setCurrentUser({ avatar: res.picture.data.url, name: res.name });
  };

  const loginTwitterRes = (res: Response) => {
    setLoginDrawerVisible(false);
    res.json().then((user: User) => setCurrentUser(user));
  };

  const loginWechatRes = (res: string) => {
    try {
      const user = JSON.parse(res);
      setLoginDrawerVisible(false);
      setCurrentUser({ avatar: user.avatar, name: user.name });
    } catch (e) {
      console.log(res);
    }
  };

  return (
    <ShadowCard style={{ ...props.style }}>
      <LockOutlined
        style={{ color: "grey", fontSize: "2.5rem", margin: "auto" }}
      />
      <Title>
        {wechatLogin ? (
          <LeftOutlined
            onClick={() => setWechatLogin(!wechatLogin)}
            style={{
              position: "absolute",
              top: "20rem",
              left: "8.5rem",
              fontSize: "3rem",
              cursor: "pointer",
            }}
          />
        ) : (
          ""
        )}

        {wechatLogin ? "微信登录" : "请登录"}
      </Title>
      {wechatLogin ? (
        <PieWechatLogin
          appid="wx769f8185794d03c3"
          redirect_uri="https://new.philipwu.me/aaa.php"
          href="https://new.philipwu.me/wechatlogin.css"
          onSuccess={loginWechatRes}
        />
      ) : (
        <Form style={{ paddingTop: "3.6rem" }}>
          <Form.Item
            name={"username"}
            // rules={[{ required: true, message: "请输入电子邮件" }]}
          >
            <Input placeholder={"电子邮件"} type="text" id={"username"} />
          </Form.Item>
          <Form.Item
            name={"password"}
            // rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input placeholder={"密码"} type="password" id={"password"} />
          </Form.Item>
          <Form.Item>
            <Button style={styles.button} htmlType={"submit"} type={"primary"}>
              登录
            </Button>
          </Form.Item>
        </Form>
      )}
      {wechatLogin ? (
        <Divider style={{ marginTop: "0px" }} />
      ) : (
        <Divider style={{ marginTop: "0px" }} />
      )}
      其他方式登录
      <div>
        <LoginIcon>
          <GoogleLogin
            clientId="193318467800-8d242pmio7isot49bof7ljt6d74md6m2.apps.googleusercontent.com"
            render={(renderProps) => (
              <GoogleOutlined
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{
                  transition: `color .3s`,
                  color:
                    loginIconColor === LoginIconColor.color
                      ? "#ea4335"
                      : loginIconColor === LoginIconColor.theme
                      ? antdThemeColor.primary
                      : "",
                }}
              />
            )}
            buttonText="Login"
            onSuccess={loginGoogleRes}
            onFailure={loginGoogleRes}
            cookiePolicy={"single_host_origin"}
          />
        </LoginIcon>
        <LoginIcon>
          <FacebookLogin
            appId="283254950158038"
            fields="name,email,picture"
            callback={loginFacebookRes}
            render={(renderProps) => (
              <FacebookFilled
                onClick={renderProps.onClick}
                style={{
                  transition: `color .3s`,
                  color:
                    loginIconColor === LoginIconColor.color
                      ? "#3a559f"
                      : loginIconColor === LoginIconColor.theme
                      ? antdThemeColor.primary
                      : "",
                }}
              />
            )}
          />
        </LoginIcon>
        <LoginIcon>
          <TwitterLogin
            style={{
              backgroundColor: "inherit",
              border: "none",
              cursor: "pointer",
            }}
            loginUrl="https://new.philipwu.me/ccc.php"
            // loginUrl="http://localhost:4000/api/v1/auth/twitter"
            onFailure={loginTwitterRes}
            onSuccess={loginTwitterRes}
            requestTokenUrl="https://new.philipwu.me/bbb.php"
            // requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
            showIcon={true}
          >
            <TwitterOutlined
              style={{
                transition: `color .3s`,
                color:
                  loginIconColor === LoginIconColor.color
                    ? "#50abf1"
                    : loginIconColor === LoginIconColor.theme
                    ? antdThemeColor.primary
                    : "",
              }}
            />
          </TwitterLogin>
        </LoginIcon>
        <LoginIcon onClick={() => setWechatLogin(!wechatLogin)}>
          <WechatOutlined
            style={{
              transition: `color .3s`,
              color:
                loginIconColor === LoginIconColor.color
                  ? "#1bd741"
                  : loginIconColor === LoginIconColor.theme
                  ? antdThemeColor.primary
                  : "",
            }}
          />
        </LoginIcon>
      </div>
      <Copyright></Copyright>
    </ShadowCard>
  );
};

function Copyright() {
  return (
    <StyledCopyright>
      {"Copyright © "}
      <a style={{ color: "grey" }} href="https://ct21.com.au">
        Century21
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </StyledCopyright>
  );
}

const StyledCopyright = styled.div`
  color: grey;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2rem;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  height: 50rem;
  margin: 1rem;
  padding: 3.2rem 4rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
  vertical-align: top;
`;

const Title = styled.h2`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: rgb(94, 108, 132);
`;

const LoginIcon = styled.span`
  font-size: 2.5rem;
  margin: 0 0.4rem;
  cursor: pointer;
`;
