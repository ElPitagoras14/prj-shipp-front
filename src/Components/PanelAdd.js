import React from "react";
import FormData from "./FormData";

function PanelAdd(props) {
  const addVehicle = async (obj) => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };
    await fetch("http://localhost:3001/vehicles/", options)
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    await props.onHide();
    await props.reload();
  };

  return (
    <FormData
      drivers={props.drivers}
      titulo="Añade un vehiculo"
      placa=""
      modelo=""
      tipo="car"
      conductor={1}
      capacidad="small"
      onSubmit={addVehicle}
      onHide={props.onHide}
    />
  );
}

export default PanelAdd;
