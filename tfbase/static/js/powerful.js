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
		.attr("height", box.height)

	const g = svg.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`);

	const extentx = d3.extent(graph.loc, d => d[0]);
	const extenty = d3.extent(graph.loc, d => d[1]);

	const w = extentx[1] - extentx[0];
	const h = extenty[1] - extenty[0];
	let size = 0;
	let xpro = 1;
	let ypro = 1;
	if (w > h) {
		size = box.bwidth - margin.right;
		ypro = h / w;
	} else {
		size = box.bheight - margin.bottom
		xpro = w / h;
	}

	const scalex = d3.scaleLinear()
		.domain(extentx)
		.range([margin.left, size * xpro]);
	const scaley = d3.scaleLinear()
		.domain(extenty)
		.range([size * ypro, margin.top]);

	const [lon, lat] = [d => scalex(d[0]), d => scaley(d[1])];
	const dots = g.selectAll("circle")
		.data(graph.loc)
		.enter()
		.append("circle")
		.attr("cx", lon)
		.attr("cy", lat)
		.attr("r", 2.2)
		.attr("fill", "Orange")
		.attr("opacity", 0.75);

	const edges = [];
	for (const u in graph.g) {
		for (const [v, w] of graph.g[u]) {
			edges.push([
				lon(graph.loc[u]),
				lat(graph.loc[u]),
				lon(graph.loc[v]),
				lat(graph.loc[v]),
			])
		}
	}
	const x1 = d => d[0];
	const y1 = d => d[1];
	const x2 = d => d[2];
	const y2 = d => d[3];
	
	svg.append("g")
	.attr("transform", `translate(${margin.left}, ${margin.top})`)
		.selectAll("line")
		.data(edges)
		.enter()
		.append("line")
		.attr("x1", x1)
		.attr("y1", y1)
		.attr("x2", x2)
		.attr("y2", y2)
		.attr("stroke", "Silver")
		.attr("stroke-width", "7px")
		.attr("opacity", 0.75);
	svg.append("g")
	.attr("transform", `translate(${margin.left}, ${margin.top})`)
		.selectAll("line")
		.data(edges)
		.enter()
		.append("line")
		.attr("x1", x1)
		.attr("y1", y1)
		.attr("x2", x2)
		.attr("y2", y2)
		.attr("stroke", "white")
		.attr("stroke-width", "5px")
		.attr("opacity", 0.75);

	/*const lineGenerator = d3.line().x(lon).y(lat);
		const line = g.append("path")
			.attr("d", lineGenerator(graph.loc))
			.attr("fill", "none")
			.attr("stroke", "Gold")
			.attr("stroke-width", 1.5)
			.attr("opacity", 0.75);*/

	// Funciones y eventos

	// Empezamos

})();

/* vim: set tabstop=2:softtabstop=2:shiftwidth=2:noexpandtab */

