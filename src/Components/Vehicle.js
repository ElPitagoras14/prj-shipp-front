import React from "react";

function Vehicle(props) {
  const onDelete = (e) => {
    props.onDelete(props.id);
  };

  const onUpdate = async (e) => {
    await props.onHide();
    await props.onShow({
      id: props.id,
      plate: props.plate,
      model: props.model,
      type: props.type,
      driver: props.driverID,
      capacity: props.capacity,
    });
  };

  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.driverID}</td>
      <td>{props.name}</td>
      <td>{props.email}</td>
      <td>{props.model}</td>
      <td>{props.plate}</td>
      <td>{props.type}</td>
      <td>{props.capacity}</td>
      <td>
        <button className="button" onClick={onUpdate}>
          Editar
        </button>
        <button className="button" onClick={onDelete}>
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default Vehicle;
