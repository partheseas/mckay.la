import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";

window.addEventListener("hashchange", () => window.scrollBy(0, -225));

const OPTIONS = ["New game", "Load game", "Continue", "Options"];
const COLORS = [
	"--light-violet",
	"--light-pink",
	"--light-orange",
	"--light-yellow",
];

const Menu = () => {
	const [selected, setSelected] = useState(2);

	return React.createElement(
		Fragment,
		null,
		OPTIONS.map((text, key) =>
			React.createElement(
				"p",
				{
					key,
					className: selected === key ? "active" : "",
					onClick() {
						setSelected(key);
					},
				},
				text,
			),
		),
		React.createElement("h1", { className: "sans-serif" }, "Hell"),
		React.createElement(
			"h6",
			{ className: "version" },
			"\xA9 2019 \u2665 McKayla \xB7 0.0.0-2019-07-15-22-24",
		),
		React.createElement(
			"section",
			{ className: "paint-swatch" },
			COLORS.map((color, key) =>
				React.createElement("div", {
					key,
					style: { backgroundColor: `var( ${color} )` },
				}),
			),
		),
	);
};

ReactDOM.render(React.createElement(Menu), document.querySelector(".banner"));
