import React from 'react';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';


//const store = createStore();

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider>

      </Provider>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 className="text-center">React Markdown Editor</h1>
        <Editor />
        <Display />
      </div>
    );
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
  };

  render() {
    return (
      <div>
        <h3 className='text-center'>Editor</h3>
        <textarea id="editor" style={{width: "100%", height: "10em"}} onChange={this.handleChange}></textarea>
      </div>
    );
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3 className='text-center'>Preview</h3>
        <div id="preview"></div>
      </div>
    );
  }
}