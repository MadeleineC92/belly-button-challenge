// install d3 library
let data;
function init(){
d3.json("samples.json").then(response => {
    data = response;
    let names = data.names;
    let samples = data.samples;
    console.log(data);
    
    let dropdownEl = d3.select("#selDataset");
    
    names.forEach(name => {
        dropdownEl.append("option").text(name);
    });
    
    optionChanged(names[0]);
});
}

function hbar(sample_id) {
    // d3.json("samples.json").then((data) => {
        let samples = data.samples.find(item => item.id == sample_id);
        console.log(samples);
        
        let data1 = [{
            type: 'bar',
            x: samples.sample_values.slice(0, 10).reverse(),
            y: samples.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            orientation: 'h',
            text:samples.otu_labels.slice(0, 10).reverse(),
        }];
        // console.log(data1);
        
                
        Plotly.newPlot('bar', data1);
    // });
}



function bubble(sample_id) {
    // d3.json("samples.json").then((data) => {
        let samples = data.samples.find(item => item.id == sample_id);
        console.log(samples);
        
        let datab = [{
            x:samples.otu_ids, 
            y: samples.sample_values,
            mode: 'markers',
            text:samples.otu_labels,
            marker: {
                size:samples.sample_values,
                color:samples.otu_ids                
            }
        }];
        
                
        let layout = {
            title: 'Marker Size',
            showlegend: false,
            // height: 600,
            // width: 600
        };
        
        Plotly.newPlot('bubble', datab, layout);
    // });
}



function meta(sample_id) {
    
    let metad = data.metadata.find(item => item.id == sample_id);
    console.log(metad);
    
    let demiEL = d3.select("#sample-metadata");
    demiEL.html("");
    
    Object.entries(metad).forEach(([key, value]) => {
        demiEL.append("div").text(`${key}: ${value}`);
    });

}




function optionChanged(selected_id) {
    hbar(selected_id);
    bubble(selected_id);
    meta(selected_id);
}

init();
