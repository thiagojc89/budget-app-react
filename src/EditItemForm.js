import React from 'react'


class EditItemForm extends React.Component {
	constructor(props){
		super()
		this.state={
			id:null,
			name: null,
			value: null,
			due_date: '2019-06-09',
			payment_date: null,
			transaction: null
		}
	}
	componentDidMount(props){

			// console.log(this.props.ItemToEdit.transaction);
		if (this.props.ItemToEdit.transaction==='expense'){
			
			const transactionRbtn = document.getElementById("exp");
			transactionRbtn.checked = true;
		}
		else{
			const transactionRbtn = document.getElementById("dep");
			transactionRbtn.checked = true;
		}

		this.setState({
			id: this.props.ItemToEdit.id,
			name: this.props.ItemToEdit.name,
			value: parseInt(this.props.ItemToEdit.value,10),
			payment_date: this.props.ItemToEdit.payment_date,
			transaction: this.props.ItemToEdit.transaction,
		})
	}
	handleChange = (e) => {
	    this.setState({
	      [e.currentTarget.name]: e.currentTarget.value
	    })
  	}
  	handleSubmit = (e) => {
  		e.preventDefault()
  		this.props.editItem(this.state)
  	}
	render(){ 
		return(

		    <div className="editItemForm">
		        
		        {/* <form onSubmit={this.handleSubmit}> */}
		            {/* <h3>Edit item</h3>
		            <div>
		            	Transaction: <input id='exp' type='radio' name="transaction" value='expense'onChange={this.handleChange}/>
		            					<label htmlFor="expense">Expense</label>
		            				 <input id='dep' type='radio' name="transaction" value='deposit'onChange={this.handleChange}/>
		            				 	<label htmlFor="deposit">Deposit</label>
		            </div>
		            {this.state.transaction === 'expense'?
		            <div>
			            <div>
			            	Description: <input type='text' name="name" onChange={this.handleChange}
			            				 value={this.state.name}/>
			            </div>
			            <div>
							Value: <input type='number' min="0" step="any" name="value" onChange={this.handleChange}
			            				 value={this.state.value}/>
			            </div>
			            <div>
			            	Date: <input type='date' name="payment_date" onChange={this.handleChange}
			            				 value={this.state.payment_date}/>
			            </div>

			            <button className='btn edit' type="Submit">Save Item</button>
			        </div>
			        :
			        null
			    	}
			        
			        {this.state.transaction === 'deposit'?
			        <div>
			            <div>
			            	Description: <input type='text' name="name" onChange={this.handleChange}
			            						value={this.state.name}/>
			            </div>
			            <div>
							Value: <input type='number' min="0" step="any" name="value" onChange={this.handleChange}
			            						value={this.state.value}/>
			            </div>
			            <div>
			            	Date: <input type='date' name="payment_date" onChange={this.handleChange}
			            						value={this.state.payment_date}/>
			            </div>

			            <button className='btn edit' type="Submit">Save Item</button>
			        </div>
			        :
			        null
		            }
		        </form> */}
	        </div>
		)
	}
}
export default EditItemForm;