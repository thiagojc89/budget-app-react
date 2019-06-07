import React from 'react'


const ItemComponent = (props)=>{
	return(
		    <div className="itemComponent">
		        <p>itemComponent</p>
		        <form onSubmit={props.hideChart}>
		        	<button>New Item</button>
		        </form>
	        </div>
	)
}
export default ItemComponent;