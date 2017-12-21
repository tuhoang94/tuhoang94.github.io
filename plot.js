var padding = 55,
  width = 960,
  height = 500,
  rightBar = width / 8,
  legendheight = height / 4;


var svg2 = d3.select("#chartContainer")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append('g')
  .attr('class', 'chart');


// var svg = dimple.newSvg("#chartContainer", 590, 400);
d3.csv("./data/2015.csv", function (data) {
  // Latest period only
  // dimple.filterData(data, "Date", "01/12/2012");
  // Create the chart
  var myChart = new dimple.chart(svg2, data);
  myChart.setBounds(60, 30, 420, 330)

  // Create a standard bubble of SKUs by Price and Sales Value
  // We are coloring by Owner as that will be the key in the legend
  myChart.addMeasureAxis("x", "Economy (GDP per Capita)");
  myChart.addMeasureAxis("y", "Happiness Score");
  //Radius bubbles
  // var z = myChart.addMeasureAxis("z", "Happiness Score");

  myChart.addSeries(["Happiness Rank", "Country", "Region"], dimple.plot.bubble);
  var myLegend = myChart.addLegend(620, 70, 60, 300, "Right");
  myChart.draw();

  // This is a critical step.  By doing this we orphan the legend. This
  // means it will not respond to graph updates.  Without this the legend
  // will redraw when the chart refreshes removing the unchecked item and
  // also dropping the events we define below.
  myChart.legends = [];

  // This block simply adds the legend title. I put it into a d3 data
  // object to split it onto 2 lines.  This technique works with any
  // number of lines, it isn't dimple specific.
  svg2.selectAll("title_text")
    .data(["Click legend to", "show/hide owners:"])
    .enter()
    .append("text")
    .attr("x", 499)
    .attr("y", function (d, i) { return 90 + i * 14 - 40; })
    .style("font-family", "sans-serif")
    .style("font-size", "10px")
    .style("color", "Black")
    .text(function (d) { return d; });

  // Get a unique list of Owner values to use when filtering
  var filterValues = dimple.getUniqueValues(data, "Region");
  // Get all the rectangles from our now orphaned legend
  myLegend.shapes.selectAll("rect")
    // Add a click event to each rectangle
    .on("click", function (e) {
      // This indicates whether the item is already visible or not
      var hide = false;
      var newFilters = [];
      // If the filters contain the clicked shape hide it
      filterValues.forEach(function (f) {
        if (f === e.aggField.slice(-1)[0]) {
          hide = true;
        } else {
          newFilters.push(f);
        }
      });
      // Hide the shape or show it
      if (hide) {
        d3.select(this).style("opacity", 0.2);
      } else {
        newFilters.push(e.aggField.slice(-1)[0]);
        d3.select(this).style("opacity", 0.8);
      }
      // Update the filters
      filterValues = newFilters;
      // Filter the data
      myChart.data = dimple.filterData(data, "Region", filterValues);
      // Passing a duration parameter makes the chart animate. Without
      // it there is no transition
      myChart.draw(1000);
    });



  //barchart
  var svg3 = dimple.newSvg("#chartContainer2", 690, 400);
  var myChart2 = new dimple.chart(svg3, data);
  myChart2.setBounds(200, 30, 480, 330);
  myChart2.addMeasureAxis("x", "Country");
  var y = myChart2.addCategoryAxis("y", "Region");
  //y.addOrderRule("Date");
  myChart2.addSeries(null, dimple.plot.bar);
  myChart2.draw();
});
