import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = props => {
  const ref = useRef(null);
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(".2f");

  useEffect(
    () => {
      const data = createPie(props.data);
      const group = d3.select(ref.current);
      const groupWithData = group.selectAll("g.arc").data(data);

      groupWithData.exit().remove();

      const groupWithUpdate = groupWithData
        .enter()
        .append("g")
        .attr("class", "arc");

      const path = groupWithUpdate
        .append("path")
        .merge(groupWithData.select("path.arc"));

      path
        .attr("class", "arc")
        .attr("d", createArc)
        .attr("fill", (d, i) => colors(i));

      const text = groupWithUpdate
        .append("text")
        .merge(groupWithData.select("text"));

      text
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("transform", d => `translate(${createArc.centroid(d)})`)
        .style("fill", "white")
        .style("font-size", 10)
        .text(d => format(d.value));
    },
    [props.data]
  );

var legend = d3.select("#legend");

legend.selectAll("mydots")
  .data(props.data)
  .enter()
  .append("circle")
    .attr("cx", 100)
    .attr("cy", function(d,i){ return 25 + i*25})
    .attr("r", 7)
    .attr("fill", (d, i) => colors(i));


legend.selectAll("mylabels")
  .data(props.data)
  .enter()
  .append("text")
    .attr("x", 120)
    .attr("y", function(d,i){ return 25 + i*25})
    .attr("fill", (d, i) => colors(i))
    .text(d => d.label)
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle");

const datetime = new Date();
d3.select("#datetime").text(datetime.toString());

  return (
    <div>
        <svg width={props.width} height={props.height}>
          <g
            ref={ref}
            transform={`translate(${props.outerRadius} ${props.outerRadius})`}
          />
        </svg>
        <svg id="legend" width={props.width} height={props.height}></svg>
        <p id="datetime" className="mt-3 mb-0 float-end small"></p>
    </div>
  );
};

export default PieChart;