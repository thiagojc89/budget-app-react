import React from 'react'
import Collapsible from 'react-collapsible';


const ItemComponent = (props)=>{
	
	let itens = null
	if (props.allItens !== undefined){
		
		itens = props.allItens.map((item, i)=>{
			return(

				<Collapsible key={i} trigger={
					<li ><strong>{item.name}</strong></li>
				}>
					
					<p>
						<input className="btn delete"type='button' value='Delete' onClick={props.deleteItens.bind(null,item.id)}/>
					</p>
					<p>
						<input className="btn edit" type='button' value='Edit' onClick={props.ItemToEdit.bind(null,item)}/>
					</p>
					
				</Collapsible>
			)
		})
	}
	
	return(
		        // <p>itemComponent</p>
		    <div className="itemComponent">
		    	
		    	<h3>Balance: {props.totalBalance}</h3>
		    	<h3>Epenses: {props.totalExpense}</h3>
		    	  
		        <form onSubmit={props.showChart}>
		        	<button className="btn newItem">New Item</button>
		        </form>
		        
		        {itens}
		        
	        </div>
	)
}
export default ItemComponent;