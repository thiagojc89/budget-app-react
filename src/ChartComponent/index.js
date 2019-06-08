import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
							  



class ChartComponent extends React.Component {
	constructor(props){
		super(props)
		// this.state={
		// 	chartData:{
		// 		labels: [],
		// 		datasets:[{
		// 			label: 'COLOR', 
		// 			data:[],
		// 			backgroundColor: [
		// 				'red',
		// 				'green',
		// 				'blue'
		// 			]
		// 		}]
		// 	},
		// }
	}
	// getLabels = ()=>{
	// 	console.log("G I");
	// 	// getting the labels from props
	// 	const labels = this.props.allItens.map(item=> item.name)
	// 	console.log(labels);

	// 	// concat oldlabes with new labels
	// 	const oldLabels = this.state.chartData.labels 
	// 	const allLabels = oldLabels.concat(labels)

	// 	//making a copy of chartData
	// 	const newChartData = this.state.chartData 

	// 	newChartData.labels = allLabels


	// 	const value = this.props.allItens.map(item=> item.value)
	// 	console.log(value);

	// 	const oldValue = this.state.chartData.datasets[0].data
	// 	const allValues = oldValue.concat(value)

	// 	newChartData.datasets[0].data = allValues


	// 	this.setState({
	// 		chartData: newChartData
	// 	})
	// }

	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log("S C U");

	// 	let flag = false 

	// 	nextProps.allItens.forEach((item, i) => {
	// 		if (item.name !== this.state.chartData.labels[i]) {
	// 			flag = true
	// 		}
	// 	})

	// 	if(flag) {
	// 		this.getLabels()
	// 	}
	// 	return flag
	// }

	render() {
		console.log("RENDERING")
		console.log("chart props:");
		console.log(this.props);
		return(
			    <div className="chartComponent">
			    	<div className="chart">
				        <p>chartComponent</p>
				        <Bar
				        	data={this.props.chartData}
				     //    	width={100}
  							// height={50}
				        	options={{
				        		legend: {
	                        	    display: false,
	                            	fontColor: 'green'
                        			},
                        		responsive: true,
                        		maintainAspectRatio: true,
                        		scales: {
                            		yAxes: [{
                                		ticks: {
                                    		beginAtZero:true,
                                    		stepSize: 100
                                			}
                            			}]
                        			}
                        		}
                        	}

				        />
				      </div>
		        </div>
		)
	}	
}

export default ChartComponent;