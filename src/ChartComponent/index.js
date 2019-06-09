import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import Collapsible from 'react-collapsible';
							  


class ChartComponent extends React.Component {
	constructor(props){
		super(props)

	}
	render() {
		console.log("chart props:");
		console.log(this.props);
		return(
		    <div className="chartComponent">
				
		       	
		       	<Collapsible trigger={<h2>Line Chart</h2>}>

			        <Line
			        	data={this.props.chartLineData}
			        	width={900}
	  					height={350}
			        	options={{
			        		legend: {
	                    	    display: true,
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
			    </Collapsible>
		        <Collapsible trigger={<h2>Bar Chart</h2>}>
			        <Bar
			        	data={this.props.chartBarData}
			        	width={900}
	  					height={350}
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
			    </Collapsible>
			    
	        </div>
		)
	}	
}

export default ChartComponent;