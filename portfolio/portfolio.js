const floatyColors = [
	// 'lavender',
	// 'thistle',
	// 'palegreen',
	// 'mediumaquamarine',
	// 'mediumseagreen',
	// 'lightsteelblue',
	// 'cornflowerblue',
	// 'mediumpurple',
	// 'royalblue',
	// 'darkseagreen',
	"#d4d4d444",
];

const floatyShapes = [
	"50% 50% 50% 50%",
	"0 50% 50% 50%",
	"50% 0 50% 50%",
	"50% 50% 0 50%",
	"50% 50% 50% 0",
];

const pickOne = (list) => list[Math.floor(Math.random() * list.length)];
const lessThanMagnitude = (x) => Math.floor(Math.random() * x * 2 - x);

window.addEventListener("DOMContentLoaded", () => {
	const display = document.querySelector("#display");

	const spacing = 50;
	let cx, cy, fx, fy, i;
	let friends = 0;

	const adjust = () => {
		const box = display.getBoundingClientRect();
		cx = box.width / 2 + 5;
		cy = box.height / 2 - 40;
		fx = cx / spacing;
		fy = cy / spacing;
	};

	window.addEventListener("resize", adjust);

	const floaty = () => {
		const friend = document.createElement("div");
		const dies = friends > 20 && Math.round(Math.random());

		friend.className = "floaty";
		friend.style.backgroundColor = pickOne(floatyColors);
		friend.style.borderRadius = pickOne(floatyShapes);
		friend.style.left = `${cx + lessThanMagnitude(fx) * spacing}px`;
		friend.style.top = `${cy + lessThanMagnitude(fy) * spacing}px`;

		display.appendChild(friend);
		setTimeout(() => {
			friend.style.opacity = 1;
		}, 200);
		friends++;

		if (dies) {
			setTimeout(() => {
				friend.style.opacity = 0;

				setTimeout(() => {
					display.removeChild(friend);
					friends--;
				}, 300);
			}, 30000);
		}

		if (friends > 75) {
			clearInterval(i);
		}
	};

	adjust();

	for (let i = 0; i < fx + fy; i++) {
		floaty();
	}

	i = setInterval(floaty, 700);
});

window.addEventListener("scroll", () => {
	const projects = Array.from(document.getElementById("projects").children);

	projects.forEach((container, index) => {
		const box = container.getBoundingClientRect();
		const middle = window.innerHeight / 2;

		// If we are above the .profile element, then make it big anyway.
		// Otherwise, make whatever element is centered on the screen bigger.
		if (
			(box.top < middle || index === 0) &&
			box.top + box.height > middle
		) {
			if (!container.className.includes("enhance"))
				container.className += " enhance";
		} else {
			container.className = container.className.replace(" enhance", "");
		}
	});
});
