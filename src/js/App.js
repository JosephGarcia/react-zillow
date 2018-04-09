import React, { Component } from 'react';
import ListingsController from './ListingsController';
import '../App.css';

class App extends Component {
	render() {
		return (
			<div className="container">
				<ListingsController />
			</div>
		);
	}
}

export default App;
