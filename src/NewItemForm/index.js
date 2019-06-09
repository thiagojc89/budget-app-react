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
  	}
	render(){ 
		return(

		    <div className="newItemForm">
		        <p>newItemForm</p>
		        <form onSubmit={this.handleSubmit}>
		            <h3>new item</h3>
		            <div>
		            	Transaction: <input type='radio' name="transaction" value='expense'onChange={this.handleChange}/>
		            					<label htmlFor="expense">Expense</label>
		            				 <input type='radio' name="transaction" value='deposit'onChange={this.handleChange}/>
		            				 	<label htmlFor="deposit">Deposit</label>
		            </div>
		            {this.state.transaction === 'expense'?
		            <div>
			            <div>
			            	Name: <input type='text' name="name" onChange={this.handleChange}/>
			            </div>
			            <div>
			            	Value: <input type='number' name="value" onChange={this.handleChange}/>
			            </div>
			            <div>
			            	Date: <input type='date' name="payment_date" onChange={this.handleChange}/>
			            </div>

			            <button type="Submit">Create Item</button>
			        </div>
			        :
			        null
			    	}
			        
			        {this.state.transaction === 'deposit'?
			        <div>
			            <div>
			            	Description: <input type='text' name="name" onChange={this.handleChange}/>
			            </div>
			            <div>
			            	Value: <input type='number' name="value" onChange={this.handleChange}/>
			            </div>
			            <div>
			            	Date: <input type='date' name="payment_date" onChange={this.handleChange}/>
			            </div>

			            <button type="Submit">Create Item</button>
			        </div>
			        :
			        null
		            }
		        </form>
	        </div>
		)
	}
}
export default NewItemForm;