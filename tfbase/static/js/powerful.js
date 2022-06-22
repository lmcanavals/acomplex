(async function() {
	console.log("Toda la alegría del mundo.");

	// Data

	const urlgraph = "graph";
	const urlpaths = "paths"
	const graph    = await d3.json(urlgraph);
	const paths    = await d3.json(urlpaths);

	// config

	const margin = {
		top:    10,
		right:  10,
		bottom: 10,
		left:   10
	};
	const box    = {
		width:   990,
		height:  695,
		bwidth:  990 - margin.left - margin.right,
	  bheight: 695 - margin.top - margin.bottom
	};

	// Canvas y elementos

	const svg = d3
		.select("#box")
		.append("svg")
		.attr("width", box.width)
		.attr("height", box.height);

	const g = svg.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`);

	const [lon, lat] = [d => d[0], d => d[1]];
	const lineGenerator = d3.line().x(lon).y(lat);
	const line = g.append("path")
		.attr("d", lineGenerator(graph.loc))
		.attr("fill", "none")
		.attr("stroke", "Gold")
		.attr("stroke-width", 1.5)
		.attr("opacity", 0.75);
	const dots = g.selectAll("circle")
		.data(graph.loc)
		.enter()
		.append("circle")
		.attr("cx", lon)
		.attr("cy", lat)
		.attr("r", 2.2)
		.attr("fill", "Orange")
		.attr("opacity", 0.75);

	// Funciones y eventos

	// Empezamos

})();

/* vim: set tabstop=2:softtabstop=2:shiftwidth=2:noexpandtab */

