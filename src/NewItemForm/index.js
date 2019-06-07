import React from 'react'


class NewItemForm extends React.Component {
	constructor(props){
		super()
		this.state={
			name: null,
			value: null,
			due_date: null,
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
  		this.props.createItens()
  	}
	render(){ 
		return(

		    <div className="newItemForm">
		        <p>newItemForm</p>
		        <form onSubmit={this.handleSubmit}>
		            <h3>new item</h3>
		            <div>
		            	Name: <input type='text' name="name" onChange={this.handleChange}/>
		            </div>
		            <div>
		            	Value: <input type='number' name="value" onChange={this.handleChange}/>
		            </div>
		            <div>
		            	Due Date: <input type='date' name="due_date" onChange={this.handleChange}/>
		            </div>
		            <div>
		            	Payment Date: <input type='date' name="payment_date" onChange={this.handleChange}/>
		            </div>
		            <div>
		            	Transaction: <input type='radio' name="transaction" value='expense'onChange={this.handleChange}/>
		            					<label htmlFor="expense">Expense</label>
		            				 <input type='radio' name="transaction" value='deposit'onChange={this.handleChange}/>
		            				 	<label htmlFor="deposit">Deposit</label>
		            </div>

		            <button type="Submit">Create Item</button>
		            
		        </form>
	        </div>
		)
	}
}
export default NewItemForm;