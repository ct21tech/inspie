export const PieWechatLogin = ({
  appid,
  redirect_uri,
  state,
  style,
  href,
  onSuccess,
}: {
  appid: string;
  redirect_uri: string;
  state?: string;
  style?: {};
  href?: string;
  height?: string;
  width?: string;
  onSuccess: (v: string) => void;
}) => {
  let sent = false;
  window.addEventListener("message", (event) => {
    // console.log(event);
    if (
      event.origin === "https://new.philipwu.me" &&
      !event.data.source &&
      !sent
    ) {
      sent = true;
      onSuccess(event.data);
    }
  });
  appid = `appid=${appid}`;
  redirect_uri = `&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  const scope = `&scope=snsapi_login`;
  state = state ? `&state=${state}` : ``;
  style = style
    ? { height: "200px", width: "200px", ...style }
    : { height: "200px", width: "200px" };
  href = href ? `&href=${href}` : ``;
  const src =
    `https://open.weixin.qq.com/connect/qrconnect?self_redirect=true&` +
    appid +
    redirect_uri +
    scope +
    state +
    href;
  return (
    <iframe
      id="frame_wechatlogin"
      title="WechatLogin"
      src={src}
      frameBorder={"0"}
      style={{ ...style }}
    ></iframe>
  );
};
