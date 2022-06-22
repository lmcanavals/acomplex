(async function() {
	console.log("Toda la alegría del mundo.");

	// Data

	const urldptos = "data/d.json";
	const urlpath  = "peru1"
	const datapath = await d3.json(urlpath);
	const dptos    = await d3.json(urldptos);

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

	const projection = d3
		.geoOrthographic()
		.rotate([75.0, 9.2])
		.fitSize([box.bwidth, box.bheight], dptos);

	const path = d3.geoPath().projection(projection);
	const zoom = d3.zoom().scaleExtent([1, 64]).on("zoom", zoomed);

	const l = [30, 1, 14, 2, 25, 17, 16, 15, 10, 11, 9, 8, 7,
						 19, 4, 22, 21, 20, 5, 3, 24, 13, 12, 23, 6, 18];

	const numColors = 30;
	const colors = Array(numColors);
	for (let i = 0; i < numColors; ++i) {
		colors[i] = d3.interpolateViridis((i + numColors/2.0) / (numColors*2.0));
	}
	const fill   = d => colors[l[+d.properties["IDDPTO"]]+2];
	const stroke = d => colors[l[+d.properties["IDDPTO"]]+1];

	const svg = d3
		.select("#box")
		.append("svg")
		.attr("width", box.width)
		.attr("height", box.height)
		.call(zoom)
		.on("click", reset);

	const g = svg.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`);

	const peru = g
		.append("g")
		.attr("cursor", "pointer")
		.selectAll("path")
		.data(dptos.features)
		.join("path")
		.on("click", clicked)
		.attr("d", path)
		.attr("fill", fill)
		.attr("stroke", stroke);

	peru.append("title").text(d => d.properties["DISTRITO"]);

	const [lon, lat] = [d => d["lon"], d => d["lat"]];
	for (const d of datapath) {
		[d["lon"], d["lat"]] = projection([+lon(d), +lat(d)]);
	}
	const lineGenerator = d3.line().x(lon).y(lat);
	const line = g.append("path")
		.attr("d", lineGenerator(datapath))
		.attr("fill", "none")
		.attr("stroke", "Gold")
		.attr("stroke-width", 1.5)
		.attr("opacity", 0.75);
	const dots = g.selectAll("circle")
		.data(datapath)
		.enter()
		.append("circle")
		.attr("cx", lon)
		.attr("cy", lat)
		.attr("r", 2.2)
		.attr("fill", "Orange")
		.attr("opacity", 0.75);

	dots.append("title").text(d => d["cp"]);

	// Funciones y eventos

	d3.select("body").on("keypress", e => {
		if (e.keyCode === 32) {
			reset();
		}
	});
	function reset() {
		peru.transition().style("fill", null);
		svg.transition()
			.duration(750)
			.call(
				zoom.transform,
				d3.zoomIdentity,
				d3.zoomTransform(svg.node()).invert([box.width / 2, box.height / 2])
			);
	}
	function clicked(event, d) {
		const [[x0, y0], [x1, y1]] = path.bounds(d);
		const scale = Math.max((x1 - x0) / box.width, (y1 - y0) / box.height);
		event.stopPropagation();
		peru.transition().style("fill", null);
		d3.select(this).transition().style("fill", "Sienna");
		svg.transition()
			.duration(750)
			.call(
				zoom.transform,
				d3.zoomIdentity
					.translate(box.width / 2, box.height / 2)
					.scale(Math.min(64, 0.9 / scale))
					.translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
				d3.pointer(event, svg.node())
			);
	}
	function zoomed(event) {
		if (event.transform.x == 0 && event.transform.y == 0) {
			event.transform.x = margin.left;
			event.transform.y = margin.top;
		}
		g.attr("transform", event.transform);
		g.attr("stroke-width", 1 / event.transform.k);
		line.attr("stroke-width", 1.5 / event.transform.k);
		dots.attr("r", 2.2 / event.transform.k);
	}

	// Empezamos

})();

/* vim: set tabstop=2:softtabstop=2:shiftwidth=2:noexpandtab */

