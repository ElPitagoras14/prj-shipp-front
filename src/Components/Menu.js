import React from "react";
import PanelAdd from "./PanelAdd";
import Search from "./Search";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  onShow() {
    this.setState({
      show: true,
    });
  }

  onHide() {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <div>
        <div className="interface">
          <Search drivers={this.props.drivers} onChange={this.props.onChange} />
          <button className="button" onClick={this.props.onLoad}>
            Cargar
          </button>
          <button className="button" onClick={this.onShow}>
            Agregar
          </button>
        </div>
        <div className="form-container">
          {this.state.show ? (
            <PanelAdd
              drivers={this.props.drivers}
              reload={this.props.reload}
              onHide={this.onHide}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

export default Menu;
