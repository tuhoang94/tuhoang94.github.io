Plotly.d3.csv('2015.csv', function(err, rows){

      rows.forEach(function(d) {
    d["Happiness Score"] = +d["Happiness Score"];
    //d["Happiness.Rank"]= +d["Happiness.Rank"];
//    console.log(d);
  });
      function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
      }
  console.log(unpack(rows, 'postal'));
 var data = [{
              type: 'choropleth',
              locationmode: 'country names',
              locations: unpack(rows, 'Country'),
              z: unpack(rows, 'Happiness Score'),
              text: unpack(rows, 'Country'),
  <!-- colorscale: [ -->
              <!-- [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'], -->
              <!-- [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'], -->
              <!-- [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)'] -->
          <!-- ], -->
          colorbar: {
              title: 'Happiness Score',
              thickness: 10
          },
          marker: {
              line:{
                  color: 'rgb(255,255,255)',
                  width: 1
              }
          }
      }];
console.log(data);
  var layout = {
          title: 'Happiness Score of 155 countries',
          geo: {
            projection: {
              type: 'robinson'
            }
          }
      };
      Plotly.plot(myDiv, data, layout, {showLink: false});
  });
        
        
        