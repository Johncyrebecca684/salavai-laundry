import React from 'react';
import styled from 'styled-components';

const TrainingCard = ({ title, description, icon: Icon, moduleNumber }) => {
  return (
    <StyledWrapper>
      <div className="card">
        {Icon && <Icon className="card-icon" strokeWidth={1.5} />}
        <div className="card__content">
          <p className="card__title">{title}</p>
          <p className="card__description">{description}</p>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 300px;
    height: 250px; /* Increased height slightly to accommodate content */
    background-color: #f2f2f2;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    perspective: 1000px;
    box-shadow: 0 0 20px rgba(0, 51, 102, 0.4);
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card-icon {
    width: 48px;
    height: 48px;
    stroke: #333;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 51, 102, 0.6);
  }

  .card__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f2f2f2;
    transform: rotateX(-90deg);
    transform-origin: bottom;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .card:hover .card__content {
    transform: rotateX(0deg);
  }

  .card__title {
    margin: 0;
    font-size: 20px; /* Adjusted font size for fit */
    color: #333;
    font-weight: 700;
  }

  .card:hover .card-icon {
    scale: 0;
  }

  .card__description {
    margin: 10px 0 0;
    font-size: 14px;
    color: #777;
    line-height: 1.4;
  }
`;

export default TrainingCard;
