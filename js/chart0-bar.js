$(function() {

    var svg = d3.select(".chart0-bar")
        .append("div")
        .classed("svg-container", true)
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 1400 560")
        .attr("width", 1400)
        .attr("height", 560),
        margin = {
            top: 30,
            right: 100,
            bottom: 30,
            left: 100
        };

    var width = +1400 - margin.left - margin.right,
        height = +560 - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseTime = d3.timeParse("%Y-%m-%d");
    var x = d3.scaleTime()
        .rangeRound([0, width])

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range(["#6699ff", "#6b486b", "#98abc5", "#ccff66", "#CDAF95", "#E9967A", "#6b486b", "#6b486b", "#6b486b"]);

    d3.csv("data/dataF.csv", function(d) {
        d.date = parseTime(d.date);
        return d;
    }, function(error, data) {
        if (error) throw error;
        var keys = data.columns.slice(1);
        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([-300000, +300000]);
        z.domain(keys);
        g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(data))
            .enter().append("g")
            .attr("fill", function(d) {
                return z(d.key);
            })
            .selectAll("rect")
            .data(function(d) {

                return d;
            })
            .enter().append("rect")
            .attr("x", function(d) {
                return x(d.data.date);
            })
            .attr("y", function(d) {
                return y(1 + d[1]);
            })
            .attr("height", function(d) {
                return (y(1 + d[0]) - y(1 + d[1]));
            })
            .attr("width", 1.5);

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .attr("stroke", "#cfcfcf")
            .select('.domain')
            .remove();

        g.append("g")
            .attr("class", "axis")
            .attr("stroke", "#cfcfcf")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#cccccc")
            .attr("text-anchor", "start")
            .text("Box office(¥10,000)");
    })

    var z2 = d3.scaleOrdinal()
        .range(["#ff8c00", "#ffcc66", "#ffffcc"]);
    d3.csv("data/dataC.csv", function(d) {
        d.date = parseTime(d.date);
        return d;
    }, function(error, data) {
        if (error) throw error;
        var keys = data.columns.slice(1);
        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([-300000, +300000]);
        z2.domain(keys);
        d3.select("#svg0 g").append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(data))
            .enter().append("g")
            .attr("fill", function(d) {
                return z2(d.key);
            })
            .selectAll("rect")
            .data(function(d) {
                return d;
            })
            .enter().append("rect")
            .attr("x", function(d) {
                return x(d.data.date);
            })
            .attr("y", function(d) {
                return y(-1 - d[1]) - (y(1 + d[0]) - y(1 + d[1]));
            })
            .attr("height", function(d) {
                return (y(1 + d[0]) - y(1 + d[1]));
            })
            .attr("width", 1);
    })
})