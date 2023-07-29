import React from "react";
import {  Col, Row } from "antd";
import { useLocation } from "react-router-dom"; 

const FmcsasView = (props) => {
  const location = useLocation()
  console.log("location", location.state);
  const data = location?.state;

  return (
    <>
      <Row>
        {data.map((carrierData, index) => (
          <Col key={index} md={8} lg={6} className="mb-4">
            <div className="card custome_card bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title mb-4">
                  {carrierData?.firstName ? carrierData?.firstName : "-"}
                </h5>
                <p className="card-text">
                  Last Name:{" "}
                  {carrierData?.lastName ? carrierData?.lastName : "-"}
                </p>
                <p className="card-text">
                  Company Name:{" "}
                  {carrierData?.companyName ? carrierData?.companyName : "-"}
                </p>
                <p className="card-text">
                  DOT Number:{" "}
                  {carrierData?.dotNumber ? carrierData?.dotNumber : "-"}
                </p>
                <p className="card-text">
                  Email: {carrierData?.email ? carrierData?.email : "-"}
                </p>
                <p className="card-text">
                  Mobile: {carrierData?.mobile ? carrierData?.mobile : "-"}
                </p>
                <hr />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default FmcsasView;
