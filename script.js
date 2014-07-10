//Width and height
var w = 800;
var h = 300;

//Original data
var dataset = [
  [
    { x: 0, y: 6 }
  ],
  [
    { x: 0, y: 10 }
  ],
  [
    { x: 0, y: 2 }
  ],
  [
    { x: 0, y: 10 }
  ],
  [
    { x: 0, y: 7 }
  ]
];

//Set up stack method
var stack = d3.layout.stack();

//data, stacked
stack(dataset);

//set up scales
var xScale = d3.scale.linear()
  .domain([0, xScaleMax()])
  .range([0, w]);

function xScaleMax() {
  return d3.max(dataset, function(d) {
    return d3.max(d, function(d) {
      return d.y0 + d.y;
    })
  })
}

//Easy colors accessible via a 10-step ordinal scale
var colors = d3.scale.category10();

//Create SVG element
var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

var group = svg.selectAll('g')
  .data(dataset)
  .enter()
  .append('g')
  .style('fill', function(d, i) {
    return colors(i);
  });

//Add a rect for each data value
var rects = group.selectAll('rect')
  .data(function(d) { return d; })
  .enter()
  .append('rect')
  .attr('x', function(d, i) { return xScale(d.y0); })
  .attr('width', function(d) { return xScale(d.y); })
  .attr('height', 20)
  .attr('y', 0);