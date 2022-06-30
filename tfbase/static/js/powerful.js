(async function () {
  console.log("Toda la alegría del mundo.");

  // Data

  const urlgraph = "graph";
  const graph = await d3.json(urlgraph);

  const s = Math.floor(Math.random() * graph.g.length);
  const t = Math.floor(Math.random() * graph.g.length);
  const urlpaths = `paths/${s}/${t}`
  const paths = await d3.json(urlpaths);

  // config

  const width = document.querySelector("#box").clientWidth;

  const extentx = d3.extent(graph.loc, d => d[0]);
  const extenty = d3.extent(graph.loc, d => d[1]);
  const w = extentx[1] - extentx[0];
  const h = extenty[1] - extenty[0];

  const margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };
  
  const box = {
    width: width,
    height: width * h / w,
  };

  // Canvas y elementos

  const ctx = document.querySelector("#canvitas").getContext("2d");
  if (!ctx) {
    console.log("something terribly wrong is going on here");
    return;
  }
  ctx.canvas.width = box.width;
  ctx.canvas.height = box.height;

  scalex = d3.scaleLinear()
    .domain(extentx)
    .range([margin.left, box.width - margin.right]);
  scaley = d3.scaleLinear()
    .domain(extenty)
    .range([box.height - margin.top, margin.bottom]);

  const [lon, lat] = [d => scalex(d[0]), d => scaley(d[1])];
  const x = d => lon(d);
  const y = d => lat(d);

  function render(points, color, lw) {
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const point of points) {
      ctx.beginPath();
      ctx.strokeStyle = color(point);
      ctx.moveTo(x(point[0]), y(point[0]));
      ctx.lineTo(x(point[1]), y(point[1]));
      ctx.stroke();
    }
  }

  const edges = [];
  for (const u in graph.g) {
    for (const [v, w] of graph.g[u]) {
      edges.push([graph.loc[u], graph.loc[v], w])
    }
  }
  const extentw = d3.extent(edges, d => d[2]);
  const scalecolor = d3.scaleLinear()
    .domain(extentw)
    .range([100, 0]);
  const color = d => `hsla(${scalecolor(d[2])}, 100%, 50%, 0.5)`
  render(edges, color, 2)
  
  function dealWithPath(path, color) {
    let head = t;
    points = []
    while (path[head] != -1) {
      points.push([graph.loc[head], graph.loc[path[head]]]);
      head = path[head];
    }
    render(points, d => color, 4)
  }
  dealWithPath(paths.bestpath, "rgba(0, 128, 0, 0.5)")
  dealWithPath(paths.path1, "rgba(255, 165, 0, 0.5)")
  dealWithPath(paths.path2, "rgba(220,  20, 60, 0.5)")

  ctx.fillStyle = "LimeGreen";
  ctx.fillRect(x(graph.loc[s]) - 5, y(graph.loc[s]) - 5, 10, 10)
  ctx.strokeStyle = "Green";
  ctx.strokeRect(x(graph.loc[s]) - 5, y(graph.loc[s]) - 5, 10, 10)
  ctx.fillStyle = "Orange";
  ctx.fillRect(x(graph.loc[t]) - 5, y(graph.loc[t]) - 5, 10, 10)
  ctx.strokeStyle = "OrangeRed";
  ctx.strokeRect(x(graph.loc[t]) - 5, y(graph.loc[t]) - 5, 10, 10)

  // Funciones y eventos

  // Empezamos

})();

/* vim: set tabstop=2:softtabstop=2:shiftwidth=2:noexpandtab */

