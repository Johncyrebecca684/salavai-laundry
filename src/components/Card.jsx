import React from "react";
import styled from "styled-components";

const Card = ({ title, subtitle, children }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="text">
          <span>{title}</span>
          <p className="subtitle">{subtitle}</p>
          {children}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;

  .card {
    width: 100%;
    min-height: 200px;
    border-radius: 15px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border: 2px solid #cbd5e1;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .card:hover {
    box-shadow: 0 10px 20px rgba(0, 51, 102, 0.15);
    transform: translateY(-4px);
  }

  .card::before {
    content: "";
    height: 100px;
    width: 100px;
    position: absolute;
    top: -40%;
    left: -20%;
    border-radius: 50%;
    border: 35px solid rgba(0, 119, 182, 0.15);
    transition: all 0.8s ease;
    filter: blur(0.5rem);
  }

  .text {
    flex-grow: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    color: #003366;
    font-weight: 700;
    font-size: 1.6em;
    font-family: "Cormorant Garamond", serif;
  }

  .subtitle {
    font-size: 1em;
    font-weight: 400;
    color: #475569;
    margin-top: 8px;
    line-height: 1.5;
  }

  .icons {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 0 0 15px 15px;
    overflow: hidden;
  }

  .btn {
    border: none;
    flex: 1;
    height: 35px;
    background-color: rgba(247, 234, 234, 0.589);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .svg-icon {
    width: 25px;
    height: 25px;
    stroke: rgb(38, 59, 126);
  }

  .btn:hover {
    background-color: rgb(247, 234, 234);
  }

  .card:hover::before {
    width: 140px;
    height: 140px;
    top: -30%;
    left: 50%;
    filter: blur(0rem);
    border-color: rgba(0, 119, 182, 0.25);
  }
`;

export default Card;
