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
      page: 0,
    };

    this.onSearchDrivers = this.onSearchDrivers.bind(this);
    this.onSearchVehicles = this.onSearchVehicles.bind(this);
    this.onChangeDriver = this.onChangeDriver.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.reloadVehicles = this.reloadVehicles.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  async onSearchVehicles(driverID) {
    await fetch(
      `http://localhost:3001/vehicles/${driverID}?page=${this.state.page}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          vehicles: [...this.state.vehicles].concat(data),
          page: this.state.page + 1,
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
    await this.reloadVehicles();
  }

  onChangeDriver(e) {
    const driverID = e.target.value;
    this.setState({
      actualDriver: driverID,
      page: 1,
      vehicles: [],
    });
    this.onSearchVehicles(driverID);
  }

  async onLoad(e) {
    this.setState({
      vehicles: [],
      page: 0,
      actualDriver: 1,
    });
    await this.onSearchDrivers();
    await this.onSearchVehicles(1);
  }

  showMore() {
    this.setState({
      page: this.state.page + 1,
    });
    this.onSearchVehicles(this.state.actualDriver);
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
          showMore={this.showMore}
        />
      </div>
    );
  }
}

export default App;
