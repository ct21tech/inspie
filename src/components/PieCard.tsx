import { Card, Avatar, Carousel } from "antd";
import Icon from "@ant-design/icons";
import styled from "@emotion/styled";
import { ReactNode, useState, MouseEvent } from "react";
import { ReactComponent as ShareIcon } from "../../assets/share.svg";
import { ReactComponent as LikeIcon } from "../../assets/like.svg";
import { ReactComponent as MuteIcon } from "../../assets/mute.svg";
import { ReactComponent as SoundIcon } from "../../assets/sound.svg";

export const PieCard = (props: {
  src: string;
  type?: string;
  pics?: Array<string>;
}) => {
  const [mute, setMute] = useState(true);
  const [muteHover, setHover] = useState(false);
  const [cardHover, setCardHover] = useState(false);

  const muteHandler = () => {
    setMute(!mute);
  };
  const toggleMuteHover = () => {
    setHover(!muteHover);
  };
  const toggleCardHover = (evt: MouseEvent<HTMLDivElement>): void => {
    if (evt.type === "mouseenter") setCardHover(true);
    else if (evt.type === "mouseleave") setCardHover(false);
  };

  const StyledIcon = {
    color: "#444444",
    padding: ".8rem",
    borderRadius: "50%",
    backgroundColor: muteHover ? "rgb(200,200,200 0.7 )" : "",
  };

  const src = props.src ? props.src : "";
  const type = props.type ? props.type : "img";
  const pics = props.pics ? props.pics : [];
  let card: ReactNode = null;
  switch (type) {
    case "img":
      card = <img alt="" style={{ width: "100%" }} src={src} />;
      break;
    case "video":
      card = (
        <div onMouseEnter={toggleCardHover} onMouseLeave={toggleCardHover}>
          <video
            style={{ width: "100%", maxHeight: "514" }}
            autoPlay={true}
            src={props.src}
            muted={mute}
            loop={true}
          ></video>
          <SoundControl
            // style={cardHover ? { display: "" } : { display: "none" }}
            onClick={muteHandler}
            onMouseEnter={toggleMuteHover}
            onMouseLeave={toggleMuteHover}
          >
            {mute ? (
              <Icon style={StyledIcon} component={MuteIcon} />
            ) : (
              <Icon
                style={
                  cardHover ? StyledIcon : { display: "none", ...StyledIcon }
                }
                component={SoundIcon}
              />
            )}
          </SoundControl>
        </div>
      );
      break;
    case "album":
      card = (
        <Carousel autoplay effect="fade">
          {pics.map((p, i) => (
            <img key={i} alt="" style={{ width: "100%" }} src={p} />
          ))}
        </Carousel>
      );
      break;
    default:
      break;
  }

  return (
    <MyCard hoverable style={{ width: "24rem" }} bodyStyle={{ padding: 0 }}>
      {card}
      <CardMeta></CardMeta>
    </MyCard>
  );
};

const CardMeta = () => {
  const [username] = useState("John Joe");
  const [liked, setLiked] = useState(false);
  const likedHandler = () => {
    setLiked(!liked);
  };
  return (
    <MyUser>
      <Avatar
        style={{ margin: "auto", display: "inline-block" }}
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
      {username}

      <Liked onClick={likedHandler}>
        <Icon
          style={liked ? { color: "#ea4335" } : { color: "#000" }}
          component={LikeIcon}
        />
        {/* {liked ? (
          <HeartFilled />
        ) : (
          <HeartOutlined />
        )} */}
      </Liked>
      <Share>
        <Icon style={{ color: "#000" }} component={ShareIcon} />
      </Share>
    </MyUser>
  );
};

const Liked = styled(`div`)`
  display: inline;
  float: right;
  font-size: 2.3rem;
  /* color: "#666666	"; */
  color: "#000";
`;

const Share = styled(`div`)`
  display: inline;
  float: right;
  margin-right: 0.7rem;
  font-size: 2.3rem;
  /* color: "#666666"; */
  color: "#000";
`;

const MyCard = styled(Card)`
  margin: 1rem;
  display: inline-block;
  height: auto;
  padding: 0;
`;

const MyUser = styled(`div`)`
  font-weight: 500;
  margin: 1rem;
`;

const SoundControl = styled(`div`)`
  position: absolute;
  left: 1rem;
  bottom: 6.5rem;
  font-size: 3rem;
  z-index: 999;
`;
