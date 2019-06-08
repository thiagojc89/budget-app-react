import React from 'react';
import ItemComponent from '../ItemComponent'
import ChartComponent from '../ChartComponent'
import NewItemForm from '../NewItemForm'



class MainComponent extends React.Component {
	constructor(props){
		super();
	    this.state = {
	    	budget_id:'',
	    	itens:[],
	    	allItens:[],
	    	hideChart: false,
	    	chartLineData:{},
	    	chartBarData:{}
	    }
	}
	formatBarChart = (allItens)=>{
		
		const chartBarData = {
			labels: [],
			datasets:[{
				label: 'COLOR', 
				data:[],
				backgroundColor: [
					'red',
					'green',
					'blue'
				]
			}]
		}

		// getting the labels from allItens argument
		const labels = allItens.map(item=> item.name)
		console.log(labels);

		// getting the value from allItens argument
		const values = allItens.map(item=> item.value)
		console.log(values);

		chartBarData.labels = labels
		chartBarData.datasets[0].data = values


		return chartBarData

	}
	formatLineChart = (allItens)=>{
		
		const chartLineData = {
			labels: [],
			datasets:[{
				label: 'COLOR',
				fill:true,
				lineTension: 0.1,
		      	backgroundColor: 'rgba(75,192,192,0.4)',
		      	borderColor: 'rgba(75,192,192,1)',
		      	borderCapStyle: 'butt',
		      	borderDash: [],
		      	borderDashOffset: 0.0,
		      	borderJoinStyle: 'miter',
		      	pointBorderColor: 'rgba(75,192,192,1)',
		      	pointBackgroundColor: '#fff',
		      	pointBorderWidth: 5,
		      	pointHoverRadius: 10,
		      	pointHoverBackgroundColor: 'rgba(75,192,192,1)',
		      	pointHoverBorderColor: 'rgba(220,220,220,1)',
		      	pointHoverBorderWidth: 2,
		      	// pointRadius: 1,
		      	pointHitRadius: 10,
				data:[],
			},{
				label: 'COLOR',
				fill:true,
				data:[],
			}
			]
		}

		// getting the labels from allItens argument
		const paymentDates = allItens.map(item=> item.payment_date)
		console.log(paymentDates);

		// getting the value from allItens argument
		const values = allItens.map(item=> item.value)
		console.log(values);

		chartLineData.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
		chartLineData.datasets[0].data = [65, 59, 80, 81, 56, 55, 40]
		chartLineData.datasets[1].data = [60, 50, 90, 71, 50, 55, 45]


		return chartLineData

	}
	componentDidMount(){
		this.getitens()
		// this.getLabels()
	}
	hideChart = (e)=>{
		e.preventDefault()
		this.setState({
			hideChart: true
		})
	}
  	createItens = async (item)=> {


  	  	try{
  	  		const newItem = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/user/budgetitem', {
	  	  		method: 'POST',
			    credentials: 'include',
			    body: JSON.stringify(item),
			    headers: {
	          		'Content-Type': 'application/json'
        		}
   			});

   			const parsedResponse = await newItem.json();

   			console.log('this is my new item >>>> ',parsedResponse);
   			this.getitens()

			this.setState({
				hideChart: false,
			})
  	  	}
  	  	catch(err){
  	  		console.log(err)
  	  	}
  	}
  	getitens = async (item)=> {


  	  	try{
  	  		const allitens = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/user/budgetitem', {
			    credentials: 'include'
			});

   			const parsedResponse = await allitens.json();

   			console.log(parsedResponse,'parsedResponse of getitens in MainComponent');

   			const chartBarData =  this.formatBarChart(parsedResponse)
   			const chartLineData =  this.formatLineChart(parsedResponse)


			this.setState({
				hideChart: false,
				allItens: parsedResponse,
				chartBarData: chartBarData,
				chartLineData: chartLineData
			})
  	  	}
  	  	catch(err){
  	  		console.log(err)
  	  	}
  	}
  	render() {
    		console.log(this.state,'this.state inside the render of MainComponent ');
    	return (
      		<div className="MainComponent">
		    <h4>MainComponent HERE!!!</h4>
		      	<div className="main-container">
			        
			        <ItemComponent hideChart={this.hideChart} allItens={this.state.allItens}/>
				    
				    {this.state.hideChart?
				    	<NewItemForm createItens={this.createItens}/>
				    	:
				    	<ChartComponent allItens={this.state.allItens} 
				    					chartBarData={this.state.chartBarData}
				    					chartLineData={this.state.chartLineData}/>}

				    <div className="menuComponent">
				        <p>menuComponent</p>
			        </div>
		      	</div>
      		</div>
    	);
  	}
}
export default MainComponent;
