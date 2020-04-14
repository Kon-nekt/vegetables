import React, { Component } from "react";
import ImageUploader from 'react-images-upload';
import img from './2.jpg';


import '../css/panel.css';


class PanelCardDesc extends Component {
    constructor(props){
        super(props);

        this.state = {
            onEdit: false,
            image: props.image,
            label: props.label,
            description: props.description,
        }

        this.onDrop = this.onDrop.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    onDrop(picture) {
        if (picture.length) {
            const reader = new FileReader();

            reader.readAsDataURL(picture[0]);

            reader.onload = () => {
                this.setState({
                    image: reader.result,
                })
            };
        } else {
            this.setState({
                image: '',
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

    handleDelete() {
        this.props.handleDelete(this.props.index);
    }

    handleSave() {
        if (this.state.onEdit){
            const { image, label, description } = this.state;
            if (label && description && image) {
                this.props.handleEdit(this.props.index, {
                    _id: this.props._id,
                    image,
                    label,
                    description,
                })
            } else alert(`Заполните: ${!label ? 'название' : ''} ${!description ? 'описание' : ''} ${!image ? 'картинку' : ''}`);
        }
        this.setState((state) => ({
            onEdit: !state.onEdit,
        }));
    }

    render() {
        return (
                <div className="osnova">
                <div className="notEditableLogo">
                    {
                    this.state.onEdit ? <ImageUploader
                            className = 'editableImage'
                            fileContainerStyle = {{
                                background: 'none',
                                boxShadow: 'none',
                            }}
                            singleImage = {true}
                            withLabel = {false}
                            withPreview = {false}
                            withIcon={false}
                            buttonText='Выберите изображение'
                            onChange={this.onDrop}
                            imgExtension={['.jpeg', '.gif', '.png', '.gif', '.jpg']}
                            maxFileSize={5242880}
                        />
                    : <img src={this.state.image} alt="" />
                    }
                </div>
                <div className="editableBlock">
                    <div>
                        Имя
                    </div>
                    <input name="label" value={this.state.label} disabled={!this.state.onEdit} onChange={this.handleChange} />
                </div>
                <div className="editableBlock">
                    <div>
                        Описание
                    </div>
                    <textarea name="description" value={this.state.description} disabled={!this.state.onEdit} onChange={this.handleChange} maxLength={200}>
                    </textarea>
                </div>

                <button onClick={this.handleSave} className="mer_button" style = {{marginTop: '50px'}}>
                    {!this.state.onEdit ? 'Изменить' : 'Сохранить'}
                </button>
                <button onClick={this.handleDelete} className="mer_button" style = {{marginTop: '50px'}}>
                    Удалить
                </button>
            </div>
        );
    }
}

export default PanelCardDesc;
