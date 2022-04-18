import React from "react";
import "antd/dist/antd.css";
import wrapper from "../store/storeConfigure";
import GlobalStyle from "../utils/globalStyles";

const AppShell = ({ Component }) => {
  return (
    <div>
      <GlobalStyle />
      <Component />
    </div>
  );
};

export default wrapper.withRedux(AppShell);
