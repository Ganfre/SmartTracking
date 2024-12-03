import styled from 'styled-components';

export const StyledLoginForm = styled.div`
  padding-top: 20px;
  max-height: 100%;
  min-height: 80vh;

  .userfront-form {
    padding: 10px;
    border-radius: 20px;
    max-width: 400px;
    min-height: 306px;
    margin: 20px 0px;
  }

  .userfront-input {
    width: 100%;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 15px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #983F97; 
      outline: none; 
    }
  }

  .userfront-button {
    width: 100%;
    padding: 5px;
    border-radius: 25px;
    background-color: green;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border: 2px solid white;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;

    &:hover {
      background-color: green;
      color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
    }
  }

  .userfront-label {
    font-size: 14px;
    color: black;
    margin-bottom: 5px;
    display: block;
  }
`;
