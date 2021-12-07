// // https://observablehq.com/@kevin110604/moving-bubble-chart-using-d3-js@385
// export default function define(runtime, observer) {
//   const main = runtime.module();
//   const fileAttachments = new Map("forced_data.csv");
//   main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
//   main.variable(observer()).define(["md"], function(md){return(
// md`# Moving Bubble Chart Using D3.js`
// )});
//   main.variable(observer()).define(["FileAttachment"], function(FileAttachment){return(
// FileAttachment("forced_data.csv")
// )});
//   main.variable(observer()).define(["FileAttachment"], function(FileAttachment){return(
// FileAttachment("forced_data.csv").text()
// )});
//   main.variable(observer("d3")).define("d3", ["require"], function(require){return(
// require("d3@5")
// )});
//   main.variable(observer("width")).define("width", function(){return(
// 860
// )});
//   main.variable(observer("height")).define("height", function(){return(
// 600
// )});
//   main.variable(observer("radius")).define("radius", function(){return(
// 5
// )});
//   main.variable(observer("padding")).define("padding", function(){return(
// 1
// )});
//   main.variable(observer("cluster_padding")).define("cluster_padding", function(){return(
// 5
// )});
//   main.variable(observer("groups")).define("groups", ["width","height"], function(width,height)
// {
//   const groups = {
//     "Zero Tolerance Policy": { x: width/5, y: height/3, color: "#FAF49A", cnt: 0, fullname: "Zero Tolerance Policy" },
//     "Parent Criminal History": { x: 3*width/5, y: height/3, color: "#BEE5AA", cnt: 0, fullname: "Parent Criminal History" },
//     "Parent Gang/Cartel Membership or Affiliation": { x: 3*width/5, y: 2*height/3, color: "#93D1BA", cnt: 0, fullname: "Parent Gang/Cartel Membership or Affiliation" },
//     "Other": { x: width/5, y: 2*height/3, color: "#79BACE", cnt: 0, fullname: "Other" },
//   };
//   return groups
// }
// );
//   main.variable(observer()).define(["groups"], function(groups){return(
// groups['lived']
// )});
//   main.variable(observer("reasons")).define("reasons", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
// d3.csvParse(await FileAttachment("forced_data.csv").text(), d3.autoType)
// )});
//   main.variable(observer()).define(["reasons"], function(reasons){return(
//     reasons[100]
// )});
//   main.variable(observer("people")).define("people", ["forced_data","d3"], function(stages,d3)
// {
//   const people = {};
//   stages.forEach(d => {
//     if (d3.keys(people).includes(d.groupid + "")) {
//       people[d.groupid + ""].push(d);
//     } else {
//       people[d.groupid + ""] = [d];
//     }
//   });
//   return people
// }
// );
//   main.variable(observer("nodes")).define("nodes", ["d3","people","groups","radius"], function(d3,people,groups,radius){return(
// d3.keys(people).map(function(d) {
//   // Initialize count for each group.
//   groups[people[d][0].grp].cnt += 1;
//   return {
//     id: "node"+d,
//     x: groups[people[d][0].grp].x + Math.random(),
//     y: groups[people[d][0].grp].y + Math.random(),
//     r: radius,
//     color: groups[people[d][0].grp].color,
//     group: people[d][0].grp,
//     timeleft: people[d][0].reason,
//     istage: 0,
//     stages: people[d]
//   }
// })
// )});
//   main.variable(observer()).define(["html"], function(html){return(
// html`<!DOCTYPE html>
// <head>
//   <meta charset="utf-8">
//   <title>Timed Moving Bubbles</title>
//   <link rel="stylesheet" href="style/style.css" type="text/css" media="screen" />
// </head>
 
// <div id="main-wrapper">
//   <h1 id="timecount">Time so far: <span class="cnt">0</span></h2>
//   <div id="chart"></div>
// </div><!-- @end #main-wrapper -->
// `
// )});
//   main.variable(observer("chart")).define("chart", ["d3","width","height","nodes","groups","forceCluster","forceCollide"], function(d3,width,height,nodes,groups,forceCluster,forceCollide)
// {
//   // Variables.
//   let time_so_far = 0;
  
//   // The SVG object.
//   // const svg = d3.select("#chart").append("svg")
//   //   .attr("width", width + 20 + 20)
//   //   .attr("height", height + 20 + 20)
//   //   .append("g")
//   //   .attr("transform", "translate(" + 20 + "," + 20 + ")");
//   const svg = d3.create("svg")
//     .attr("viewBox", [0, 0, width+40, height+40]);
  
//   // ???
//   svg.append("g")
//     .attr("transform", "translate(" + 20 + "," + 20 + ")");
    
//   // ???
//   d3.select("#chart").style("width", (width + 20 + 20) + "px");

//   // Circle for each node.
//   const circle = svg.append("g")
//     .selectAll("circle")
//     .data(nodes)
//     .join("circle")
//     .attr("cx", d => d.x)
//     .attr("cy", d => d.y)
//     .attr("fill", d => d.color);

//   // Ease in the circles.
//   circle.transition()
//     .delay((d, i) => i * 5)
//     .duration(800)
//     .attrTween("r", d => {
//       const i = d3.interpolate(0, d.r);
//       return t => d.r = i(t);
//     });
  
//   // Group name labels
//   svg.selectAll('.grp')
//     .data(d3.keys(groups))
//     .join("text")
//     .attr("class", "grp")
//     .attr("text-anchor", "middle")
//     .attr("x", d => groups[d].x)
//     .attr("y", d => groups[d].y - 70)
//     .text(d => groups[d].fullname);

//   // Group counts
//   svg.selectAll('.grpcnt')
//     .data(d3.keys(groups))
//     .join("text")
//     .attr("class", "grpcnt")
//     .attr("text-anchor", "middle")
//     .attr("x", d => groups[d].x)
//     .attr("y", d => groups[d].y - 50)
//     .text(d => groups[d].cnt);
  
//   // Forces
//   const simulation = d3.forceSimulation(nodes)
//     .force("x", d => d3.forceX(d.x))
//     .force("y", d => d3.forceY(d.y))
//     .force("cluster", forceCluster())
//     .force("collide", forceCollide())
//     .alpha(.09)
//     .alphaDecay(0);

//   // Adjust position of circles.
//   simulation.on("tick", () => {
//     circle
//       .attr("cx", d => d.x)
//       .attr("cy", d => d.y)
//       .attr("fill", d => groups[d.group].color);
//   });
  
//   // Make time pass. Adjust node stage as necessary.
//   function timer() {
//     nodes.forEach(function (o, i) {
//       o.timeleft -= 1;
//       if (o.timeleft == 0 && o.istage < o.stages.length - 1) {
//         // Decrease count for previous group.
//         groups[o.group].cnt -= 1;
//         // Update current node to new group.
//         o.istage += 1;
//         o.group = o.stages[o.istage].grp;
//         o.timeleft = o.stages[o.istage].duration;
//         // Increment count for new group.
//         groups[o.group].cnt += 1;
//       }
//     });
//     // Increment time.
//     time_so_far += 1;
//     d3.select("#timecount .cnt").text(time_so_far);
//     // Update counters.
//     svg.selectAll('.grpcnt').text(d => groups[d].cnt);
//     // Do it again.
//     d3.timeout(timer, 500);
//   } // @end timer()
  
//   // Start things off after a few seconds.
//   d3.timeout(timer, 2000);
  
//   return svg.node()
// }
// );
//   main.variable(observer("forceCluster")).define("forceCluster", ["groups"], function(groups){return(
// function forceCluster() {
//   const strength = .15;
//   let nodes;

//   function force(alpha) {
//     const l = alpha * strength;
//     for (const d of nodes) {
//       d.vx -= (d.x - groups[d.group].x) * l;
//       d.vy -= (d.y - groups[d.group].y) * l;
//     }
//   }
//   force.initialize = _ => nodes = _;

//   return force;
// }
// )});
//   main.variable(observer("forceCollide")).define("forceCollide", ["padding","cluster_padding","d3"], function(padding,cluster_padding,d3){return(
// function forceCollide() {
//   const alpha = 0.2; // fixed for greater rigidity!
//   const padding1 = padding; // separation between same-color nodes
//   const padding2 = cluster_padding; // separation between different-color nodes
//   let nodes;
//   let maxRadius;

//   function force() {
//     const quadtree = d3.quadtree(nodes, d => d.x, d => d.y);
//     for (const d of nodes) {
//       const r = d.r + maxRadius;
//       const nx1 = d.x - r, ny1 = d.y - r;
//       const nx2 = d.x + r, ny2 = d.y + r;
      
//       quadtree.visit((q, x1, y1, x2, y2) => {
//         if (!q.length) do {
//           if (q.data !== d) {
//             const r = d.r + q.data.r + (d.group === q.data.group ? padding1 : padding2);
//             let x = d.x - q.data.x, y = d.y - q.data.y, l = Math.hypot(x, y);
//             if (l < r) {
//               l = (l - r) / l * alpha;
//               d.x -= x *= l, d.y -= y *= l;
//               q.data.x += x, q.data.y += y;
//             }
//           }
//         } while (q = q.next);
//         return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
//       });
//     }
//   }

//   force.initialize = _ => maxRadius = d3.max(nodes = _, d => d.r) + Math.max(padding1, padding2);

//   return force;
// }
// )});
//   return main;
// }

import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import define from "https://api.observablehq.com/@kevin110604/moving-bubble-chart-using-d3-js.js?v=3";
new Runtime().module(define, name => {
    if (name === "chart") return new Inspector(document.querySelector("#bubbles"));
});

// var user = 'kevin110604' // our username
// var nbk = 'moving-bubble-chart-using-d3-js' // our notebook name
// async function run(){
// const apistr = `https://api.observablehq.com/@${user}/${nbk}.js?v=3`
//     const notebook = await import(apistr);
//     const define = notebook.default}
//     new Runtime().module(define, Inspector.into(document.body))
// run()
