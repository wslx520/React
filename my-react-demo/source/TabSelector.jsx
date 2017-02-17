import React from 'react';

class TabSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: this.props.selected};
        this.handleOnClick = this.handleOnClick.bind(this);
    }


  handleOnClick(evt) {
    this.setState({'selected': evt.target.getAttribute('data-value')})
  }

  render() {
    var tabs = this.props.data.map(function (item, i) {
      var selected = item.value == this.state.selected ? 'selected' : '';
      return (
        <li key={i} data-value={item.value}
          className={selected}
          onClick={this.handleOnClick}
        >{item.name}</li>
      );
    }, this);

    return (
      <div className="tab-selector">
        <label>{this.props.label}</label>
        <ul>
          {tabs}
        </ul>
      </div>
    );
  }
};


export default TabSelector