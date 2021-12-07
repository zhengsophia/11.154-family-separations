const width = 800;
const height = 400;
const marginLeft = 30;
const marginRight = 30;
const marginTop = 30;
const marginBottom = 30;

const barColor = '#ffb752';

const commaFormat = d3.format(',');

const ztpStart = new Date(2018, 4, 7);
const ztpEnd = new Date(2018, 5, 20);

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
const getCategoryDescription = (i) => {
  if (i === 0) {
    return 'Before ZTP';
  }
  if (i === 1) {
    return 'During ZTP';
  }

  return 'After ZTP';
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

  // Create the SVG viewbox
  const svg = d3
    .select('#viz')
    .append('svg')
    .attr('viewBox', [
      0,
      0,
      width + marginLeft + marginRight,
      height + marginTop + marginBottom,
    ]);

  // Draw the title
  svg
    .append('text')
    .attr('font-family', 'Times New Roman')
    .attr('font-weight', 100)
    .attr('font-size', '42px')
    .attr('fill', '#eeeeee')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', marginTop)
    .text('Separation Duration');

  // Draw the summary text
  const summaryText = svg.append('g');

  // Total days value
  summaryText
    .append('text')
    .attr('id', 'summary-text-total-days')
    .attr('font-size', '32px')
    .attr('fill', '#eeeeee')
    .attr('x', width - marginRight)
    .attr('y', marginTop)
    .text(0);

  // Total days label
  summaryText
    .append('text')
    .attr('font-size', '28px')
    .attr('fill', '#aaaaaa')
    .attr('x', width - marginRight)
    .attr('y', marginTop + 30)
    .text('total days');

  // Total children value
  summaryText
    .append('text')
    .attr('id', 'summary-text-total-children')
    .attr('font-size', '32px')
    .attr('fill', '#eeeeee')
    .attr('x', width - marginRight)
    .attr('y', marginTop + 80)
    .text(0);

  // Total children label
  summaryText
    .append('text')
    .attr('font-size', '28px')
    .attr('fill', '#aaaaaa')
    .attr('x', width - marginRight)
    .attr('y', marginTop + 110)
    .text('children separated');

  // Styling for summary text
  summaryText
    .selectAll('text')
    .attr('font-family', 'Times New Roman')
    .attr('text-anchor', 'middle');

  // Extract the endpoints for scaling purposes
  const endpoints = data.map((x) => x.Duration);

  // Setup colors and draw the legend
  const colors = d3
    .scaleOrdinal()
    .domain([0, 1, 2])
    .range(['#FDAE61', '#D53E4F', '#F46D43']);

  // Draw the legend dots
  svg
    .selectAll('legend-dots')
    .data([0, 1, 2])
    .enter()
    .append('circle')
    .attr('cx', marginLeft)
    .attr('cy', (d, i) => marginTop + i * 25)
    .attr('r', 15)
    .style('fill', colors);

  // Draw the legend labels
  svg
    .selectAll('legend-labels')
    .data([0, 1, 2])
    .enter()
    .append('text')
    .attr('font-family', 'Times New Roman')
    .attr('x', marginLeft + 20)
    .attr('y', (d, i) => marginTop + i * 25)
    .style('fill', '#eeeeee')
    .text(getCategoryDescription)
    .attr('text-anchor', 'left')
    .style('alignment-baseline', 'middle');

  // const colors = d3
  //   .scaleLinear()
  //   .domain(d3.ticks(0, d3.max(endpoints), 5))
  //   .range(['#FFFFBF', '#FEE08B', '#FDAE61', '#F46D43', '#D53E4F']);

  // Setup scales and axes
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(endpoints) + 1])
    .range([0, width]);

  const xAxis = d3.axisBottom(xScale).ticks(10);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(endpoints)])
    .range([marginBottom, height - marginTop - 10]);

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
    .attr('font-size', '28px')
    .attr('fill', '#aaaaaa')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2 + marginLeft)
    .attr('y', height + marginBottom)
    .text('days');

  // Define arc constants
  const circleRadius = 3,
    circleAnimationDuration = 500,
    pathStep = 1,
    pathStroke = 2,
    pathHoverStroke = 3,
    pathAnimationDuration = 1000,
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
      let dateApprehended = migrantData.DATE_APPREHENDED.split('/');
      dateApprehendedObj = new Date(
        dateApprehended[2],
        dateApprehended[0] - 1,
        dateApprehended[1]
      );
      const color = colors(resolveDateToCategory(dateApprehendedObj));

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
          const currentTotalDays = parseInt(
            d3.select('#summary-text-total-days').text().replace(/,/g, '')
          );
          const newTotalDays = currentTotalDays + migrantData.Duration;
          d3.select('#summary-text-total-days').text(commaFormat(newTotalDays));
          d3.select('#summary-text-total-children').text(commaFormat(i + 1));
        });

      // Display the tooltip on hover
      arc
        .on('mouseover', function (event, d) {
          d3.select('#tooltip')
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
          d3.select('#tooltip')
            .style('left', event.pageX + 15 + 'px')
            .style('top', event.pageY + 'px');
        })
        .on('mouseout', function () {
          d3.select('#tooltip').classed('hidden', true);
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

// Load data from CSV and show the bar chart
d3.csv('arc_data.csv', d3.autoType).then((data) => {
  data = data.filter((row) => row.Duration !== 'no discharge');

  const tempFacility = 'BCFS Raymondville';
  drawArcDiagram(
    data.filter((record) => record.FACILITY_APPROVED === tempFacility)
  );
});
