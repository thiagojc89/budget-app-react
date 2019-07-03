import React from 'react';
import ItemComponent from '../ItemComponent'
import ChartComponent from '../ChartComponent'
import NewItemForm from '../NewItemForm'
import EditItemForm from '../EditItemForm'
import RegisterComponent from '../RegisterComponent'



class MainComponent extends React.Component {
	constructor(props){
		super();
	    this.state = {
	    	budget_id:'',
	    	itens:[],
	    	allItens:[],
	    	showChart: true,
	    	showEditPage:false,
	    	showNewItemForm: false,
	    	showRegister: false,
	    	chartLineData:{},
	    	chartBarData:{},
	    	ItemToEdit: null,
	    	totalBalance: 0,
			totalExpense: 0
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

		const allExpenses = allItens.filter(item=> item.transaction==="expense")
		const labels = allExpenses.map(item=> item.name)
		// console.log(labels);

		// getting the value from allItens argument
		const values = allExpenses.map(item=> item.value)
		// console.log(values);

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
			// constructor(datasets){
			// }
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
		      label:null,
		      data: []

			}

		}
		let totalBalance = 0
		let totalExpense = 0

		const expenses = new DatasetsTemplate()
		expenses.datasets.borderColor = 'rgba(225,0,0,.7)'
		expenses.datasets.steppedLine = true
		expenses.datasets.label = 'expense'
		
		const deposits = new DatasetsTemplate()
		deposits.datasets.borderColor = 'rgba(0,0,225,.7)'
		deposits.datasets.steppedLine = true
		deposits.datasets.label = 'deposits'

		const balance = new DatasetsTemplate()
		balance.datasets.borderColor = 'rgba(0,225,0,.7)'
		balance.datasets.steppedLine = true
		balance.datasets.label = 'balance'

		allItens.forEach((item, i)=>{
			chartLineData.labels.push(item.payment_date)
			
			// console.log(item.transaction);
			
			if (item.transaction==='expense'){
				
				if (i === 0){
					
					deposits.datasets.data.push(0)	
					expenses.datasets.data.push(parseInt(item.value))
					balance.datasets.data.push(parseInt(item.value))
					totalExpense = parseInt(item.value)
				}
				else{
					expenses.datasets.data.push(parseInt(item.value) + expenses.datasets.data[i-1])
					deposits.datasets.data.push(deposits.datasets.data[i-1])
					balance.datasets.data.push(balance.datasets.data[i-1] - parseInt(item.value))
					totalExpense = parseInt(item.value) + expenses.datasets.data[i-1]
				}
			
			}
			if (item.transaction==='deposit') {

				if (i === 0 ){
					expenses.datasets.data.push(0)		
					deposits.datasets.data.push(parseInt(item.value))
					balance.datasets.data.push(parseInt(item.value))
					totalBalance = parseInt(item.value)
				}
				else{
					deposits.datasets.data.push(parseInt(item.value) + deposits.datasets.data[i-1])
					expenses.datasets.data.push(expenses.datasets.data[i-1])
					balance.datasets.data.push(balance.datasets.data[i-1] + parseInt(item.value))
					totalBalance = parseInt(item.value) + deposits.datasets.data[i-1]
				}
			}
		})
		chartLineData.datasets.push(balance.datasets)
		chartLineData.datasets.push(expenses.datasets)
		chartLineData.datasets.push(deposits.datasets)

		// console.log('chartLineData.datasets after push deposits');
		// console.log(chartLineData.datasets);		

		totalBalance = totalBalance - totalExpense

		return [chartLineData , totalBalance, totalExpense]

	}
	componentDidMount(){
		this.getitens()
		
	}
	showChart = (e)=>{
		e.preventDefault()
		this.setState({
			showChart: false,
			showEditPage: false,
			showNewItemForm: true

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

   			// const parsedResponse = await newItem.json();

   			// console.log('this is my new item >>>> ',parsedResponse);
   			this.getitens()

  	  	}
  	  	catch(err){
  	  		console.log(err)
  	  	}
  	}
  	getitens = async ()=> {


  	  	try{
  	  		const allitens = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/user/budgetitem', {
			    credentials: 'include'
			});

   			const parsedResponse = await allitens.json();

   			// console.log(parsedResponse,'parsedResponse of getitens in MainComponent');

   			const chartBarData =  this.formatBarChart(parsedResponse)

   			const [chartLineData,totalBalance,totalExpense] =  this.formatLineChart(parsedResponse)

   			// console.log('this is the TOTAL >>>> ',totalBalance, totalExpense);


			this.setState({
				showChart: true,
				showEditPage: false,
				showNewItemForm: false,
				allItens: parsedResponse,
				chartBarData: chartBarData,
				chartLineData: chartLineData,
				totalBalance: totalBalance, 
				totalExpense: totalExpense
			})
  	  	}
  	  	catch(err){
  	  		console.log(err)
  	  	}
  	}
  	deleteItens = async (item,e)=> {
  		e.preventDefault()
  	  	try{
  	  		const deleteItens = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/user/budgetitem?item_id='+item, {
  	  			method: 'DELETE',
			    credentials: 'include'
			});

   			// const parsedResponse = await deleteItens.json();

   			this.getitens()


  	  	}
  	  	catch(err){
  	  		console.log(err)
  	  	}
  	}
  	editItens = async (item)=> {
  		// e.preventDefault()

  		// console.log('this is the item I will update', item);

  	  	try{
  	  		const deleteItens = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/user/budgetitem?item_id='+item.id, {
  	  			method: 'PUT',
			    credentials: 'include',
			    body: JSON.stringify(item),
			    headers: {
	          		'Content-Type': 'application/json'
        		}
			});

   			const parsedResponse = await deleteItens.json();

   			console.log(parsedResponse,'parsedResponse of getitens in MainComponent');

   			this.getitens()


  	  	}
  	  	catch(err){
  	  		console.log(err)
  	  	}
  	}
  	ItemToEdit = (item,e)=>{
  		e.preventDefault()

  		// console.log('this is the item i will update', item);
  		
  		this.setState({
  			showChart: false,
  		 	showEditPage: true,
  		 	showNewItemForm: false,
  			ItemToEdit: item
  		})
	}
	showReport = (e)=>{
		
		e.preventDefault()
		this.setState({
			showChart: false
		})
	} 
	showChart = (e)=>{
		
		e.preventDefault()

		this.setState({
			showChart: true
		})
	}  
  	render() {
    		
    	return (
      		<div className="MainComponent">
				<div id='MainComponentMenu'>
					<input type='button' value='Report' onClick={this.showReport}/>
					<input type='button' value='Chart' onClick={this.showChart}/>
				</div>
		      	<div className="main-container">
			        
				    
				    {this.state.showEditPage?
				    	<EditItemForm editItem={this.editItens} ItemToEdit={this.state.ItemToEdit}/>
						:
				    	null
				    }
				    
				    {this.state.showNewItemForm?
				    	<NewItemForm createItens={this.createItens}/>
				    	:
				    	null
				    }
				    {this.state.showChart?
				    	<ChartComponent allItens={this.state.allItens} 
						chartBarData={this.state.chartBarData}
						chartLineData={this.state.chartLineData}/>
				    	:
				    	// null
						<ItemComponent showChart={this.showChart} 
									   allItens={this.state.allItens} 
									   deleteItens={this.deleteItens}
									   ItemToEdit={this.ItemToEdit}
									   totalExpense={this.state.totalExpense}
									   totalBalance={this.state.totalBalance}/>
				    }
				    {this.state.showRegister?
				    	<RegisterComponent/>
				    	:
				    	null
				    }
		      	</div>
      		</div>
    	);
  	}
}
export default MainComponent;
				    // <div className="menuComponent">
				    //     <p>menuComponent</p>
			     //    </div>
