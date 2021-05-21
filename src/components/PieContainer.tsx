import { Layout } from "antd";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { PieVideo } from "./PieVideo";
import { VideoProp } from "./../context/index";

const { Content } = Layout;
const APIURL = process.env.REACT_APP_API_URL;

export const PieContainer = ({ children }: { children?: React.ReactNode }) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch(APIURL + `videos`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setVideos(myJson);
      });
  }, []);
  return (
    <MyContent>
      {videos.map((e: VideoProp) => (
        <PieVideo key={e.name} video={e} />
      ))}
    </MyContent>
  );
};

const MyContent = styled(Content)`
  background: white;
  text-align: center;
`;
