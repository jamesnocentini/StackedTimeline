var margin = {top: 100, right: 100, bottom: 100, left: 100};
var w = 800;
var h = 300;

var dataset = [
  {
    start_date: '2014-01-01',
    end_date: '2014-01-15'
  },
  {
    start_date: '2014-02-01',
    end_date: '2014-02-15'
  }
];

var format = d3.time.format("%Y-%m-%d");

var colors = d3.scale.category10();

var xScale = d3.time.scale()
  .domain([new Date, new Date])
  .nice(d3.time.year)
  .range([0, w]);

var svg = d3.select('pricing-timeline').append('svg')
  .attr('width', w + margin.left + margin.right)
  .attr('height', h + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

svg.append('g')
  .attr('class', 'x axis')
  .call(d3.svg.axis().scale(xScale).orient('bottom'));

var group = svg.append('g');

group.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('y', -22)
  .attr('x', function(d) { return xScale(format.parse(d.start_date)); })
  .attr('width', function(d) {
    return xScale(format.parse(d.end_date)) - xScale(format.parse(d.start_date));
  })
  .attr('height', 20)
  .style('fill', function(d, i) {
    return colors(i);
  });