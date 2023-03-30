import React, {useEffect, useRef} from "react";
import * as d3 from "d3";

const PieChart = props => {
    const ref = useRef(null);
    const width = 700;
    const height = 400;
    const margin = 60;
    const radius = Math.min(width, height) / 2 - margin;
    const format = d3.format(".2f");
    const total = d3.sum(props.data, (d) => d.value);

    const createPie = d3
        .pie()
        .sort(null)
        .value(d => d.value);

    const createArc = d3
        .arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.8);

    const createOuterArc = d3
        .arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

    const colors = d3.scaleOrdinal(d3.schemeDark2);

    const createLegend = (group) => {
        const legendData = props.data.map((d, i) => ({
            color: colors(i),
            label: d.label,
            amount: d.value,
        }));

        const legend = group
            .selectAll(".legend")
            .data(legendData)
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => `translate(${radius * 1.8}, ${i * 25 - margin * 2})`);

        legend
            .append("rect")
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", (d) => d.color);

        legend
            .append("text")
            .attr("x", 20)
            .attr("y", 11)
            .text((d) => `${d.label} = ${format(d.amount)} lbs`);
    };


    useEffect(() => {
        const data = createPie(props.data);
        const group = d3.select(ref.current);
        const groupWithData = group.selectAll("g.arc").data(data);

        groupWithData.exit().remove();

        const groupWithUpdate = groupWithData
            .enter()
            .append("g")
            .attr("class", "arc");

        // Create paths
        groupWithUpdate
            .append("path")
            .merge(groupWithData.select("path.arc"))
            .attr("class", "arc")
            .attr("d", createArc)
            .attr("fill", (d, i) => colors(i))
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7);

        // Create polylines
        groupWithUpdate
            .append("polyline")
            .merge(groupWithData.select("polyline"))
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 1)
            .attr("points", d => {
                const posA = createArc.centroid(d);
                const posB = createOuterArc.centroid(d);
                const posC = createOuterArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
                return [posA, posB, posC];
            });

        // Create labels
        groupWithUpdate
            .append("text")
            .merge(groupWithData.select("text.label"))
            .text((d) => {
                if (d.data.value === 0) {
                    return "";
                } else {
                    return `${d.data.label} (${format((d.data.value / total) * 100)}%)`;
                }
            })
            .attr("transform", (d) => {
                const pos = createOuterArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return `translate(${pos})`;
            })
            .style("text-anchor", (d) => {
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                return midangle < Math.PI ? "start" : "end";
            })
            .style("font-size", "14px");

        // Create legend
        createLegend(group);


    }, [props.data]);


    return (
        <div>
            <svg width={width} height={height}>
                <g
                    ref={ref}
                    transform={`translate(${width / 2 - margin * 2}, ${height / 2})`}
                />
            </svg>
        </div>
    );
};

export default PieChart;
