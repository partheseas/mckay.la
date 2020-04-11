$(document).on("present:panel-changed", (event, panel) => {
	if (panel === 3) {
		let target = document.getElementById("target");
		let content = "They are"; // Prevents overlap errors
		target.innerHTML = content;

		setTimeout(() => (target.innerHTML = content += "."), 250);
		setTimeout(() => (target.innerHTML = content += "."), 500);
		setTimeout(() => (target.innerHTML = content += "."), 750);
		setTimeout(() => (target.innerHTML = content += "both?"), 1500);
	}
});
