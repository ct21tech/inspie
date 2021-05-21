import { useApp, ActionProp, ActionIconColor } from "./../context/index";
import { ReactComponent as ShareIcon } from "../assets/share1.svg";
import { ReactComponent as LikeIcon } from "../assets/like1.svg";
import styled from "@emotion/styled";
import Icon from "@ant-design/icons";

export const PieCardMetaActions = ({
  // styleLike,
  // styleShare,
  liked,
  likedHandler,
}: ActionProp) => {
  const { actionIconColor, antdThemeColor } = useApp();
  const styleLike = liked
    ? { color: "#ea4335" }
    : actionIconColor === ActionIconColor.light
    ? { color: "#666666" }
    : actionIconColor === ActionIconColor.theme
    ? { color: antdThemeColor[4] }
    : { color: "" };
  const styleShare =
    actionIconColor === ActionIconColor.light
      ? { color: "#666666" }
      : actionIconColor === ActionIconColor.theme
      ? { color: antdThemeColor[4] }
      : { color: "" };
  return (
    <div style={{ display: "inline" }}>
      <Liked onClick={likedHandler}>
        <Icon style={{ ...styleLike }} component={LikeIcon} />
      </Liked>
      <Share>
        <Icon style={{ ...styleShare }} component={ShareIcon} />
      </Share>
    </div>
  );
};

const Liked = styled.div`
  display: inline;
  float: right;
  font-size: 1.5em;
  color: "#000";
`;

const Share = styled.div`
  display: inline;
  float: right;
  margin-right: 0.7rem;
  font-size: 1.5em;
  color: "#000";
`;
