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
	fibArray = (arr)=>{
		// this function gets an array of number as argument and return an array with the fibonacci for every number in the array using the sequence of the array 
		//  for example if we send a array [9,8,7,6] it will return [9, 17, 24, 30]

		const newArray = arr
		arr.forEach((num, index)=>{

			if (index === 0){
				newArray.splice(index,1,parseInt(num))
			}
			else{
				newArray.splice(index,1,parseInt(num)+parseInt(arr[index-1]))
			}

		})

		return newArray
	}
	fibBalance = (arr)=>{
		// this function gets an array of number as argument and return an array with the fibonacci for every number in the array using the sequence of the array 
		//  for example if we send a array [9,8,7,6] it will return [9, 17, 24, 30]

		const newArray = arr
		arr.forEach((num, index)=>{

			if (index === 0){
				newArray.splice(index,1,parseInt(num))
			}
			else{
				newArray.splice(index,1,parseInt(num)+parseInt(arr[index-1]))
			}

		})

		return newArray
	}
	formatLineChart = (allItens)=>{
		
		const chartLineData = {
			labels: [],
			datasets:[]
		}

		class DatasetsTemplate{
			constructor(datasets){
			}
			labels = []
			datasets =
			{
		      // label: 'My First dataset',
		      fill: false,
		      lineTension: .4,
		      borderColor: 'rgba(75,92,92,1)',
		      pointBorderWidth: 10,
		      pointHoverRadius: 10,
		      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
		      pointRadius: 2,
		      pointHitRadius: 10,
		      steppedLine: false,
		      data: []
			}

		}

		const expenses = new DatasetsTemplate()
		expenses.datasets.borderColor = 'rgba(225,0,0,.7)'
		const deposits = new DatasetsTemplate()
		deposits.datasets.borderColor = 'rgba(0,0,225,.7)'
		const balance = new DatasetsTemplate()
		balance.datasets.borderColor = 'rgba(0,225,0,.7)'
		balance.datasets.steppedLine = true

		allItens.forEach((item, i)=>{
			chartLineData.labels.push(item.payment_date)
			
			console.log(item.transaction);
			
			if (item.transaction==='expense'){
				
				if (i === 0){
					
					deposits.datasets.data.push(0)	
					expenses.datasets.data.push(parseInt(item.value))
					balance.datasets.data.push(parseInt(item.value))
				}
				else{
					expenses.datasets.data.push(parseInt(item.value) + expenses.datasets.data[i-1])
					deposits.datasets.data.push(deposits.datasets.data[i-1])
					balance.datasets.data.push(balance.datasets.data[i-1] - parseInt(item.value))
				}
			
			}
			if (item.transaction==='deposit') {
				// deposits.labels.push(item.payment_date)

				if (i === 0 ){
					expenses.datasets.data.push(0)		
					deposits.datasets.data.push(parseInt(item.value))
					balance.datasets.data.push(parseInt(item.value))
				}
				else{
					deposits.datasets.data.push(parseInt(item.value) + deposits.datasets.data[i-1])
					expenses.datasets.data.push(expenses.datasets.data[i-1])
					balance.datasets.data.push(balance.datasets.data[i-1] + parseInt(item.value))
				}
			}
		})
		console.log('expenses');
		console.log(expenses);
		console.log('deposits');
		console.log(deposits);
		// expenses.datasets.data = this.fibArray(expenses.datasets.data)
		// deposits.datasets.data = this.fibArray(deposits.datasets.data)

		// chartLineData.labels.push(expenses.labels)
		chartLineData.datasets.push(expenses.datasets)
		// chartLineData.labels.push(deposits.labels)
		chartLineData.datasets.push(deposits.datasets)
		chartLineData.datasets.push(balance.datasets)

		console.log('chartLineData.datasets after push deposits');
		console.log(chartLineData.datasets);		


		return chartLineData


		// const allExpenses = allItens.filter(item=> item.transaction==="expense")

		// getting the labels from allItens argument
		// const expensesDates = allExpenses.map(expense=> expense.payment_date)

		// chartLineData.labels = chartLineData.labels.concat(expensesDates)
		
		// getting the value from allItens argument
		// const expensesValues = allExpenses.map(expense=> expense.value)

		// console.log('chartLineData.datasets after push expenses');
		// console.log(chartLineData.datasets);


		// const allDeposits = allItens.filter(item=> item.transaction==="deposit")
		// const depositsDates = allDeposits.map(deposit=> deposit.payment_date)
		
		// chartLineData.labels = chartLineData.labels.concat(depositsDates)

		// const depositsValues = allDeposits.map(deposit=> deposit.value)
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
