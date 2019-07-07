import React from 'react'
import Collapsible from 'react-collapsible';
import NewItemForm from '../NewItemForm'
import EditItemForm from '../EditItemForm'


class ItemComponent extends React.Component{
	constructor(){
		super();
		this.state={
			enableEdit: false,
			showNewItemForm: false,
			name: null,
			value: null,
			due_date: '2019-06-09',
			payment_date: null,
			transaction: null
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	showNewItemForm = (e)=> {
		e.preventDefault()
		this.setState({
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

		   this.props.getitens()
		   this.setState({
			showNewItemForm: false
		   })

		}
		catch(err){
			console.log(err)
		}
  	}
	enableEdit = (item,e)=> {
		e.preventDefault()

		const itemToEnable =  document.getElementsByClassName(item.id)
		console.log('here it is my item I will enable', itemToEnable)
		
		for (let i = 0; itemToEnable.length > i; i++){
			console.log(itemToEnable[i])
			itemToEnable[i].disabled = false
				
		}

		// this.setState({
		// 	enableEdit: true,
		// 	ItemToEdit: item
		// })
	}
	deleteItens = async (item,e)=> {
		e.preventDefault()
		  try{
			  const deleteItens = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/user/budgetitem?item_id='+item, {
				  method: 'DELETE',
			  credentials: 'include'
		  });

			 // const parsedResponse = await deleteItens.json();

			 this.props.getitens()


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

			 this.props.getitens()
			 this.setState({
				enableEdit: false
			 })


		  }
		  catch(err){
			  console.log(err)
		  }
	}
	ItemToEdit = (item,e)=>{
		e.preventDefault()

		// console.log('this is the item i will update', item);
		
		this.setState({
			ItemToEdit: item
		})
		this.enableEdit()
  	}
	itens = ()=> {

		console.log('gettin itens')	
		console.log(this.props.allItens, '<<<<--- allItens')
		return ( 
				
			this.props.allItens.map((item, i)=>{
				return(
					<div className='itemGrid'>

						<div>
							{item.transaction==='deposit'?
							<select className={item.id} disabled='true'>
								<option value='deposit' selected='true'>Deposit</option>
								<option value='expense'>Expense</option>
							</select>
							:
							<select className={item.id} disabled='true'>
								<option value='deposit'>Deposit</option>
								<option value='expense' selected='true'>Expense</option>
							</select>}
						</div>
						<div>
							<input className={item.id} 
								   type='text' 
								   name="name" 
								   onChange={this.handleChange} 
								   disabled='true' 
								   value={item.name} />
						</div>
						<div>
							<input className={item.id} 
								   type='number' min="0" step=".01" 
								   name="value" onChange={this.handleChange}
							       disabled='true'
							       value={item.value}/>
						</div>
						<div>
							<input className={item.id}
								   type='date' 
								   name="payment_date" onChange={this.handleChange}
								   disabled='true'
								   value={item.payment_date} />
						</div>
					
						<div>
							<input className={item.id}
								   className="btn delete"
								   type='button' 
								   value='Delete' 
								   onClick={this.deleteItens.bind(null,item.id)}/>
						</div>
						<div>
							<input className="btn edit" 
									type='button' 
									value='Edit' 
									onClick={this.enableEdit.bind(null,item)}/>
						</div>
					</div>	
					
				)
			})
		)
	}
	render(){
		return(
				<div className="itemComponent">
					
					<h4>Balance: {this.props.totalBalance}</h4>
					<h4>Epenses: {this.props.totalExpense}</h4>
					
					<br/>
					<br/> 
					<form onSubmit={this.showNewItemForm}>
						<button className="btn newItem">New Item</button>
					</form>
					<div className="itemList">
						{this.itens()}
					</div>
					
					{this.state.enableEdit?
				    	<EditItemForm editItem={this.editItens} ItemToEdit={this.state.ItemToEdit}/>
						:
				    	null
				    }
				    
				    {this.state.showNewItemForm?
				    	<NewItemForm createItens={this.createItens}/>
				    	:
				    	null
				    }
				</div>
		)
	}
}
export default ItemComponent;