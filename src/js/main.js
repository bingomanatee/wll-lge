import React from "react";
import { render } from "react-dom";
import App from '../components/App/App';

import Monitor from './background';

const mon = new Monitor();

render(<App />, document.getElementById("app"));
