import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
							  



class ChartComponent extends React.Component {
	constructor(props){
		super(props)

	}
	render() {
		console.log("chart props:");
		console.log(this.props);
		// console.log('this is my chart');
		// const chart = {
		// 				  labels: ["2019-06-06T00:00:00", "2019-06-08T00:00:00", "2019-06-08T00:00:00", "2019-06-28T00:00:00", "2019-05-27T00:00:00"],
		// 				  datasets: [
		// 				    {
		// 				      label: 'My First dataset',
		// 				      fill: false,
		// 				      lineTension: 0.1,
		// 				      backgroundColor: 'rgba(75,192,192,0.4)',
		// 				      borderColor: 'rgba(75,192,192,1)',
		// 				      borderCapStyle: 'butt',
		// 				      borderDash: [],
		// 				      borderDashOffset: 0.0,
		// 				      borderJoinStyle: 'miter',
		// 				      pointBorderColor: 'rgba(75,192,192,1)',
		// 				      pointBackgroundColor: '#fff',
		// 				      pointBorderWidth: 1,
		// 				      pointHoverRadius: 5,
		// 				      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
		// 				      pointHoverBorderColor: 'rgba(220,220,220,1)',
		// 				      pointHoverBorderWidth: 2,
		// 				      pointRadius: 1,
		// 				      pointHitRadius: 10,
		// 				      data: [300, 310, 415, 665, 690]
		// 				    }
		// 				  ]
		// 				} 
		// console.log(chart);
		return(
		    <div className="chartComponent">
				

		    	<p>chartComponent</p>
		       	
		       	<p>Line Chart</p>
		        <Line
		        	data={this.props.chartLineData}
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

		        <p>Bar Chart</p>
		        <Bar
		        	data={this.props.chartBarData}
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
                            		beginAtZero:false,
                            		stepSize: 50
                        			}
                    			}]
                			}
                		}
                	}

		        />
			    
	        </div>
		)
	}	
}

export default ChartComponent;