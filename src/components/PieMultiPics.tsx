import { Card, Carousel } from "antd";
import styled from "@emotion/styled";
import { useState } from "react";
import { PieCardMeta } from "./PieCardMeta";
import { useApp } from "../context";

export const PieMultiPics = (props: { pics?: Array<string> }) => {
  const pics = props.pics ? props.pics : [];
  const [liked, setLiked] = useState(false);
  const likedHandler = () => {
    setLiked(!liked);
  };
  const { multiPicsEffect } = useApp();
  const [shareButton] = useState<Element | null>(null);
  const shareHandler = (evt: React.MouseEvent<Element>) => {};
  return (
    <MyCard hoverable bodyStyle={{ padding: 0 }}>
      <Carousel autoplay effect={multiPicsEffect}>
        {pics.map((p, i) => (
          <img key={i} alt="" style={{ width: "100%" }} src={p} />
        ))}
      </Carousel>
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
  width: 24rem;
  height: auto;
  padding: 0;
`;
