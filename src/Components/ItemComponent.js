import React from 'react'
import EditItemForm from './EditItemForm'
import ShowItem from './ShowItem'


class ItemComponent extends React.Component{
	constructor(props){
		super();
		this.state={
			enableEdit: false,
			showNewItemForm: false,
			name: null,
			value: null,
			due_date: '2019-06-09',
			payment_date: null,
			transaction: null,
			allItens:false
		}
	}
	
	// componentDidMount(){
	// 	// console.log('CDM in item componente', this.props.allItens)
	// 	this.setState({
	// 		allItens:this.props.allItens
	// 	})

		
	// }
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	deleteItens = async (item,e)=> {
		e.preventDefault()
		  try{
			  await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/user/budgetitem?item_id='+item, {
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
			  await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/user/budgetitem?item_id='+item.id, {
				  method: 'PUT',
				  credentials: 'include',
				  body: JSON.stringify(item),
				  headers: {
					'Content-Type': 'application/json'
				}
			});


			//  console.log(parsedResponse,'parsedResponse of getitens in MainComponent');

			 this.props.getitens()
			//  this.setState({
			// 	enableEdit: false
			//  })


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
	// itens = ()=> {
	
	// 	// console.log(this.state.allItens,'<===this.state.allItens')
	// 	// if (this.state.allItens === false || this.state.allItens.length === 0){
	// 	// 		return null
	// 	// }
	// 	console.log('gettin itens')	
	// 	console.log(this.props.allItens.lenght, '<<<<--- allItens')

	// 	if (this.props.allItens.lenght===0){
	// 		return <h2>teste</h2>
	// 	}
	// 	else{

	// 		return ( 
				
	// 			this.props.allItens.map((item, i)=>{
	// 				return(
	// 					<div className='itemGrid' key={item.id}>

	// 					<div>
	// 						{item.transaction==='deposit'?
	// 						<select className={item.id} disabled value='deposit'>
	// 							<option value='deposit'>Deposit</option>
	// 							<option value='expense'>Expense</option>
	// 						</select>
	// 						:
	// 						<select className={item.id} disabled value='expense'>
	// 							<option value='deposit'>Deposit</option>
	// 							<option value='expense'>Expense</option>
	// 						</select>}
	// 					</div>
	// 					<div>
	// 						<input className={item.id} 
	// 							   type='text' 
	// 							   name="name" 
	// 							   onChange={this.handleChange} 
	// 							   disabled
	// 							   value={item.name} />
	// 					</div>
	// 					<div>
	// 						<input className={item.id} 
	// 							   type='number' min="0" step=".01" 
	// 							   name="value" onChange={this.handleChange}
	// 						       disabled
	// 						       value={item.value}/>
	// 					</div>
	// 					<div>
	// 						<input className={item.id}
	// 							   type='date' 
	// 							   name="payment_date" onChange={this.handleChange}
	// 							   disabled
	// 							   value={item.payment_date} />
	// 					</div>
					
	// 					<div>
	// 						<input className="btn delete"
	// 							   type='button' 
	// 							   value='Delete' 
	// 							   onClick={this.deleteItens.bind(null,item.id)}/>
	// 					</div>
	// 					<div>
	// 						<input className="btn edit" 
	// 								type='button' 
	// 								value='Edit' 
	// 								onClick={this.enableEdit.bind(null,item)}/>
	// 					</div>
	// 				</div>		
	// 			)
	// 		})
	// 		)
	// 	}
	// }
	render(){
		// console.log(this.state.allItens,'state in the render')
		return(
				<div className="itemComponent">
					<br/>
					<br/> 
					<ShowItem allItens={this.props.allItens}
							  deleteItens={this.deleteItens}
							  enableEdit={this.enableEdit}
							  editItens={this.editItens}/>
  	
					{this.state.enableEdit?
				    	<EditItemForm editItem={this.editItens} ItemToEdit={this.state.ItemToEdit}/>
						:
				    	null
				    }
				    
				</div>
		)
	}
}
export default ItemComponent;