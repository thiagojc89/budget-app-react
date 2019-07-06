import React from 'react'
import Collapsible from 'react-collapsible';
import NewItemForm from '../NewItemForm'
import EditItemForm from '../EditItemForm'


class ItemComponent extends React.Component{
	constructor(){
		super();
		this.state={
			showEditPage: false,
			showNewItemForm: false
		}
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
	showEditPage = (item,e)=> {
		e.preventDefault()
		this.setState({
			showEditPage: true,
			ItemToEdit: item
		})
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
		this.showEditPage()
  	}
	itens = ()=> {

		console.log('gettin itens')	
		console.log(this.props.allItens, '<<<<--- allItens')
			return ( this.props.allItens.map((item, i)=>{
				return(
	
					<Collapsible key={i} trigger={
						<div><strong>{item.name}</strong></div>
					}>
						
						<p>
							<input className="btn delete"
									type='button' 
									value='Delete' 
									onClick={this.deleteItens.bind(null,item.id)}/>
						</p>
						<p>
							<input className="btn edit" 
									type='button' 
									value='Edit' 
									onClick={this.showEditPage.bind(null,item)}/>
						</p>
						
					</Collapsible>
				)
			})
			)
		// }
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
					
					{this.state.showEditPage?
				    	<EditItemForm editItem={this.props.editItens} ItemToEdit={this.state.ItemToEdit}/>
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