import React from "react";
import Footer from "@/components/footer"; 
import Header from "@/components/header"; 

const MainLayout = ({children}) => {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  )
}

export default MainLayout;