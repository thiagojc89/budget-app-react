import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
							  



class ChartComponent extends React.Component {
	constructor(props){
		super(props)
		this.state={
			chartData:{
				labels: [],
				datasets:[
				{
					label:'COLOR', 
					data:[100,200,100],
					backgroundColor:[
						'red',
						'green',
						'blue']
				}]
			},
		}
	}
	getLabels = ()=>{
		const labels = this.props.allItens.map(item=> item.name)
		console.log(labels);

		const oldLabels = this.state.chartData.labels 
		const allLabels = oldLabels.concat(labels)

		console.log("all labels")
		console.log(allLabels);

		const newChartData = this.state.chartData 

		newChartData.labels = allLabels

		this.setState({
			chartData: newChartData
		})
	}
	shouldComponentUpdate(nextProps, nextState){

		let flag = false 

		nextProps.allItens.forEach((item, i) => {
			if (item.name !== this.state.chartData.labels[i]) {
				flag = true
			}
		})

		if (flag) {
			this.getLabels()
		}

		return flag
	}
	render(){
		console.log("RENDERING")
		console.log("chart props:");
		console.log(this.props.allItens);
		console.log("chart state:");
		console.log(this.state);
		return(
			    <div className="chartComponent">
			    	<div className="chart">
				        <p>chartComponent</p>
				        <Bar
				        	data={this.state.chartData}
				     //    	width={100}
  							// height={50}
				        	options={{
				        		legend: {
	                        	    display: false,
	                            	fontColor: 'green'
                        			},
                        		responsive: true,
                        		maintainAspectRatio: false,
                        		scales: {
                            		yAxes: [{
                                		ticks: {
                                    		beginAtZero:true,
                                    		stepSize: 50
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