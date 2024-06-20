import React from "react";
import Resources from "../components/Resources/Resources";
import Header from "../components/Header"
import Navbar from "../components/Navbar/Navbar";

const ResourcePage: React.FC = () => {
  return (
    <div>
     <Navbar/>
     <Resources/>
    </div>
  );
};

export default ResourcePage;
