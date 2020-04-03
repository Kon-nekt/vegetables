import React, { Component } from "react";
import axios from 'axios';


import '../css/panel.css';
import PanelAdderCard from "./panelAdderCard";
import PanelCard from "./panelCard";


class Panel extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            imgFlag: false,
            tempImg: '',
        }

        this.onDrop = this.onDrop.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    onDrop(picture, row) {
        console.log(row);
        const reader = new FileReader();

        reader.readAsDataURL(picture[0]);


        reader.onload = () => {
            this.setState({
                imgFlag: true,
                tempImg: reader.result,
            })
            console.log(reader.result);
        };
    }

    async componentDidMount() {
        const vegs = await axios.get('http://192.236.146.174:8000/vegs');
        if (vegs)
            this.setState({
                data: vegs.data.return,
            })
    }

    handleAdd(dataFromCard) {
        console.log(dataFromCard);
        this.setState((state) => ({
            data: [dataFromCard, ...state.data],
        }))
    }

    async handleDelete(index) {
        const data = this.state.data;

        console.log(data[index]._id);

        const response = await axios.delete(`http://192.236.146.174:8000/vegs${data[index]._id}`);

        alert(response.data.message);

        data.splice(index, 1)
        this.setState({
            data,
        });
    }

    async handleEdit(index, dataFromCard) {
        const data = this.state.data;
        const response = await axios.put('http://192.236.146.174:8000/vegs', { ...dataFromCard, _id: data[index]._id }, {
            headers: {
                'Content-Type': 'text/json',
            } });
        alert(response.data.message);
        data[index] = dataFromCard;
        this.setState({
            data,
        });
    }

    toCards(data) {
        return(data.map(((cardData, index) => <PanelCard
            key = {cardData._id}
            index = {index}
            label = {cardData.label}
            image = {cardData.image}
            price = {cardData.price}
            salePrice = {cardData.salePrice}
            description = {cardData.description}
            category = {cardData.category}
            handleEdit = {this.handleEdit}
            handleDelete = {this.handleDelete}
        />)))
    }

    render() {
        return (
            <div className = "fStroke">
                <PanelAdderCard adder={this.handleAdd} />
                {this.toCards(this.state.data)}
            </div>

        );
    }
}

export default Panel;
