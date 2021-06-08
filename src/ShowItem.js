import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPen, faSave, faTrashAlt  } from '@fortawesome/free-solid-svg-icons'


class ShowItem extends React.Component {
    constructor(props){
        // console.log('constructor',props)
        super(props);
        this.state=({
            allItens: [],
            id: '',
            name: '',
            transaction: '',
            payment_date: '',
            value: ''
        })
    }
    componentDidUpdate(prevProps) {
        
        // console.log('CDU in item ShowItem', this.props.allItens)
        if (this.props.allItens !== prevProps.allItens){

            
            // console.log('CDU in item ShowItem Atualizado')
            
            this.setState({
                allItens: this.props.allItens
            })
        }
    }
    handleChange = (e) => {
        // console.log('e.currentTarget.name', e.currentTarget.name)
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }
    enableEdit = (item, e) => {
        e.preventDefault()
        document.querySelector(`#grid${item.id} .itemGrid`).style.display = 'none'
        document.querySelector(`#grid${item.id} .itemGridToEdit`).style.display = 'flex'

        this.setState({
            id:item.id,
            name:item.name,
            transaction: item.transaction,
            payment_date: item.payment_date,
            value: item.value
        })

    }
    cancelEdit = (item,e)=>{
        e.preventDefault()
        document.querySelector(`#grid${item.id} .itemGrid`).style.display = 'flex'
        document.querySelector(`#grid${item.id} .itemGridToEdit`).style.display = 'none'
    }
    saveChage = (item,e)=>{
        e.preventDefault()

        const itemToSave = {
            id: this.state.id,
            name: this.state.name,
            transaction: this.state.transaction,
            payment_date: this.state.payment_date,
            value: this.state.value
        }


        this.props.editItens(itemToSave)
        document.querySelector(`#grid${item.id} .itemGrid`).style.display = 'flex'
        document.querySelector(`#grid${item.id} .itemGridToEdit`).style.display = 'none'
    }
    render(){
        // console.log('Render in item ShowItem', this.state.allItens)
        let itemList
        if (this.props.allItens.length===0){
            itemList = <p className='noItem'>No items to display.<br/>Create a new item by cliking on the button on the left, and we will do the rest.</p>
        }
        else{

            itemList = this.props.allItens.map((item, i) => {
                return (
                    <div id={'grid'+item.id} key={i}>

                    <div className='itemGrid'>
                    <div>
                            <li>
                                {item.transaction}
                            </li>
                    </div>
                    <div>
                        <input className={item.id}
                            type='text'
                            name="name"
                            disabled
                            value={item.name} />
                    </div>
                    <div>
                        <input className={item.id}
                            type='number' min="0" step=".01"
                            name="value"
                            disabled
                            value={item.value} />
                    </div>
                    <div>
                        <input className={item.id}
                            type='date'
                            name="payment_date"
                            disabled
                            value={item.payment_date} />
                    </div>

                    <div>
                        <FontAwesomeIcon icon={faTrashAlt}
                            className="btn delete"
                            onClick={this.props.deleteItens.bind(null, item.id)} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faPen}
                            className="btn edit"
                            onClick={this.enableEdit.bind(null, item)} />
                    </div>
                </div>
                <div className='itemGridToEdit'>

                    <div>
                        
                            <select className={this.state.id} 
                                    name='transaction' 
                                    onChange={this.handleChange}
                                    value={this.state.transaction}> 
                                <option value='deposit'>Deposit</option>
                                <option value='expense'>Expense</option>
                            </select>
                    </div>
                    <div>
                        <input className={item.id}
                            type='text'
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.name} />
                    </div>
                    <div>
                        <input className={item.id}
                            type='number' min="0" step=".01"
                            name="value"
                            onChange={this.handleChange}
                            value={this.state.value} />
                    </div>
                    <div>
                        <input className={item.id}
                            type='date'
                            name="payment_date"
                            onChange={this.handleChange}
                            value={this.state.payment_date} />
                    </div>

                    <div>
                        <FontAwesomeIcon icon={faTimes}
                            className="btn delete"
                            onClick={this.cancelEdit.bind(null, item)} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faSave}
                            className="btn edit"
                            onClick={this.saveChage.bind(null, item)} />
                    </div>
                </div>
                </div>
            )
        })
        }
        return (<div className="itemList">
                {itemList}
            </div>)
    }
}
export default ShowItem;