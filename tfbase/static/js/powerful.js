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
		width: 0,
		height: 0,
		bwidth: 0,
	  bheight: 0,
	};

	// Canvas y elementos
  
	const ctx = document.querySelector("#canvitas").getContext("2d");
	if (!ctx) {
		console.log("something terribly wrong is going on here");
		return;
	}

	const extentx = d3.extent(graph.loc, d => d[0]);
	const extenty = d3.extent(graph.loc, d => d[1]);

	const w = extentx[1] - extentx[0];
	const h = extenty[1] - extenty[0];

	const [lon, lat] = [d => scalex(d[0]), d => scaley(d[1])];

	const edges = [];
	for (const u in graph.g) {
		for (const [v, w] of graph.g[u]) {
			edges.push([
				graph.loc[u],
				graph.loc[u],
				graph.loc[v],
				graph.loc[v],
			])
		}
	}
	const x1 = d => lon(d[0]);
	const y1 = d => lat(d[1]);
	const x2 = d => lon(d[2]);
	const y2 = d => lat(d[3]);

  function render() {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    for (const edge of edges) {
      ctx.moveTo(x1(edge), y1(edge));
      ctx.lineTo(x2(edge), y2(edge));
    }
    ctx.stroke();
  }

  function resizeCanvas() {
    box.width   = document.querySelector("body").clientWidth;
    box.height  = document.querySelector("body").clientHeight;
    box.bwidth  = document.querySelector("body").clientWidth - margin.left - margin.right;
    box.bheight = document.querySelector("body").clientHeight - margin.top - margin.bottom;
    
    ctx.canvas.width = box.width;
    ctx.canvas.height = box.height;
    
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
  
    scalex = d3.scaleLinear()
      .domain(extentx)
      .range([margin.left, size * xpro]);
    scaley = d3.scaleLinear()
      .domain(extenty)
      .range([size * ypro, margin.top]);

    render()
    console.log("resizing")
  }
  window.addEventListener('resize', resizeCanvas, false);

  resizeCanvas()
	// Funciones y eventos

	// Empezamos

})();

/* vim: set tabstop=2:softtabstop=2:shiftwidth=2:noexpandtab */

