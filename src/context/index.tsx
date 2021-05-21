import React, { useState, useEffect, ReactNode } from "react";
import { presetPalettes } from "@ant-design/colors";

import { CarouselEffect } from "antd/lib/carousel";

export interface ActionProp {
  shareButton: Element | null;
  hashId?: string;
  liked: boolean;
  shareHandler: (evt: React.MouseEvent<Element>) => void;
  shareCloseHanlder?: () => void;
  likedHandler: (evt: React.MouseEvent<ReactNode>) => void;
}

export interface VideoProp {
  id: number;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;
  duration: number;
}

export enum LoginIconColor {
  theme,
  color,
}

export enum ActionIconColor {
  dark,
  light,
  theme,
}

export interface User {
  avatar: string;
  name: string;
  // id:string;
  // tokeon:string;
}

const AppContext =
  React.createContext<
    | {
        antdThemeColor: string[] & { primary?: string | undefined };
        currentUser: User;
        loginIconColor: LoginIconColor;
        loginButtonLarge: boolean;
        actionIconColor: ActionIconColor;
        actionIconStyle: number;
        multiPicsEffect: CarouselEffect;
        multiPicsEffectM: "fade" | "slide";
        videoLoop: boolean;
        muteDisplay: number;
        playingSound: string;
        setPlayingSound: (v: string) => void;
        setLoginIconColor: (v: LoginIconColor) => void;
        setAntdThemeColor: (
          v: string[] & { primary?: string | undefined }
        ) => void;
        setCurrentUser: (v: User) => void;
        setLoginButtonLarge: (v: boolean) => void;
        setActionIconColor: (v: ActionIconColor) => void;
        setActionIconStyle: (v: number) => void;
        setMultiPicsEffect: (v: CarouselEffect) => void;
        setMultiPicsEffectM: (v: "fade" | "slide") => void;
        setVideoLoop: (v: boolean) => void;
        setMuteDisplay: (v: number) => void;
      }
    | undefined
  >(undefined);

AppContext.displayName = "AppContext";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [antdThemeColor, setAntdThemeColor] = useState(presetPalettes.blue);
  const [loginIconColor, setLoginIconColor] = useState(LoginIconColor.theme);
  const [loginButtonLarge, setLoginButtonLarge] = useState(false);
  const [actionIconColor, setActionIconColor] = useState(ActionIconColor.dark);
  const [actionIconStyle, setActionIconStyle] = useState(0);
  const [playingSound, setPlayingSound] = useState("");
  const [videoLoop, setVideoLoop] = useState(true);
  const [currentUser, setCurrentUser] = useState({ avatar: "", name: "" });
  const [muteDisplay, setMuteDisplay] = useState(0);
  const [multiPicsEffect, setMultiPicsEffect] =
    useState<CarouselEffect>("fade");
  const [multiPicsEffectM, setMultiPicsEffectM] =
    useState<"fade" | "slide">("fade");

  return (
    <AppContext.Provider
      children={children}
      value={{
        currentUser,
        antdThemeColor,
        loginIconColor,
        loginButtonLarge,
        actionIconColor,
        actionIconStyle,
        multiPicsEffect,
        multiPicsEffectM,
        videoLoop,
        muteDisplay,
        playingSound,
        setPlayingSound,
        setCurrentUser,
        setMuteDisplay,
        setAntdThemeColor,
        setLoginButtonLarge,
        setLoginIconColor,
        setActionIconColor,
        setActionIconStyle,
        setMultiPicsEffect,
        setMultiPicsEffectM,
        setVideoLoop,
      }}
    />
  );
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useApp必须在AppProvider中使用");
  }
  return context;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
