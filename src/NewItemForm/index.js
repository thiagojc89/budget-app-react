import React from 'react'


class NewItemForm extends React.Component {
	constructor(props){
		super()
		this.state={
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
  	handleSubmit = (e) => {
  		e.preventDefault()
		this.props.createItens(this.state)
		this.props.showNewItemForm(e)
  	}
	render(){ 
		return(

		    <div className="newItemForm">
		    
		        <form onSubmit={this.handleSubmit}>
		            <div>
		            	Transaction: <input type='radio' name="transaction" value='expense'onChange={this.handleChange}/>
		            					<label htmlFor="expense">Expense</label>
		            				 <input type='radio' name="transaction" value='deposit'onChange={this.handleChange}/>
		            				 	<label htmlFor="deposit">Deposit</label>
		            </div>
		            
		            
			            <div>
			            	Description: <input type='text' name="name" onChange={this.handleChange}/>
			            </div>
			            <div>
							Value: <input type='number' name="value" min="0" step=".01" onChange={this.handleChange}/>
			            </div>
			            <div>
			            	Date: <input type='date' name="payment_date" onChange={this.handleChange}/>
			            </div>
						<div>
			            	<button className='btn createItem' type="Submit">Create Item</button>
						</div>
			        
		        </form>
	        </div>
		)
	}
}
export default NewItemForm;