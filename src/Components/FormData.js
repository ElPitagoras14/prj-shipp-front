import React from "react";
import Driver from "./Driver";

class FormData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      plate: props.placa,
      model: props.modelo,
      type: props.tipo,
      driver: props.conductor,
      capacity: props.capacidad,
    };

    this.onChangePlaca = this.onChangePlaca.bind(this);
    this.onChangeModelo = this.onChangeModelo.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.onChangeConductor = this.onChangeConductor.bind(this);
    this.onChangeCapacidad = this.onChangeCapacidad.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  onChangePlaca(e) {
    this.setState({
      plate: e.target.value,
    });
  }

  onChangeModelo(e) {
    this.setState({
      model: e.target.value,
    });
  }

  onChangeTipo(e) {
    this.setState({
      type: e.currentTarget.value,
    });
  }

  onChangeConductor(e) {
    this.setState({
      driver: parseInt(e.currentTarget.value),
    });
  }

  onChangeCapacidad(e) {
    this.setState({
      capacity: e.currentTarget.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const plate = this.state.plate;
    const model = this.state.model;
    const type = this.state.type;
    const driver = this.state.driver;
    const capacity = this.state.capacity;

    this.props.onSubmit({
      plate,
      model,
      type,
      driver,
      capacity,
    });
  }

  onHide(e) {
    this.props.onHide();
  }

  render() {
    return (
      <div className="form">
        <h3>{this.props.titulo}</h3>
        <form onSubmit={this.onSubmit}>
          <label>Placa:</label>
          <input
            className="input"
            type="text"
            id="placa"
            name="placa"
            value={this.state.plate}
            onChange={this.onChangePlaca}
          />
          <label>Modelo:</label>
          <input
            className="input"
            type="text"
            id="modelo"
            name="modelo"
            value={this.state.model}
            onChange={this.onChangeModelo}
          />
          <label>Conductor:</label>
          <select
            className="input"
            value={this.state.driver}
            onChange={this.onChangeConductor}
          >
            {this.props.drivers.map((item) => (
              <Driver
                key={item.id}
                id={item.id}
                name={item.first_name + " " + item.last_name}
              />
            ))}
          </select>
          <label>Tipo:</label>
          <select
            className="input"
            value={this.state.type}
            name="tipo"
            onChange={this.onChangeTipo}
          >
            <option value="bicycle">Bicicleta</option>
            <option value="motorcycle">Motocicleta</option>
            <option value="car">Carro</option>
            <option value="van">Van</option>
            <option value="Truck">Camión</option>
          </select>
          <label>Capacidad:</label>
          <select
            className="input"
            value={this.state.capacity}
            onChange={this.onChangeCapacidad}
          >
            <option value="small">Pequeño</option>
            <option value="medium">Mediano</option>
            <option value="large">Grande</option>
          </select>
          <div className="button-group">
            <button type="button" className="button" onClick={this.onHide}>
              Cancelar
            </button>
            <input className="button" type="submit" value="Actualizar" />
          </div>
        </form>
      </div>
    );
  }
}

export default FormData;
