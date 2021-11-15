const width = 800;
const height = 400;
const marginLeft = 30;
const marginRight = 30;
const marginTop = 30;
const marginBottom = 30;

const barColor = '#ffb752';

const commaFormat = d3.format(',');

const delta = 0.01;

/**
 * Draws the curve
 *
 * @param {*} d
 * @returns
 */
function getCurve(d, bezier, points, t) {
  var curve = bezier[d];
  if (!curve) {
    curve = bezier[d] = [];
    for (var t_ = 0; t_ <= 1 + delta; t_ += delta) {
      // Get levels, whatever that means
      var x = [points.slice(0, d)];
      for (var i = 1; i < d; i++) {
        let pt = x[x.length - 1];
        // Interpolate
        const nextPoint = [];
        for (var j = 1; j < pt.length; j++) {
          var d0 = pt[j - 1],
            d1 = pt[j];
          nextPoint.push({
            x: d0.x + (d1.x - d0.x) * t_,
            y: d0.y + (d1.y - d0.y) * t_,
          });
        }
        x.push(nextPoint);
      }
      curve.push(x[x.length - 1][0]);
    }
  }
  return [curve.slice(0, t / delta + 1)];
}

function x(d) {
  return d.x;
}
function y(d) {
  return d.y;
}

const showCurves = (data) => {
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

  endpoints = data.map((x) => x.end);

  // TODO: Update color to show categorical data
  const colors = d3
    .scaleLinear()
    .domain(d3.ticks(0, d3.max(endpoints), 5))
    .range(['#FFFFBF', '#FEE08B', '#FDAE61', '#F46D43', '#D53E4F']);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(endpoints)])
    .range([0, width]);

  const xAxis = d3.axisBottom(xScale).ticks(6);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(endpoints)])
    .range([marginBottom, height - marginTop - 10]);

  svg
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .each(function (migrantData) {
      const stayDuration = migrantData.end;

      // Initialize variables for arc
      const bezier = {};
      const line = d3.line().x(x).y(y);
      const curveHeight = -yScale(stayDuration);
      const curveLength = xScale(stayDuration);
      // TODO: Fix points to scale across whole width (use an axis)
      const points = [
        { x: marginLeft, y: height - marginBottom },
        { x: marginLeft + curveLength / 2, y: curveHeight },
        { x: marginLeft + curveLength, y: height - marginBottom },
      ];
      const order = 2;
      const numControlPoints = order + 1;

      let t = 0;
      const orders = d3.range(numControlPoints, order + 2);

      // Define the arc in a new group
      const arc = d3.select(this).selectAll('g').data(orders).enter();

      // Set the speed and start timer for animation
      // TODO: Adjust rate depending on data
      var last = 0;
      let rate = -curveHeight;
      d3.timer(function (elapsed) {
        t = t + ((elapsed - last) / rate) * 0.3;
        last = elapsed;
        update();
      });

      // Stop the timer as soon as our parameter exceeds 1
      if (t > 1) {
        timer.stop();
      }

      // TODO: Set the color of the arc
      const color = colors(stayDuration);

      /**
       * Updates the curve continuously based on the current parameter `t`.
       */
      const update = () => {
        const curve = arc.selectAll('path').data((d) => {
          const curveData = getCurve(d, bezier, points, t);
          return curveData;
        });
        // Actually draw the curve
        curve
          .enter()
          .append('path')
          .attr('stroke', color)
          .attr('stroke-width', '2px')
          .attr('fill', 'none')

          // TODO: Tooltip on hover
          .on('mouseover', function (event, d) {
            // console.log('mouse entered');
            d3.select('#tooltip')
              .style('left', event.pageX + 15 + 'px')
              .style('top', event.pageY + 'px')
              .classed('hidden', false);
            d3.select('#value').text(
              `Days spent: ${commaFormat(stayDuration)}`
            );
            d3.select(this).attr('stroke-width', '3px');
          })
          .on('mousemove', (event) => {
            d3.select('#tooltip')
              .style('left', event.pageX + 15 + 'px')
              .style('top', event.pageY + 'px');
          })
          .on('mouseout', function () {
            // console.log('mouse left');
            d3.select('#tooltip').classed('hidden', true);
            d3.select(this).attr('stroke-width', '2px');
          });
        curve.attr('d', line);
      };

      arc
        .append('circle')
        .attr('class', 'control')
        .attr('r', 5)
        .attr('cx', marginLeft + curveLength)
        .attr('cy', height - marginBottom)
        .attr('fill', color);
    });

  svg
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(${marginLeft}, ${height - marginBottom})`)
    .call(xAxis);
};

// Load data from CSV and show the bar chart
d3.csv('test-data.csv', d3.autoType).then((data) => {
  console.log(data);
  showCurves(data);
});
