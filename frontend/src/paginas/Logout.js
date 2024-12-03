import React from 'react';
import { LogoutButton } from "@userfront/toolkit/react";
import { FaSignOutAlt } from 'react-icons/fa';

const Logout = () => {
  return (
    <LogoutButton
      style={{
        backgroundColor: "transparent",
        color: "transparent",
        padding: "0px",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        border: "none",
        fontSize: "20px",
        zIndex: '2',
        
      }}
    >
      <FaSignOutAlt size={20} /> 
      Sair
    </LogoutButton>
  );
};

export default Logout;
