import { Card } from "antd";
import { useState } from "react";
import styled from "@emotion/styled";
import { PieCardMeta } from "./PieCardMeta";

export const PieSinglePic = (props: { src: string }) => {
  const src = props.src ? props.src : "";
  const [liked, setLiked] = useState(false);
  const likedHandler = () => {
    setLiked(!liked);
  };
  const [shareButton] = useState<Element | null>(null);
  const shareHandler = (evt: React.MouseEvent<Element>) => {};
  return (
    <MyCard hoverable bodyStyle={{ padding: 0 }}>
      <img alt="" style={{ width: "100%" }} src={src} />
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
  vertical-align: top;
`;
