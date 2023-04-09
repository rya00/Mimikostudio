import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <>
      <div className="py-3">
        <Container>
          <Outlet /> {/* child pages/contents */}
        </Container>
      </div>
    </>
  );
};

export default PageLayout;
