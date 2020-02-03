import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style/style'
const reactRoot_1 = document.getElementById('react-container-1')
const reactRoot_2 = document.getElementById('react-container-2')
//  ---------------------------------------------------------

class EtsyCalc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValue: 11,
            weight: 100,
            additional: 4.5,
            iterations: 10
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        const target = e.target;
        const name = target.name;
        const value = parseFloat(target.value);
        this.setState({ [name]: value });
    };
    handleSubmit(e){
        e.preventDefault();
        ReactDOM.render(<DisplayOutput {...this.state} />, reactRoot_2);
        document.getElementById('react-container-2').style.display = 'block';
    }
    render(){
        return(
            <div>
                <h1>Etsy progressive shipping calculator</h1>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>Initial price (£)</label>
                        <input type="number" name="initialValue"
                        value={this.state.initialValue} onChange={this.handleChange} />
                        <span>(Price for first item)</span>
                    </p>
                    <p>
                        <label>Weight (g)</label>
                        <input type="number" name="weight"
                        value={this.state.weight} onChange={this.handleChange} />
                        <span>(Weight per item)</span>
                    </p>
                    <p>
                        <label>Additional (£)</label>
                        <input type="number" name="additional"
                        value={this.state.additional} onChange={this.handleChange} />
                        <span>(Price per additional item)</span>
                    </p>
                    <p>
                        <label>Iterations</label>
                        <input type="number" name="iterations"
                        value={this.state.iterations} onChange={this.handleChange} />
                        <span>(How far the calculation runs)</span>
                    </p>
                    <p>
                        <input type="submit" value="Calculate" />
                    </p>
                </form>
            </div>
        )
    }
}

class DisplayOutput extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h1>Shipping price iterations</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Weight</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <TableRows {...this.props} />
                </table>
            </div>
        )
    }
}

class TableRows extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        const rows = [];
        console.log(this.props.initialValue);
        if(
            isNaN(this.props.initialValue) ||
            isNaN(this.props.weight) ||
            isNaN(this.props.additional) ||
            isNaN(this.props.iterations)
        ){
            rows.push( <tr key="1"><td colSpan="2"><em>Please enter only numbers</em></td></tr>)
        }else{
            for( var i=0; i<this.props.iterations; i++ ){
                let count = i+1;
                let price = 0;
                let calcWeight = count*this.props.weight;
                let weightUnit = 'g';
                if( calcWeight >= 1000 ){
                    calcWeight = calcWeight / 1000;
                    weightUnit = 'kg';
                }
                if( i === 0 ){
                    price = this.props.initialValue;
                }else{
                    price = this.props.initialValue + (this.props.additional * i);
                }
                rows.push(
                    <tr key={i}>
                        <td>{calcWeight + weightUnit}</td>
                        <td>£{price.toFixed(2)}</td>
                    </tr>
                )
            }
        }
        return(
            <tbody>
                {rows}
            </tbody>
        )
    }
}

// -- Render ------------------------------------------------
    ReactDOM.render( <EtsyCalc />, reactRoot_1 )
// ----------------------------------------------------------
