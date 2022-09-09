import React from "react";
import Table from "./Components/Table";
import Menu from "./Components/Menu";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: [],
      drivers: [],
      actualDriver: 1,
    };

    this.onSearchDrivers = this.onSearchDrivers.bind(this);
    this.onSearchVehicles = this.onSearchVehicles.bind(this);
    this.onChangeDriver = this.onChangeDriver.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.reloadVehicles = this.reloadVehicles.bind(this);
  }

  async onSearchVehicles(driverID) {
    await fetch(`http://localhost:3001/vehicles/${driverID}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          vehicles: data,
        });
      })
      .catch((err) => {
        console.log("Error");
      });
  }

  async onSearchDrivers() {
    await fetch("http://localhost:3001/drivers")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          drivers: data,
        });
      })
      .catch((err) => {
        console.log("Error");
      });
  }

  async deleteCar(vehicleID) {
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: vehicleID,
      }),
    };

    await fetch("http://localhost:3001/vehicles/", options)
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  async onDelete(vehicleID) {
    await this.deleteCar(vehicleID);
    await this.reloadVehicles()
  }

  onChangeDriver(e) {
    const driverID = e.target.value;
    this.setState({
      actualDriver: driverID,
    });
    this.onSearchVehicles(driverID);
  }

  async onLoad(e) {
    await this.onSearchDrivers();
    await this.onSearchVehicles(1);
    this.setState({
      actualDriver: 1,
    });
  }

  reloadVehicles() {
    this.onSearchVehicles(this.state.actualDriver);
  }

  render() {
    return (
      <div className="container">
        <Menu
          drivers={this.state.drivers}
          onChange={this.onChangeDriver}
          onLoad={this.onLoad}
          reload={this.reloadVehicles}
        />
        <Table
          drivers={this.state.drivers}
          vehicles={this.state.vehicles}
          onDelete={this.onDelete}
          reload={this.reloadVehicles}
        />
      </div>
    );
  }
}

export default App;
