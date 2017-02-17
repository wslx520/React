// require('./detail.scss');

import React,{Component} from 'react';
import ReactDom from 'react-dom';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {selected: this.props.selected};
        this.handleOnClick = this.handleOnClick.bind(this);
    }


  handleOnClick(evt) {
    this.setState({'selected': evt.target.getAttribute('data-value')})
  }

  render() {

    return (
      <div id="detail" id={this.props.id}>这里是详情页</div>
    );
  }
};


ReactDom.render(
    <Detail id="my-detail" />, document.body
);