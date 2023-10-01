import React from "react";
import { ToastContainer } from "react-bootstrap";
import Headers from "../components/Header";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <>
      <Headers />
      <ToastContainer />
      <Hero />
    </>
  );
};

export default Home;
