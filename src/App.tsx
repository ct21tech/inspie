import React from "react";
import { Appbar } from "./components/Appbar";
import "./App.css";
import { Layout } from "antd";
import { PieContainer } from "./components/PieContainer";

const { Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Appbar />
        <PieContainer />
      </Layout>
    </div>
  );
}

export default App;
