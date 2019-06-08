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
	    	chartData:{
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
	    }
	}
	getLabels = ()=>{
		console.log("G I");
		// getting the labels from state
		const labels = this.state.allItens.map(item=> item.name)
		console.log(labels);

		// concat oldlabes with new labels
		const oldLabels = this.state.chartData.labels 
		const allLabels = oldLabels.concat(labels)

		//making a copy of chartData
		const newChartData = this.state.chartData 

		newChartData.labels = allLabels


		const value = this.state.allItens.map(item=> item.value)
		console.log(value);

		const oldValue = this.state.chartData.datasets[0].data
		const allValues = oldValue.concat(value)

		newChartData.datasets[0].data = allValues

		console.log('get labes in MainComponent');
		console.log(newChartData);
		this.setState({
			chartData: newChartData
		})
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

   			// this causes infinite update
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

   			console.log("G I");
			// getting the labels from state
			const labels = parsedResponse.map(item=> item.name)
			console.log(labels);

			// concat oldlabes with new labels
			// const oldLabels = this.state.chartData.labels 
			// const allLabels = oldLabels.concat(labels)

			//making a copy of chartData
			const newChartData = this.state.chartData 

			newChartData.labels = labels


			const values = parsedResponse.map(item=> item.value)
			console.log(values);

			// const oldValue = this.state.chartData.datasets[0].data
			// const allValues = oldValue.concat(value)

			newChartData.datasets[0].data = values

			console.log('get labes in MainComponent');
			console.log(newChartData);


			this.setState({
				hideChart: false,
				allItens: parsedResponse,
				chartData: newChartData
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
				    
				    {this.state.hideChart?<NewItemForm createItens={this.createItens}/>:<ChartComponent allItens={this.state.allItens} chartData={this.state.chartData}/>}

				    <div className="menuComponent">
				        <p>menuComponent</p>
			        </div>
		      	</div>
      		</div>
    	);
  	}
}
export default MainComponent;
