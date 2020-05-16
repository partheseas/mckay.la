import React, { useState } from "react";
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

	return (
		<>
			{OPTIONS.map((text, key) => (
				<p
					key={key}
					className={selected === key ? "active" : ""}
					onClick={() => setSelected(key)}
				>
					{text}
				</p>
			))}
			<h1 className="sans-serif">Hell</h1>
			<h6 className="version">
				&copy; 2020 &hearts; McKayla &middot; 0.0.0-2020-05-16-14-41
			</h6>
			<section className="paint-swatch">
				{COLORS.map((color, key) => (
					<div
						key={key}
						style={{ backgroundColor: `var(${color})` }}
					></div>
				))}
			</section>
		</>
	);
};

ReactDOM.render(<Menu />, document.querySelector(".banner"));
