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
        .text(d => format(d.value) + "%");

        group.selectAll("dots")
          .data(props.data)
          .enter()
          .append("circle")
            .attr("cx", 140)
            .attr("cy", function(d,i){ return i*25 - 75})
            .attr("r", 7)
            .attr("fill", (d, i) => colors(i));


        group.selectAll("labels")
            .data(props.data)
            .enter()
            .append("text")
            .attr("x", 160)
            .attr("y", function(d,i){ return i*25 - 75})
            .attr("fill", (d, i) => colors(i))
            .text(d => d.label)
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");

        group.selectAll("desc")
            .data(props.data)
            .enter()
            .append("text")
            .attr("x", 260)
            .attr("y", 0)
            // .attr("fill", (d, i) => colors(i))
            .text(props.desc)
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");

        // const datetime = d3.select(ref.current);
        //
        // datetime.selectAll("datetime")
        //     .data(props.data)
        //     .enter()
        //     .append("text")
        //     .attr("x", 220)
        //     .attr("y", 100)
        //     .text(new Date().toString())
        //     .style("float", "end");

    },
    [props.data]
  );

  return (
    <div>
        <svg width={"100%"} height={200}>
          <g
            ref={ref}
            transform={`translate(${props.outerRadius} ${props.outerRadius})`}
          />
        </svg>
    </div>
  );
};

export default PieChart;