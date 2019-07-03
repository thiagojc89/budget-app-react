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
	componentDidMount(){
		this.itens()
	}
	showNewItemForm = (e)=> {
		e.preventDefault()
		this.setState({
			showNewItemForm: true
		})
	}
	showEditPage = (e)=> {
		e.preventDefault()
		this.setState({
			showEditPage: true
		})
	}
	itens = ()=> {

		// let itens = null
		// if (this.props.allItens !== undefined){
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
									onClick={this.props.deleteItens.bind(null,item.id)}/>
						</p>
						<p>
							<input className="btn edit" 
									type='button' 
									value='Edit' 
									onClick={this.props.ItemToEdit.bind(null,item)}/>
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
						{this.itens}
					</div>
					
					{this.state.showEditPage?
				    	<EditItemForm editItem={this.props.editItens} ItemToEdit={this.state.props.ItemToEdit}/>
						:
				    	null
				    }
				    
				    {this.state.showNewItemForm?
				    	<NewItemForm createItens={this.props.createItens}/>
				    	:
				    	null
				    }
				</div>
		)
	}
}
export default ItemComponent;