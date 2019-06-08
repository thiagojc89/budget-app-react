import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
							  



class ChartComponent extends React.Component {
	constructor(props){
		super(props)

	}
	handleClick(e){
		e.preventDefault()
		console.log('click');
	}
				// <h1 onClick={this.handleClick}>
	   //  	  		Click me
	   //  		</h1>
	render() {
		console.log("RENDERING")
		console.log("chart props:");
		console.log(this.props);
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
                            		beginAtZero:false,
                            		stepSize: 5
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
                            		beginAtZero:true,
                            		stepSize: 100
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