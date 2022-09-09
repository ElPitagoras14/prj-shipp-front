import React from "react";
import FormData from "./FormData";

function PanelUpdate(props) {
  const updateVehicle = async (obj) => {
    const body = {
      id: props.id,
      plate: obj.plate,
      model: obj.model,
      type: obj.type,
      driver: obj.driverID,
      capacity: obj.capacity,
    };
    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    await fetch("http://localhost:3001/vehicles", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    await props.onHide();
    await props.reload();
  };

  return (
    <FormData
      drivers={props.drivers}
      titulo="Edita el vehiculo"
      placa={props.placa}
      modelo={props.modelo}
      tipo={props.tipo}
      conductor={props.conductor}
      capacidad={props.capacidad}
      onSubmit={updateVehicle}
      onHide={props.onHide}
    />
  );
}

export default PanelUpdate;
