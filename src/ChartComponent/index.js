import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import Collapsible from 'react-collapsible';
							  


const ChartComponent =(props)=> {
	return(
	    <div className="chartComponent">

	       	<div className='chartContent'>

				<Collapsible trigger={<h2>Line Chart ▼</h2>}
							transitionTime={1000} 
							triggerWhenOpen={<h2>Line Chart ▲</h2>}
							open={true}
							triggerStyle={{background: '#2196f3'}}
							>

					<Line 
						data={props.chartLineData}
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
		    </div>
		    <div className='chartContent'>
		        <Collapsible 
		        			trigger={<h2>Bar Chart ▼</h2>}
		        			transitionTime={1000} 
		        			triggerWhenOpen={<h2>Bar Chart ▲</h2>}
		        			>
			        <Bar
			        	data={props.chartBarData}
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
		    <div className='chartContent'>
		        <Collapsible 
		        			trigger={<h2>Pie Chart ▼</h2>}
		        			transitionTime={1000} 
		        			triggerWhenOpen={<h2>Pie Chart ▲</h2>}
		        			>
			        <Pie
			        	data={props.chartBarData}
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
		    
        </div>
	)
}	



export default ChartComponent;