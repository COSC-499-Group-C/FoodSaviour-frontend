import React, {useEffect, useRef} from "react";
import * as d3 from "d3";

const PieChart = props => {
    const ref = useRef(null);
    const width = 760;
    const height = 400;
    const margin = 60;
    const radius = Math.min(width, height) / 2 - margin;
    const format = d3.format(".2f");
    const total = d3.sum(props.data, (d) => d.amount);

    const createPie = d3
        .pie()
        .value(d => d.value)
        .sort(null);


    const createArc = d3
        .arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius * 0.8);

    const createOuterArc = d3
        .arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

    const colors = d3.scaleOrdinal(["#a7e846", "#f22c3f", "#1ac8ed", "#1c448e", "#731dd8", "#df99f0", "#87f1ff"]);

    const createLegend = (group) => {
        const legendData = props.data.map((d, i) => ({
            color: colors(i),
            label: d.label,
            amount: d.amount,
            value: d.value,
        }));

        const legend = group
            .selectAll(".legend")
            .data(legendData)
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => `translate(${radius * 2.1}, ${i * 25 - margin * 1.5})`);

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

    const relaxLabels = (textLabels, lines) => {
        const alpha = 0.5;
        const spacing = 15;

        const relax = () => {
            let again = false;
            textLabels.each(function () {
                const a = this;
                const da = d3.select(a);
                const y1 = da.attr("y");
                textLabels.each(function (d, j) {
                    const b = this;
                    if (a === b) {
                        return;
                    }

                    const db = d3.select(b);
                    if (da.attr("text-anchor") !== db.attr("text-anchor")) {
                        return;
                    }

                    const y2 = db.attr("y");
                    const deltaY = y1 - y2;

                    if (Math.abs(deltaY) > spacing) {
                        return;
                    }

                    again = true;
                    const sign = deltaY > 0 ? 1 : -1;
                    const adjust = sign * alpha;
                    da.attr("y", +y1 + adjust);
                    db.attr("y", +y2 - adjust);
                });
            });

            if (again) {
                lines.attr("points", (d, i) => {
                    const posA = createArc.centroid(d);
                    const posB = createOuterArc.centroid(d);
                    const posC = createOuterArc.centroid(d);
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                    posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
                    const labelForLine = d3.select(textLabels.nodes()[i]);
                    const y = labelForLine.attr("y");
                    posC[1] = y;
                    posB[1] = y; // Update the middle point of the polyline based on the new y position
                    return [posA, posB, posC];
                });
                setTimeout(relax, 20);
            }
        };

        relax();
    };


    useEffect(() => {
        const data = createPie(props.data);
        const group = d3.select(ref.current);
        const groupWithData = group.selectAll("g.arc").data(data);

        groupWithData.exit().remove();

        const groupEnter = groupWithData
            .enter()
            .append("g")
            .attr("class", "arc");

        // Paths
        const pathUpdate = groupWithData.select("path.arc");
        const pathEnter = groupEnter
            .append("path")
            .attr("class", "arc")
            .attr("fill", (d, i) => colors(i))
            .attr("stroke", "white")
            .style("stroke-width", "2px");

        // Polylines
        const polylineUpdate = groupWithData.select("polyline");
        const polylineEnter = groupEnter
            .append("polyline")
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 1);

        // Labels
        const labelTextUpdate = groupWithData.select("text.label");
        const labelTextEnter = groupEnter
            .append("text")
            .attr("class", "label")
            .style("text-anchor", (d) => {
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                return midangle < Math.PI ? "start" : "end";
            })
            .style("font-size", "14px");

        // Remove existing legend
        group.selectAll(".legend").remove();

        // Remove existing total amount
        group.selectAll(".total-amount").remove();

        // Create legend
        createLegend(group);

        // Create total amount
        const total_amount = group
            .append("g")
            .attr("class", "total-amount")
            .attr("transform", `translate(${radius * 2.1}, ${7.5 * 25 - margin * 1.5})`);

        total_amount
            .append("text")
            .attr("x", 20)
            .attr("y", 11)
            .attr("class", "fw-bold")
            .text("Total = " + format(total) + " lbs");

        // Transition
        const t = d3.transition().duration(2000);

        // Update and enter paths
        pathUpdate
            .transition(t)
            .attr("d", createArc);

        pathEnter
            .transition(t)
            .attr("d", createArc);

        // Update and enter polylines
        polylineUpdate
            .transition(t)
            .attr("points", d => {
                const posA = createArc.centroid(d);
                const posB = createOuterArc.centroid(d);
                const posC = createOuterArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
                return [posA, posB, posC];
            });

        polylineEnter
            .transition(t)
            .attr("points", d => {
                const posA = createArc.centroid(d);
                const posB = createOuterArc.centroid(d);
                const posC = createOuterArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
                return [posA, posB, posC];
            });

        // Update and enter labels
        labelTextUpdate
            .transition(t)
            .text((d) => {
                if (d.data.value === 0) {
                    return "";
                } else {
                    return `${d.data.label} (${format(d.data.value)}%)`;
                }
            })
            .attr("transform", (d) => {
                const pos = createOuterArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return `translate(${pos})`;
            });

        labelTextEnter
            .transition(t)
            .text((d) => {
                if (d.data.value === 0) {
                    return "";
                } else {
                    return `${d.data.label} (${format(d.data.value)}%)`;
                }
            })
            .attr("transform", (d) => {
                const pos = createOuterArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return `translate(${pos})`;
            });

        relaxLabels(labelTextEnter.merge(labelTextUpdate), polylineEnter.merge(polylineUpdate));


    }, [props.data]);

    return (
        <div>
            <svg width={"100%"} viewBox={"0,0,750,400"}>
                <g
                    ref={ref}
                    transform={`translate(${width / 2 - margin * 2}, ${height / 2})`}
                />
            </svg>
        </div>
    );
};

export default PieChart;
