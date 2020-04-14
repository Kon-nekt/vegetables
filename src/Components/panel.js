import React, { Component } from "react";
import axios from 'axios';


import '../css/panel.css';
import PanelAdderCard from "./panelAdderCard";
import PanelAdderCardDesc from "./panelAdderCardDesc";
import PanelCard from "./panelCard";
import PanelCardDesc from "./panelCardDesc";


class Panel extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            imgFlag: false,
            tempImg: '',
            dataDesc: [],
        }

        this.onDrop = this.onDrop.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleAddDesc = this.handleAddDesc.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditDesc = this.handleEditDesc.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteDesc = this.handleDeleteDesc.bind(this);
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
        const vegs = await axios.get('/vegs');
        const decs = await axios.get('/desc');
        if (vegs)
            this.setState({
                data: vegs.data.return,
                dataDesc: decs.data.return,
            })
    }

    handleAdd(dataFromCard) {
        console.log(dataFromCard);
        this.setState((state) => ({
            data: [dataFromCard, ...state.data],
        }))
    }

    handleAddDesc(dataFromCard) {
        console.log(dataFromCard);
        this.setState((state) => ({
            dataDesc: [dataFromCard, ...state.dataDesc],
        }))
    }

    async handleDelete(index) {
        const data = this.state.data;

        console.log(data[index]._id);

        const response = await axios.delete(`/vegs${data[index]._id}`);

        alert(response.data.message);

        data.splice(index, 1)
        this.setState({
            data,
        });
    }

    async handleEdit(index, dataFromCard) {
        const data = this.state.data;
        const response = await axios.put('/vegs', { ...dataFromCard, _id: data[index]._id }, {
            headers: {
                'Content-Type': 'text/json',
            } });
        alert(response.data.message);
        data[index] = dataFromCard;
        this.setState({
            data,
        });
    }

    async handleDeleteDesc(index) {
        const data = this.state.dataDesc;

        console.log(data[index]._id);

        const response = await axios.delete(`/desc${data[index]._id}`);

        alert(response.data.message);

        data.splice(index, 1)
        this.setState({
            dataDesc: data,
        });
    }

    async handleEditDesc(index, dataFromCard) {
        const data = this.state.dataDesc;
        const response = await axios.put('/desc', { ...dataFromCard, _id: data[index]._id }, {
            headers: {
                'Content-Type': 'text/json',
            } });
        alert(response.data.message);
        data[index] = dataFromCard;
        this.setState({
            dataDesc: data,
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


    toCardsDesc(data) {
        return(data.map(((cardData, index) => <PanelCardDesc
            key = {cardData._id}
            index = {index}
            label = {cardData.label}
            image = {cardData.image}
            description = {cardData.description}
            handleEdit = {this.handleEditDesc}
            handleDelete = {this.handleDeleteDesc}
        />)))
    }

    render() {
        return (
            <div className = "fStroke">
                <PanelAdderCardDesc adder={this.handleAddDesc} />
                {this.toCardsDesc(this.state.dataDesc)}
                <PanelAdderCard adder={this.handleAdd} />
                {this.toCards(this.state.data)}
            </div>

        );
    }
}

export default Panel;
