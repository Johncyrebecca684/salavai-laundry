import React from 'react';
import styled from 'styled-components';

const TrainingCard = ({ title, description, icon: Icon, moduleNumber, iconProps }) => {
  return (
    <StyledWrapper>
      <div className="card">
        {Icon && <Icon className="card-icon" {...iconProps} />}
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
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 20px;
  }

  .card-icon {
    width: 32px;
    height: 32px;
    stroke: #003366;
    margin-bottom: 16px;
    fill: #003366;
  }

  .card__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .card__title {
    margin: 0 0 10px 0;
    font-size: 20px;
    color: #333;
    font-weight: 700;
  }

  .card__description {
    margin: 0;
    font-size: 14px;
    color: #777;
    line-height: 1.4;
  }
`;

export default TrainingCard;
