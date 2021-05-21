import styled from "@emotion/styled";
import { ActionProp } from "./../context/index";
import { Avatar } from "antd";
import { PieCardMetaActions } from "./PieCardMetaActions";

export const PieCardMeta = ({
  actions,
  username,
  avatar,
}: {
  actions: ActionProp;
  username: string;
  avatar: string;
}) => {
  return (
    <MyUser>
      <MyAvatar src={avatar} />
      {username}
      <PieCardMetaActions {...actions} />
    </MyUser>
  );
};

const MyUser = styled.div`
  font-weight: 500;
  margin: 1rem;
  position: relative;
`;

const MyAvatar = styled(Avatar)`
  position: absolute;
  left: 0.7rem;
  top: 0;
`;
