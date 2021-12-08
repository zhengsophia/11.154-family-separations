const width = 600;
const height = 250;
const marginLeft = 30;
const marginRight = 30;
const marginTop = 20;
const marginBottom = 30;

const commaFormat = d3.format(',');

const ztpStart = new Date(2018, 4, 7);
const ztpEnd = new Date(2018, 5, 20);

/**
 * Adds dashes between words in a string.
 *
 * @param {string} s - The target string
 * @returns {string} The dashified string
 */
const dashify = (s) => {
  return s.toLowerCase().trim().split(/\s+/).join('-');
};

// -----------------
// ARC DIAGRAM STUFF
// -----------------

/**
 * Generates an array of points based on `y = ax^2 + bx + c`.
 *
 * Adapted from https://jsfiddle.net/uw5akb29/
 *
 * @param {number} a - The `a` constant
 * @param {number} b - The `b` constant
 * @param {number} c - The `c` constant
 * @param {number[]} rangeX - X-range array (the domain)
 * @param {number} step - Step for generation
 * @returns {number[]} The array of points
 */
function createPoints(a, b, c, rangeX, step) {
  return Array.apply(
    null,
    Array(((rangeX[1] - rangeX[0]) / step) | (0 + 1))
  ).map(function (d, i) {
    const x = rangeX[0] + i * step;
    return [x, a * x * x + b * x + c];
  });
}

/**
 * Converts the category index to the category description.
 *
 * @param {number} i - The category index
 * @returns {string} Category description
 */
const getCategoryDescription = (i, percentages) => {
  if (i === 0) {
    return `Before ZTP (${Math.round(percentages[i] * 100)}%)`;
  }
  if (i === 1) {
    return `During ZTP (${Math.round(percentages[i] * 100)}%)`;
  }
  return `After ZTP (${Math.round(percentages[i] * 100)}%)`;
};

const getLegendHover = (i) => {
  if (i === 0) {
    return 'Child was sent to this facility <i>before</i> the ZTP was put in place';
  }
  if (i === 1) {
    return 'Child was sent to this facility <i>during</i> the ZTP policy period';
  }
  return 'Child was sent to this facility <i>after</i> the ZTP was put in place';
};

/**
 * Converts a date to the category depending on whether it is before the ZTP,
 * after ZTP, or during.
 *
 * @param {Date} date - The date object
 * @returns {number} The category ID
 */
const resolveDateToCategory = (date) => {
  let id = 0;
  if (date < ztpStart) {
    id = 0;
  } else if (date > ztpEnd) {
    id = 2;
  } else {
    id = 1;
  }
  return id;
};

/**
 * @typedef Record
 * @prop {Number} AGE
 * @prop {String} GENDER - M/F/
 * @prop {String} COO - Country of origin
 * @prop {String} DATE_APPREHENDED
 * @prop {String} REFERRAL_DATE
 * @prop {String} DATE_ORR_APPROVED
 * @prop {String} REFERRING_OFFICE
 * @prop {String} FACILITY_APPROVED
 * @prop {String} REUNITIED_SEP_PARENTS
 * @prop {String} UAC_STATUS
 * @prop {String} Date Discharged
 * @prop {String} Reason fo Separation
 * @prop {Number} Duration
 */

/**
 * Draws the arc diagram based on the given data.
 *
 * @param {Record[]} data - The filtered dataset for each facility
 */
const drawArcDiagram = (data) => {
  console.log(data);
  const facilityName = data[0].FACILITY_APPROVED;

  data = data.filter((row) => row.Duration !== 0);

  const facilityId = dashify(facilityName);
  const summaryTextId = `summary-text-${facilityId}`;
  const summaryTextTotalDaysId = `summary-text-total-days-${facilityId}`;

  if (data.length === 0) {
    const summaryText = d3.select(`#${summaryTextId}`);
    summaryText.html(
      'No children from this facility were reunited with their families.'
    );
    return;
  }

  // Create the SVG viewbox
  const svg = d3
    .select('#arc-diagram')
    .append('svg')
    .attr('viewBox', [
      0,
      0,
      width + marginRight + marginLeft,
      height + marginBottom,
    ]);
  // .attr('width', width)
  // .attr('height', height);

  // Draw the title
  // svg
  //   .append('text')
  //   .attr('font-family', 'Times New Roman')
  //   .attr('font-weight', 100)
  //   .attr('font-size', '42px')
  //   .attr('fill', '#eeeeee')
  //   .attr('text-anchor', 'middle')
  //   .attr('x', width / 2)
  //   .attr('y', marginTop)
  //   .text('Separation Duration');

  // Draw the summary text
  const summaryText = svg.append('g');

  // Total days value
  summaryText
    .append('text')
    .attr('id', summaryTextTotalDaysId)
    .style('display', 'none')
    .text(0);

  // Extract the endpoints for scaling purposes
  const endpoints = data.map((x) => x.Duration);

  // Setup colors and draw the legend
  const colors = d3
    .scaleOrdinal()
    .domain([0, 1, 2])
    .range(['#FDAE61', '#D53E4F', '#F46D43']);

  // Draw the legend

  const legendSpacing = 20;
  const legendDotRadius = 5;

  const duringZTP = data.filter(
    (d) => ztpStart <= d.DATE_APPREHENDED && d.DATE_APPREHENDED <= ztpEnd
  );
  const beforeZTP = data.filter((d) => d.DATE_APPREHENDED < ztpStart);

  const duringZTPPercent = duringZTP.length / data.length;
  const beforeZTPPercent = beforeZTP.length / data.length;
  const percentages = [
    beforeZTPPercent,
    duringZTPPercent,
    1 - beforeZTPPercent - duringZTPPercent,
  ];

  // Draw the legend dots
  const legendItems = svg
    .selectAll('legend-dots')
    .data([0, 1, 2])
    .enter()
    .append('g');

  legendItems
    .append('circle')
    .attr('cx', marginLeft)
    .attr('cy', (d, i) => marginTop + i * legendSpacing)
    .attr('r', legendDotRadius)
    .style('fill', colors);

  // Draw the legend labels
  legendItems
    .append('text')
    .attr('font-family', 'Times New Roman')
    .attr('x', marginLeft + legendDotRadius * 3)
    .attr('y', (d, i) => marginTop + i * legendSpacing + 1)
    .style('font-size', '10pt')
    .style('fill', '#bdbdbd')
    .text((d) => getCategoryDescription(d, percentages))
    .attr('text-anchor', 'left')
    .style('alignment-baseline', 'middle');

  legendItems
    .on('mouseover', function (event, d) {
      console.log(event);
      d3.select('#arc-tooltip')
        .style('left', event.pageX + 15 + 'px')
        .style('top', event.pageY + 'px')

        .classed('hidden', false);
      d3.select('#value').html(getLegendHover(d));
      // Update the arc's styling
      const labelThing = d3.select(this).select('text');
      // const thisArc = d3.select(this);
      // thisArc
      //   .attr('stroke-width', pathHoverStroke)
      //   .style('filter', `drop-shadow(0px 0px 3px ${thisArc.attr('stroke')})`);
    })
    .on('mousemove', (event) => {
      d3.select('#arc-tooltip')
        .style('left', event.pageX + 15 + 'px')
        .style('top', event.pageY + 'px');
    })
    .on('mouseout', function () {
      d3.select('#arc-tooltip').classed('hidden', true);
    });

  // const colors = d3
  //   .scaleLinear()
  //   .domain(d3.ticks(0, d3.max(endpoints), 5))
  //   .range(['#FFFFBF', '#FEE08B', '#FDAE61', '#F46D43', '#D53E4F']);

  // Setup scales and axes
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(endpoints) + 1])
    .range([0, marginLeft + width - marginRight]);

  const xAxis = d3.axisBottom(xScale).ticks(10);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(endpoints)])
    .range([marginBottom, marginBottom + height + marginTop - 10]);

  // Draw the x-axis
  svg
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(${marginLeft}, ${height - marginBottom})`)
    .call(xAxis);

  // Draw the x-axis label
  svg
    .append('text')
    .attr('font-family', 'Times New Roman')
    .attr('font-weight', 100)
    .attr('font-size', '22px')
    .attr('fill', '#aaaaaa')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2 + marginLeft)
    .attr('y', height + marginTop)
    .text('days');

  // Define arc constants
  const circleRadius = 3,
    circleAnimationDuration = 500,
    pathStep = 1,
    pathStroke = 2,
    pathHoverStroke = 3,
    pathAnimationDuration = 500,
    pathAnimationDelay = (i) => 100 + i * 50; // Stagger the arc animations

  // Draw the actual arcs
  svg
    .append('g')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .each(function (migrantData, i) {
      const stayDuration = migrantData.Duration;

      // Quadratic function vertex coordinates
      const h = xScale(stayDuration) / 2;
      const k = yScale(stayDuration) / 1.5;

      // Quadratic function parameters
      const a = -k / (h * h),
        b = (2 * k) / h,
        c = 0;

      // Get the color based on the date apprehended
      let dateApprehended = migrantData.DATE_APPREHENDED;
      const color = colors(resolveDateToCategory(dateApprehended));

      // Points generated from quadratic formula
      const points = createPoints(a, b, c, [0, xScale(stayDuration)], pathStep);

      const arc = d3
        .select(this)
        .append('path')
        .attr('stroke', color)
        .attr('stroke-width', pathStroke)
        .attr(
          'transform',
          `translate(${marginLeft},${height - marginBottom}) scale(1,-1)`
        )
        .attr('fill', 'none');

      // Create the arc animation
      arc
        .transition()
        .delay(pathAnimationDelay(i))
        .duration(pathAnimationDuration)
        .ease(d3.easeLinear)
        .call(animate)
        // Draw the circle when the animation ends, have it fade in
        .on('end', () => {
          d3.select(this)
            .append('circle')
            .attr('class', 'control')
            .attr('r', circleRadius)
            .attr('cx', marginLeft + xScale(stayDuration))
            .attr('cy', height - marginBottom)
            .attr('fill', color)
            .style('opacity', 0)
            .transition()
            .duration(circleAnimationDuration)
            .ease(d3.easeLinear)
            .style('opacity', 1);
          // When the arc animation ends, update the counters
          try {
            const summaryText = d3.select(`#${summaryTextId}`);
            // console.log(summaryText);

            const currentTotalDays = parseInt(
              d3.select(`#${summaryTextTotalDaysId}`).text().replace(/,/g, '')
            );
            const newTotalDays = currentTotalDays + migrantData.Duration;
            d3.select(`#${summaryTextTotalDaysId}`).text(
              commaFormat(newTotalDays)
            );
            summaryText.html(
              `${facilityName} had <b>${
                i + 1
              }</b> separated children for a total of <b>${commaFormat(
                newTotalDays
              )}</b> days.`
            );
          } catch (error) {
            // Don't do anything if that modal is gone
            console.log('Returning, caused by another modal being opened');
            return;
          }
        });

      // Display the tooltip on hover
      arc
        .on('mouseover', function (event, d) {
          console.log(event);
          d3.select('#arc-tooltip')
            .style('left', event.pageX + 15 + 'px')
            .style('top', event.pageY + 'px')

            .classed('hidden', false);
          d3.select('#value').html(
            `This child (age <b>${migrantData.AGE}</b>) migrated from <b>${
              migrantData.COO
            }</b> and was separated from their family for <b>${commaFormat(
              migrantData.Duration
            )}</b> days.`
          );
          // Update the arc's styling
          const thisArc = d3.select(this);
          thisArc
            .attr('stroke-width', pathHoverStroke)
            .style(
              'filter',
              `drop-shadow(0px 0px 3px ${thisArc.attr('stroke')})`
            );
        })
        .on('mousemove', (event) => {
          d3.select('#arc-tooltip')
            .style('left', event.pageX + 15 + 'px')
            .style('top', event.pageY + 'px');
        })
        .on('mouseout', function () {
          d3.select('#arc-tooltip').classed('hidden', true);
          d3.select(this)
            .attr('stroke-width', pathStroke)
            .style('filter', 'none');
        });

      // Animate the arc (taken from https://jsfiddle.net/uw5akb29/)
      function animate(selection) {
        selection.attrTween('d', function () {
          return function (t) {
            return (
              'M' +
              points.slice(0, Math.max(1, (t * points.length) | 0)).join('L')
            );
          };
        });
      }
    });
};

/**
 * Loads and draws the arc diagram content for this facility
 *
 * @param {string} facility - The name of the facility
 */
const loadAndDraw = (facility) => {
  // Load data from CSV and show the bar chart
  d3.csv('arc_data.csv', d3.autoType).then((data) => {
    data = data.filter((record) => record.FACILITY_APPROVED === facility);
    drawArcDiagram(data);
  });
};

// ------------
// MAPBOX STUFF
// ------------

// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  'pk.eyJ1IjoiMTU0LWZhbWlseS1zZXBhcmF0aW9ucyIsImEiOiJja3c4MGhobjJjbW9jMm5xMXNyd21xNXI5In0.hkF5HVL6mdh7v0M0eKaYPg';

const map = new mapboxgl.Map({
  container: 'map',
  // Replace YOUR_STYLE_URL with your style URL.
  style: 'mapbox://styles/154-family-separations/ckwtt4r9i0xbl14pkend62wmv',
  center: [-95.7129, 36.0902],
  zoom: 3.5,
});

map.setMaxBounds(map.getBounds());

map.on('load', function () {
  map.addLayer({
    id: 'country-boundaries',
    source: {
      type: 'vector',
      url: 'mapbox://mapbox.country-boundaries-v1',
    },
    'source-layer': 'country_boundaries',
    type: 'fill',
    paint: {
      'fill-color': '#636363',
      'fill-opacity': 0.2,
    },
  });
  map.setFilter('country-boundaries', [
    'in',
    'iso_3166_1_alpha_3',
    'USA',
    'HND',
    'SLV',
    'GTM',
  ]);

  const layers = [
    'High Separation (~85+ days)',
    'Average Separation (~50-95 days)',
    'Low Separation (~0-50 days) ',
  ];
  const colors = ['#C70039', '#ff8080', '#F87C09'];

  // create legend
  const legend = document.getElementById('legend');

  layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = ` <p id = "legend-text">${layer}</p>`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  });
});

map.on('mouseover', 'facilities', () => {
  console.log(
    'A mouseover event has occurred on a visible portion of the facilities layer.'
  );
});

/**
 * Displays the sidebar and its content when a bubble is clicked on the map.
 *
 * @param {object} facilityProps - The facility properties as passed in from the
 *  mapbox layer
 * @param {object} summaryData - The summary data as passed in from Lukas' CSV
 */
const displaySidebar = (facilityProps, summaryData) => {
  console.log(summaryData);

  // Gets the map element and appends the sidebar content to it
  const mapElement = document.getElementById('map');
  let sidebar = document.getElementById('sidebar');
  if (!sidebar) {
    sidebar = document.createElement('div');
    mapElement.appendChild(sidebar);
  }
  sidebar.id = 'sidebar';
  sidebar.innerHTML = `
    <div id="sidebar-content-container" class="container">
      <div class="sidebar-header">
        <h2 id = "sidebar-title">${facilityProps.FACILITY_APPROVED}</h2>
        <button id="close-sidebar" type="button" class="btn-close btn-close-white btn-lg" aria-label="Close"></button>    
      </div>
      <hr>
      
      <div class="row sidebar-top-row">
        <div id="average-days" class="col-6 text-center">
          <h3 class="sidebar-top-labels">Average duration of separation</h3>
          <h1 class="text-center sidebar-top-values">${Math.round(
            summaryData.Duration
          )}<label>days</label></h1>
          
        </div>
        <div id="reunification-rate" class="col-6 text-center">
          <h3 class="sidebar-top-labels">Reunification rate</h3>
          <h1 class="text-center sidebar-top-values">${Math.round(
            summaryData.discharge_rate * 100
          )}<label>%</label></h1>
        </div>
      </div>
      <div id="arc-diagram"></div>
      
      <div id="sidebar-summary-container" class="sidebar-summary-container">
        <h3 class="sidebar-summary-main" style="text-align: center" id="summary-text-${dashify(
          facilityProps.FACILITY_APPROVED
        )}">Waiting for data...</h3>
        <label>(Out of those reunited)</label>
      </div>
    </div>`;

  loadAndDraw(facilityProps.FACILITY_APPROVED);

  // Handles closing the sidebar
  const closeButton = document.getElementById('close-sidebar');
  closeButton.onclick = () => {
    mapElement.removeChild(sidebar);
    map.flyTo({
      center: [-85.7129, 37.0902],
      //offset: [-200, 0],
      zoom: 3.5,
      speed: 0.75,
      curve: 1.5,
    });
  };
};

// Actual trigger for loading the sidebar
map.on('click', 'facilities', function (e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['facilities'],
  });

  const feature = features[0];

  map.flyTo({
    center: feature.geometry.coordinates,
    offset: [-500, 0],
    zoom: 9,
    speed: 0.75,
    curve: 1.5,
  });

  // const popup = new mapboxgl.Popup({
  //   offset: [0, -15],
  //   //closeOnClick: true,
  // })
  //   .setLngLat(feature.geometry.coordinates)
  //   .setHTML(
  //     `<h3>${feature.properties.FACILITY_APPROVED}</h3><p>${feature.properties.count}</p>`
  //   )
  //   .addTo(map);

  const facilityProps = feature.properties;

  if (features.length) {
    //show name and value in sidebar

    d3.csv('map_data.csv', d3.autoType).then((data) => {
      summary_data = data.find(
        (row) => row.FACILITY_APPROVED === facilityProps.FACILITY_APPROVED
      );
      console.log(facilityProps);
      console.log(summary_data);
      displaySidebar(facilityProps, summary_data);
    });
  } else {
    //if not hovering over a feature set tooltip to empty
    const map = document.getElementById('map');
    map.removeChild(document.getElementById('sidebar'));
  }
});

// TESTING CODE!!
// let facilityProps = {
//   Duration: '45.42857142857143',
//   FACILITY_APPROVED:
//     'Lutheran Social Services of Carolinas - Transitional Foster Care',
//   FIELD1: 44,
//   count: 7,
//   discharge_rate: '1.0',
//   status: 'low',
// };
// let summaryData = {
//   Duration: 45.42857142857143,
//   FACILITY_APPROVED:
//     'Lutheran Social Services of Carolinas - Transitional Foster Care',
//   count: 7,
//   discharge_rate: 0.8571428571428571,
//   lat: 35.653487891677926,
//   lon: -80.48559843567813,
// };
// displaySidebar(facilityProps, summaryData);

// displaySidebar(facilityProps, )

map.scrollZoom.disable();

var nav = new mapboxgl.NavigationControl({
  showCompass: false,
  showZoom: true,
});
