import React from 'react';
import ACard from './ACard';
import '../css/advantages.css'
import axios from 'axios';

class Advantages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Adata: [],
            visibility:false,
        }

    }
    async componentDidMount() {
        const response = await axios.get('/desc');

        const Adata = response.data.return.reverse();

        this.setState({
            Adata,
        })
    }
    AcardRender(Adata) {
        return(Adata.map(AcardData => <ACard key = { AcardData._id } name={AcardData.label} descr={AcardData.description} image={AcardData.image}/>));
    }
  render () {
    return (
        <div className = "advantages">
            <div className = "fStroke">{this.AcardRender(this.state.Adata)}</div>
        </div>
    )
  }
}
export default Advantages;