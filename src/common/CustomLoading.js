import React from "react";

const CustomLoading = ({ error, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Erro ao carregar página</div>;
  }
  return null;
};

export default CustomLoading;
