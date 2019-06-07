import React from 'react'


const ItemComponent = (props)=>{
	
	// console.log(props.allItens, 'props at ItemComponent');
	let itens = null
	if (props.allItens !== undefined){
		
		itens = props.allItens.map((item, i)=>{
			return(
				<li key={i}>
					{item.name}
				</li>
			)
		})
	}
	
	return(
		    <div className="itemComponent">
		        <p>itemComponent</p>
		        <form onSubmit={props.hideChart}>
		        	<button>New Item</button>
		        </form>
		        <ul>
		        	{itens}
		        </ul>
	        </div>
	)
}
export default ItemComponent;