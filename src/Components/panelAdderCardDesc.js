import React, { Component } from "react";
import ImageUploader from 'react-images-upload';
import axios from 'axios';


import '../css/panel.css';


class PanelAdderCardDesc extends Component {
    constructor(props){
        super(props);

        this.state = {
            isSale: false,
            label: '',
            price: '',
            description: '',
            salePrice: '',
        }

        this.onDrop = this.onDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onDrop(picture) {
        if (picture.length) {
            const reader = new FileReader();

            reader.readAsDataURL(picture[0]);

            reader.onload = () => {
                this.setState({
                    image: reader.result,
                    imageType: picture[0].type.split('/')[1]
                })
            };
        } else {
            this.setState({
                image: '',
                imageType: ''
            })
        }

    }

    handleChange(e) {
        const target = e.target;
        const name = e.target.name;
        const value = (name === 'isSale') ? target.checked : target.value;
        this.setState({
            [name]: value,
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { label, description, category, price, image, isSale, salePrice } = this.state;
        if (label && description && image) {

            let response = {};

            try {
                response = await axios.post('/desc', {
                    label,
                    description,
                    image,
                    imageType: this.state.imageType,
                }, {
                    headers: {
                        'Content-Type': 'text/json',
                    } });

                const _id = response.data._id;


                this.props.adder({
                    label,
                    description,
                    image,
                    _id,
                });
                this.setState({
                    image: '',
                    label: '',
                    description: '',
                });

                alert(response.data.message);
            } catch (error) {
                return alert(error);
            }

        } else alert(`Заполните: ${!label ? 'название' : ''} ${!description ? 'описание' : ''} ${!image ? 'картинку' : ''}`);
    }

    render() {
        return (
                <div className="osnova">
                <form onSubmit={this.handleSubmit}>
                <div className="editableLogo">
                    <ImageUploader
                        className = 'editableImage'
                        name = "image"
                        fileContainerStyle = {{
                            background: 'none',
                            boxShadow: 'none',
                            // visibility: 'hidden',
                        }}
                        singleImage = {true}
                        withLabel = {false}
                        withPreview = {this.state.image}
                        withIcon={false}
                        buttonText='Выберите изображение'
                        onChange={this.onDrop}
                        imgExtension={['.jpeg', '.gif', '.png', '.gif', '.jpg']}
                        maxFileSize={5242880}
                    />
                </div>
                <div className="editableBlock">
                    <div>
                        Заголовок
                    </div>
                    <input name="label" type="text" value={this.state.label} onChange={this.handleChange} />
                </div>
                <div className="editableBlock">
                    <div>
                        Описание
                    </div>
                    <textarea name="description" value={this.state.description} onChange={this.handleChange} placeholder="Какое-нибудь описание..." maxLength={200}>
                    </textarea>
                    <p style = {{marginTop: '.1em', marginBottom: 0, fontSize: '.7em'}}>
                        {this.state.description && this.state.description.length}
                    </p>
                </div>
                <button className="mer_button" style = {{marginTop: '50px'}}>
                    Добавить
                </button>

                </form>
            </div>
        );
    }
}

export default PanelAdderCardDesc;
