import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
							  


class ChartComponent extends React.Component {
	constructor(props){
		super(props)
		this.state={
			chartData:{
				labels:['RED', 'GREEN','BLUE'],
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
	render(){
		return(
			    <div className="chartComponent">
			    	<div className="chart">
				        <p>chartComponent</p>
				        <Line
				        	data={this.state.chartData}
				        	width={100}
  							height={50}
				        	options={{legend: {
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
                        }}}
				        	/>
				      </div>
		        </div>
		)
	}	
}

export default ChartComponent;