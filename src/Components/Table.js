import React from "react";
import PanelUpdate from "./PanelUpdate";
import Vehicle from "./Vehicle";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      id: "",
      plate: "",
      model: "",
      type: "car",
      driver: 1,
      capacity: "small",
    };

    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  onShow(item) {
    this.setState({
      show: true,
      id: item.id,
      plate: item.plate,
      model: item.model,
      type: item.type,
      driver: item.driver,
      capacity: item.capacity,
    });
  }

  onHide() {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <>
        <div className="form-container">
          {this.state.show ? (
            <PanelUpdate
              drivers={this.props.drivers}
              onHide={this.onHide}
              onUpdate={this.onUpdate}
              id={this.state.id}
              placa={this.state.plate}
              modelo={this.state.model}
              tipo={this.state.type}
              conductor={this.state.driver}
              capacidad={this.state.capacity}
              reload={this.props.reload}
            />
          ) : (
            <></>
          )}
        </div>
        <div>
          <table className="customTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Conductor</th>
                <th>Conductor</th>
                <th>Email</th>
                <th>Modelo</th>
                <th>Placa</th>
                <th>Tipo</th>
                <th>Capacidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.props.vehicles.map((item) => (
                <Vehicle
                  key={item.id}
                  id={item.id}
                  driverID={item.driver_id}
                  plate={item.plate}
                  model={item.model}
                  type={item.type}
                  capacity={item.capacity}
                  name={item.driver.first_name + " " + item.driver.last_name}
                  email={item.driver.email}
                  onDelete={this.props.onDelete}
                  onShow={this.onShow}
                  onHide={this.onHide}
                />
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Table;
