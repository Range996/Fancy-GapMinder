const svg = d3.select('#svg');
const width = +svg.style('width').replace('px', '');
const height = +svg.style('height').replace('px', '');


const margin = { top: 90, bottom: 90, right: 90, left: 108 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

//Store the regionData dataset to this var
var countriesRegionData = [];
//Store the GDP Per Capital dataset to this var
var gdpPerCapitalData = [];
//Store the Life Expectancy dataset to this var
var lifeExpectancyData = [];
//Store the Child Mortality dataset to this var
var childMortalityData = [];
//Store the Total Population dataset to this var
var totalPopulationData = [];


//this array will store the currently select X attribute's values
//when a new X attribute is selected, the values are updated
var XAttributeData = [];

//this array will store the currently select Y attribute's values
//when a new Y attribute is selected, the values are updated
var YAttributeData = [];

//this array will store the currently select region's values
//when a new region is selected, the values are updated
var RegionData = [];

let svg1 = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

const currentXAttribute = d3.select('#x-attribute').property('value');
const currentYAttribute = d3.select('#y-attribute').property('value');
const currentRegion = d3.select('#region').property('value');
var year = d3.select('#year-input').property('value');


console.log(`x = ${currentXAttribute}, y = ${currentYAttribute}, region = ${currentRegion}, year = ${year}`);


var regions = ['southAsia', 'europe', 'middleEast', 'africa', 'latinAmerica', 'EastAsia', 'northAmerica'];
var region = 'South Asia';

var attributes = ['gdpPerCapital', 'lifeExpectancy', 'childMortality', 'populationTotal'];


const xAttributeGDPData = [];
const xAttributeChildMortalityData = [];
const xAttributeLifeExpectancyData = [];
const xAttributeTotalPopulationData = []
const yAttributeGDPData = [];
const yAttributeChildMortalityData = [];
const yAttributeLifeExpectancyData = [];
const yAttributeTotalPopulationData = []


var xScale = d3.scaleLinear();
var yScale = d3.scaleLinear();
var xAxis;
var yAxis;

var XLabel = '';
var YLabel = '';
var xAxisLabel;
var yAxisLabel;


d3.csv('data/countries_regions.csv').then(function (data) {

    countriesRegionData = data;
    countriesRegionData.forEach(function (d) {
        d.geo = d["geo"];
        d.name = d["name"];
        d.region = d["World bank region"];
    });

    region = 'South Asia';
    console.log(region);

    countriesRegionData.forEach(d => {
        if (d.region == region) {
            RegionData.push({ geo: d.geo, name: d.name, region: d.region });
        }
    });
    console.log(`Firstshow RegionData = `, RegionData);


});

d3.csv('data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv').then(data => {

    var localGdpData = data;
    for (i = 1800; i < 2041; i++) {
        localGdpData.forEach(d => {
            d.country = d["country"];
            d[i] = +d[i];

        })
    }
    for (i = 1800; i < 2041; i++) {
        localGdpData.forEach(d => {
            gdpPerCapitalData.push({ country: d.country, year: i, gdp: d[i] });
            XAttributeData.push({ country: d.country, year: i, xattribute: d[i] });
            xAttributeGDPData.push({ country: d.country, year: i, xattribute: d[i] });
            yAttributeGDPData.push({ country: d.country, year: i, yattribute: d[i] });
        })
    }

    //console.log(`gdpPerCapitalData = `, gdpPerCapitalData);


    xScale.domain([0, d3.max(gdpPerCapitalData, function (d) {
        return d.gdp
    })])
        .range([0, innerWidth]);
    xAxisLabel = svg1.append('text')
        .attr('class', 'xLabel')
        .attr('class', 'axis-label')
        .attr('text-anchor', 'middle')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight + 50)
        .text('GDP Per Capital')
    xAxis = d3.axisBottom(xScale);


    svg1.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .attr("class", "x axis")
        .call(xAxis);


});

d3.csv('data/population_total.csv').then(data => {
    var localPopData = data;
    for (i = 1800; i < 2041; i++) {
        localPopData.forEach(d => {
            d.country = d["country"];
            d[i] = +d[i];
        })
    }
    for (i = 1800; i < 2041; i++) {
        localPopData.forEach(d => {
            totalPopulationData.push({ country: d.country, year: i, pop: d[i] });
            YAttributeData.push({ country: d.country, year: i, yattribute: d[i] });
            xAttributeTotalPopulationData.push({ country: d.country, year: i, xattribute: d[i] });
            yAttributeTotalPopulationData.push({ country: d.country, year: i, yattribute: d[i] });
        })
    }

    //console.log(`totalPopulationData = `, totalPopulationData);


    yScale.domain([0, d3.max(totalPopulationData, function (d) {
        return d.pop
    })])
        .range([innerHeight, 0]);



    yAxisLabel = svg1.append('text')
        .attr('class', 'yLabel')
        .attr('transform', 'rotate(-90)')
        .attr('dy', -40)
        .attr('dx', -200)
        .style('text-anchor', 'end')
        .text('Total Population')

    yAxis = d3.axisLeft(yScale);

    svg1.append('g')
        .attr('class', 'y axis')
        .call(yAxis);


})

d3.csv('data/life_expectancy_years.csv').then(data => {
    var localLifeExpectData = data;
    for (i = 1800; i < 2041; i++) {
        localLifeExpectData.forEach(d => {
            d.country = d["country"];
            d[i] = +d[i];
        })
    }
    for (i = 1800; i < 2041; i++) {
        localLifeExpectData.forEach(d => {
            lifeExpectancyData.push({ country: d.country, Year: i, life_expect: d[i] });
            xAttributeLifeExpectancyData.push({ country: d.country, year: i, xattribute: d[i] });
            yAttributeLifeExpectancyData.push({ country: d.country, year: i, yattribute: d[i] });
        })
    }
    //console.log(`lifeExpectancyData = `, lifeExpectancyData);

})

d3.csv('data/child_mortality_0_5_year_olds_dying_per_1000_born.csv').then(data => {
    var localChildMortalityData = data;
    for (i = 1800; i < 2041; i++) {
        localChildMortalityData.forEach(d => {
            d.country = d["country"];
            d[i] = +d[i];
        })
    }
    for (i = 1800; i < 2041; i++) {
        localChildMortalityData.forEach(d => {
            childMortalityData.push({ country: d.country, Year: i, child_mortality: d[i] });
            xAttributeChildMortalityData.push({ country: d.country, year: i, xattribute: d[i] });
            yAttributeChildMortalityData.push({ country: d.country, year: i, yattribute: d[i] });
        })
    }
    console.log(`childMortalityData = `, childMortalityData);
    console.log(`yAttributeChildMortalityData = `, yAttributeChildMortalityData);

})



function updateAxis() {
    const currentXAttribute = d3.select('#x-attribute').property('value');
    const currentYAttribute = d3.select('#y-attribute').property('value');



    console.log(`currentXAttribute = ${currentXAttribute}`);
    console.log(`currentYAttribute = ${currentYAttribute}`)



    if (currentXAttribute == attributes[0]) {
        XAttributeData = [];
        XAttributeData = xAttributeGDPData;
        XLabel = 'GDP Per Capital';
    } else if (currentXAttribute == attributes[1]) {
        XAttributeData = [];
        XAttributeData = xAttributeLifeExpectancyData;
        XLabel = 'Life Expectancy';
    } else if (currentXAttribute == attributes[2]) {
        XAttributeData = [];
        XAttributeData = xAttributeChildMortalityData;
        XLabel = 'Child Mortality';
    } else if (currentXAttribute == attributes[3]) {
        XAttributeData = [];
        XAttributeData = xAttributeTotalPopulationData;
        XLabel = 'Total Population';
    }


    if (currentYAttribute == attributes[0]) {
        YAttributeData = [];
        YAttributeData = yAttributeGDPData;
        YLabel = 'GDP Per Capital';
    } else if (currentYAttribute == attributes[1]) {
        YAttributeData = [];
        YAttributeData = yAttributeLifeExpectancyData;
        YLabel = 'Life Expectancy';
    } else if (currentYAttribute == attributes[2]) {
        YAttributeData = [];
        YAttributeData = yAttributeChildMortalityData;
        YLabel = 'Child Mortality';
    } else if (currentYAttribute == attributes[3]) {
        YAttributeData = [];
        YAttributeData = yAttributeTotalPopulationData;
        YLabel = 'Total Population';

    }
    xScale.domain([0, d3.max(XAttributeData, d => d.xattribute)])
        .range([0, innerWidth]);

    console.log(XAttributeData, d => d.xattribute);

    yScale.domain([0, d3.max(YAttributeData, d => d.yattribute)])
        .range([innerHeight, 0]);

    svg1.select(".x.axis")
        .transition()
        .duration(2000)
        .call(xAxis);
    svg1.select(".y.axis")
        .transition()
        .duration(2000)
        .call(yAxis.bind(this));

    xAxisLabel.transition()
        .duration(2000)
        .text(XLabel);

    yAxisLabel.transition()
        .duration(3000)
        .text(YLabel);

    updateGapMinder();


}




function updateRegion() {
    RegionData = [];
    const currentRegion = d3.select('#region').property('value');
    for (var i = 0; i < regions.length; i++) {
        if (currentRegion == regions[0])
            region = 'South Asia';

        else if (currentRegion == regions[1])
            region = 'Europe & Central Asia';

        else if (currentRegion == regions[2])
            region = 'Middle East & North Africa';

        else if (currentRegion == regions[3])
            region = 'Sub-Saharan Africa';

        else if (currentRegion == regions[4])
            region = 'Latin America & Caribbean';

        else if (currentRegion == regions[5])
            region = 'East Asia & Pacific';

        else if (currentRegion == regions[6])
            region = 'North America';
    }
    console.log(region);

    countriesRegionData.forEach(d => {
        if (d.region == region) {
            RegionData.push({ geo: d.geo, name: d.name, region: d.region });
        }
    });
    console.log(RegionData);
    updateGapMinder();



}


function toggleRestart() {
    const updatedLabel = 'Restart';
    d3.select('#toggle-button').attr('value', updatedLabel);

}

function toggleAnimation() {
    const currentState = d3.select('#toggle-button').attr('value');
    if (currentState == 'Restart')
        d3.select('#toggle-button').attr('value', 'Stop')
    else {
        var updatedLabel = '';
        if (currentState == 'Play') {
            updatedLabel = 'Stop';
        }
        else {
            updatedLabel = 'Play';

        }
        d3.select('#toggle-button').attr('value', updatedLabel)
        updateGapMinder();
    }

}





function updateGapMinder() {

    const currentXAttribute = d3.select('#x-attribute').property('value');
    const currentYAttribute = d3.select('#y-attribute').property('value');
    year = d3.select('#year-input').property('value');


    const yearData = [];
    if (region == 'South Asia') {
        RegionData.forEach(regiondata => {
            XAttributeData.forEach(xdata => {
                if (xdata.country == regiondata.name) {

                    YAttributeData.forEach(ydata => {
                        if (ydata.country == regiondata.name && xdata.year == year && ydata.year == year) {
                            yearData.push({ name: xdata.country, year: year, xattribute: xdata.xattribute, yattribute: ydata.yattribute, geo: regiondata.geo, region: regiondata.region });
                            //console.log(`region ${region} set ${xdata.country} symboled as ${regiondata.geo} in ${year}, xattribute is ${xdata.xattribute} and y attribute is ${ydata.yattribute}`);
                        }
                    })
                }
            })
        })
    }
    else if (region == 'Europe & Central Asia') {
        RegionData.forEach(regiondata => {
            XAttributeData.forEach(xdata => {
                if (xdata.country == regiondata.name) {

                    YAttributeData.forEach(ydata => {
                        if (ydata.country == regiondata.name && xdata.year == year && ydata.year == year) {
                            yearData.push({ name: xdata.country, year: year, xattribute: xdata.xattribute, yattribute: ydata.yattribute, geo: regiondata.geo, region: regiondata.region });
                            //console.log(`region ${region} set ${xdata.country} symboled as ${regiondata.geo} in ${year}, xattribute is ${xdata.xattribute} and y attribute is ${ydata.yattribute}`);
                        }
                    })
                }
            })
        })
    }
    else if (region == 'Middle East & North Africa') {
        RegionData.forEach(regiondata => {
            XAttributeData.forEach(xdata => {
                if (xdata.country == regiondata.name) {

                    YAttributeData.forEach(ydata => {
                        if (ydata.country == regiondata.name && xdata.year == year && ydata.year == year) {
                            yearData.push({ name: xdata.country, year: year, xattribute: xdata.xattribute, yattribute: ydata.yattribute, geo: regiondata.geo, region: regiondata.region });
                            //console.log(`region ${region} set ${xdata.country} symboled as ${regiondata.geo} in ${year}, xattribute is ${xdata.xattribute} and y attribute is ${ydata.yattribute}`);
                        }
                    })
                }
            })
        })
    }
    else if (region == 'Sub-Saharan Africa') {
        RegionData.forEach(regiondata => {
            XAttributeData.forEach(xdata => {
                if (xdata.country == regiondata.name) {

                    YAttributeData.forEach(ydata => {
                        if (ydata.country == regiondata.name && xdata.year == year && ydata.year == year) {
                            yearData.push({ name: xdata.country, year: year, xattribute: xdata.xattribute, yattribute: ydata.yattribute, geo: regiondata.geo, region: regiondata.region });
                            //console.log(`region ${region} set ${xdata.country} symboled as ${regiondata.geo} in ${year}, xattribute is ${xdata.xattribute} and y attribute is ${ydata.yattribute}`);
                        }
                    })
                }
            })
        })
    }
    else if (region == 'Latin America & Caribbean') {
        RegionData.forEach(regiondata => {
            XAttributeData.forEach(xdata => {
                if (xdata.country == regiondata.name) {

                    YAttributeData.forEach(ydata => {
                        if (ydata.country == regiondata.name && xdata.year == year && ydata.year == year) {
                            yearData.push({ name: xdata.country, year: year, xattribute: xdata.xattribute, yattribute: ydata.yattribute, geo: regiondata.geo, region: regiondata.region });
                            //console.log(`region ${region} set ${xdata.country} symboled as ${regiondata.geo} in ${year}, xattribute is ${xdata.xattribute} and y attribute is ${ydata.yattribute}`);
                        }
                    })
                }
            })
        })
    }
    else if (region == 'East Asia & Pacific') {
        RegionData.forEach(regiondata => {
            XAttributeData.forEach(xdata => {
                if (xdata.country == regiondata.name) {

                    YAttributeData.forEach(ydata => {
                        if (ydata.country == regiondata.name && xdata.year == year && ydata.year == year) {
                            yearData.push({ name: xdata.country, year: year, xattribute: xdata.xattribute, yattribute: ydata.yattribute, geo: regiondata.geo, region: regiondata.region });
                            //console.log(`region ${region} set ${xdata.country} symboled as ${regiondata.geo} in ${year}, xattribute is ${xdata.xattribute} and y attribute is ${ydata.yattribute}`);
                        }
                    })
                }
            })
        })
    }
    else if (region == 'North America') {
        RegionData.forEach(regiondata => {
            XAttributeData.forEach(xdata => {
                if (xdata.country == regiondata.name) {

                    YAttributeData.forEach(ydata => {
                        if (ydata.country == regiondata.name && xdata.year == year && ydata.year == year) {
                            yearData.push({ name: xdata.country, year: year, xattribute: xdata.xattribute, yattribute: ydata.yattribute, geo: regiondata.geo, region: regiondata.region });
                            //console.log(`region ${region} set ${xdata.country} symboled as ${regiondata.geo} in ${year}, xattribute is ${xdata.xattribute} and y attribute is ${ydata.yattribute}`);
                        }
                    })
                }
            })
        })
    }






    if (d3.select('#toggle-button').attr('value') == 'Stop') {

        console.log(yearData);
        svg1.selectAll('.glyph')
            .data(yearData,d => d.name)
            .join(
                enter => {
                    const g = enter.append('g')
                        .attr('class', 'glyph')
                        .attr('transform', d => `translate(${xScale(d.xattribute)},-20)`);

                    g.append('circle')
                        .attr('fill', function (d) { return regionColor(d.region) })
                        .style('stroke', 'black')
                        .attr('r', 0)

                    g.append('text')
                        .style('text-anchor', 'middle')
                        .style('alignment-baseline', 'auto')
                        .style('font-size', '0em')
                        .text(d => d.geo);

                    g.call(enter => {
                        enter.selectAll('text')
                            .transition()
                            .delay(1500)
                            .duration(500)
                            .style('font-size', '0.8em');
                        enter.selectAll('circle')
                            .transition()
                            .delay(1500)
                            .duration(500)
                            .attr('r', 16);
                        enter.transition()
                            .delay(1500)
                            .duration(500)
                            .attr('transform', d => `translate(${xScale(d.xattribute)},${yScale(d.yattribute)})`);
                    })

                },
                update => {
                    update.call(g => g.transition()
                        .delay(500)
                        .duration(1000)
                        .attr('transform', d => `translate(${xScale(d.xattribute)},${yScale(d.yattribute)})`))

                },
                exit => {
                    exit.selectAll('text')
                        .transition()
                        .duration(500)
                        .style('font-size', '0em')
                    exit.selectAll('circle')
                        .transition()
                        .duration(500)
                        .attr('r', 0)
                    exit.call(g => g.transition()
                        .attr('transform', d => `translate(${xScale(d.xattribute)},200)`))
                }

            )
        year = +(year) + 1;
    }


}





function changeTheYear() {
    var currentyear = d3.select('#year-input').property('value');
    if (currentyear < 2041 && currentyear > 1799) {
        var updateYear = +(currentyear) + 1;
        d3.select('#year-input').attr('value', updateYear);
        year = d3.select('#year-input').property('value');

        // updateGapMinder();

    }

}

function regionColor(region) {
    if (region == 'South Asia') {
        return 'lightgreen';
    }
    else if (region == 'Europe & Central Asia') {
        return 'red';
    }
    else if (region == 'Middle East & North Africa') {
        return 'orange';
    }
    else if (region == 'Sub-Saharan Africa') {
        return 'lightblue';
    }
    else if (region == 'Latin America & Caribbean') {
        return 'lightyellow';
    }
    else if (region == 'East Asia & Pacific') {
        return 'lightblue';
    }
    else if (region == 'North America') {
        return 'lightgrey'
    }
}