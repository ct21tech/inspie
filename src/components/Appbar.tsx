import React, { useState } from "react";
import { Layout, Badge, Avatar, Image } from "antd";
import { BellFilled, UserOutlined } from "@ant-design/icons";
import { useApp } from "./../context/index";

const { Header } = Layout;

export const Appbar = () => {
  const { antdThemeColor, currentUser } = useApp();
  const [bellHover, setBellHover] = useState(false);
  const [userHover, setUserHover] = useState(false);
  const styles = {
    button: {
      fontSize: "2rem",
      margin: ".4rem",
      color: "white",
      borderRadius: "50%",
      padding: ".7rem",
      cursor: "pointer",
    },
  };

  const mouseEnterHandler = (e: React.MouseEvent<HTMLElement>) => {
    const key = e.currentTarget.getAttribute("aria-label");
    if (key === "bell") setBellHover(true);
    else if (key === "user") setUserHover(true);
  };
  const mouseLeaveHandler = (e: React.MouseEvent<HTMLElement>) => {
    const key = e.currentTarget.getAttribute("aria-label");
    if (key === "bell") setBellHover(false);
    else if (key === "user") setUserHover(false);
  };
  return (
    <Header
      className="header"
      style={{
        textAlign: "right",
        backgroundColor: antdThemeColor.primary,
        padding: "0 1rem",
        transition: `background-color 300ms linear`,
        boxShadow:
          "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
      }}
    >
      <Badge count={5} offset={[-12, 8]}>
        <BellFilled
          style={{
            ...styles.button,
            backgroundColor: bellHover ? antdThemeColor[4] : "",
          }}
          key="bell"
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        />
      </Badge>
      {currentUser.avatar === "" ? (
        <UserOutlined
          style={{
            ...styles.button,
            backgroundColor: userHover ? antdThemeColor[4] : "",
          }}
          key="user"
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          onClick={() => {
            console.log(currentUser);
          }}
        />
      ) : (
        <Avatar
          size={28}
          style={{
            cursor: "pointer",
            marginLeft: ".4rem",
            marginRight: ".4rem",
            marginBottom: "1rem",
          }}
          src={currentUser.avatar}
        />
      )}
    </Header>
  );
};
