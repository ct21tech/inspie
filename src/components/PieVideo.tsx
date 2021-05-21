import { Card } from "antd";
import Icon, { PauseCircleOutlined, RedoOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useState, MouseEvent } from "react";
import { ReactComponent as MuteIcon } from "../assets/mute.svg";
import { ReactComponent as SoundIcon } from "../assets/sound.svg";
import { PieCardMeta } from "./PieCardMeta";
import { useApp, VideoProp } from "./../context/index";
import { makeRadomId } from "../util";

export const PieVideo = (props: {
  video: VideoProp;
  type?: string;
  pics?: Array<string>;
}) => {
  const [loading, setLoading] = useState(true);
  // const [mute, setMute] = useState(true);
  const [muteHover, setHover] = useState(false);
  const [cardHover, setCardHover] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);

  const { videoLoop, playingSound, setPlayingSound } = useApp();
  const [liked, setLiked] = useState(false);
  const likedHandler = () => {
    setLiked(!liked);
  };

  const [shareButton] = useState<Element | null>(null);
  const shareHandler = (evt: React.MouseEvent<Element>) => {};

  const videoId = "v_" + makeRadomId(8);

  const videoClickHandler = () => {
    const el = document.getElementById(videoId) as HTMLVideoElement;
    if (ended) return;
    setEnded(false);
    if (paused) el.play();
    else el.pause();
    setPaused(!paused);
  };

  const videoEndHandler = () => {
    setEnded(true);
    setPaused(false);
  };

  const redoClickHandler = () => {
    setEnded(false);
    setPaused(false);
    const el = document.getElementById(videoId) as HTMLVideoElement;
    el?.play();
  };

  const muteHandler = () => {
    setPlayingSound(playingSound === props.video.name ? "" : props.video.name);
    console.log(props.video.name);
  };

  const toggleMuteHover = () => {
    setHover(!muteHover);
  };
  const toggleCardHover = (evt: MouseEvent<HTMLDivElement>): void => {
    if (evt.type === "mouseenter") setCardHover(true);
    else if (evt.type === "mouseleave") setCardHover(false);
  };

  const StyledIcon = {
    color: "#555555",
    padding: ".8rem",
    borderRadius: "50%",
    backgroundColor: muteHover ? "rgba(119,119,119,0.4)" : "",
    display: playingSound !== props.video.name ? "" : cardHover ? "" : "none",
  };

  const videoStyle = {
    width: "100%",
    height: Math.round((props.video.height * 240) / props.video.width),
  };

  return (
    <MyCard hoverable bodyStyle={{ padding: 0 }}>
      {
        <div
          onMouseEnter={toggleCardHover}
          onMouseLeave={toggleCardHover}
          style={{ ...videoStyle }}
        >
          <video
            id={videoId}
            style={videoStyle}
            onEnded={videoEndHandler}
            onClick={videoClickHandler}
            onCanPlay={() => setLoading(false)}
            autoPlay={true}
            src={props.video.path}
            muted={playingSound !== props.video.name}
            loop={videoLoop}
          ></video>
          <PauseCircleOutlined
            onClick={videoClickHandler}
            style={{
              color: "#aaaaaa",
              backgroundColor: "rgba(119,119,119,0.4)",
              fontSize: "7rem",
              position: "absolute",
              left: "50%",
              top: "50%",
              borderRadius: "50%",
              padding: "1rem",
              transform: "translate(-50%, -50%)",
              display: paused ? "" : "none",
            }}
          />
          <RedoOutlined
            onClick={redoClickHandler}
            style={{
              color: "#aaaaaa",
              backgroundColor: "rgba(119,119,119,0.4)",
              fontSize: "7rem",
              position: "absolute",
              left: "50%",
              top: "50%",
              borderRadius: "50%",
              padding: "1rem",
              transform: "translate(-50%, -50%)",
              display: ended ? "" : "none",
            }}
          />
          <SoundControl
            onClick={muteHandler}
            onMouseEnter={toggleMuteHover}
            onMouseLeave={toggleMuteHover}
            style={{ display: loading ? "none" : "" }}
          >
            {playingSound !== props.video.name ? (
              <Icon style={StyledIcon} component={MuteIcon} />
            ) : (
              <Icon style={StyledIcon} component={SoundIcon} />
            )}
          </SoundControl>
        </div>
      }
      <PieCardMeta
        username={"John Joe"}
        avatar={
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        }
        actions={{
          shareButton,
          liked,
          likedHandler,
          shareHandler,
        }}
      />
    </MyCard>
  );
};

const MyCard = styled(Card)`
  margin: auto;
  height: auto;
  padding: 0;
  width: 24rem;
  display: inline-flex;
  margin-left: 0.7rem;
  margin-right: 0.7rem;
`;

const SoundControl = styled(`div`)`
  position: absolute;
  left: 1rem;
  bottom: 6.5rem;
  font-size: 3rem;
  z-index: 999;
`;
