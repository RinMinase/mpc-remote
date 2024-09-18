import { render } from "preact";
import App from "./home";

import "material-design-icons/iconfont/material-icons.css";
import "./global.css";

render(<App />, document.getElementById("app") as HTMLElement);
