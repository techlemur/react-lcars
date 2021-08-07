var React = require('react');
var ReactDOM = require('react-dom');
import * as lc from './index';

import "./styles/example.scss";

class Example extends React.Component {

	render () {
		return (
			<>
				<h1>React LCARS Examples</h1>
				<lc.Button>default</lc.Button>
				<lc.Button medical>medical</lc.Button>
				<lc.Button alert>alert</lc.Button>
				<lc.Button medical>0012001200120012001200120012</lc.Button>
			</>
		)
	}

}

ReactDOM.render(
	<Example />,
	document.getElementById('root')
);