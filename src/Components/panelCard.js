import React, { Component } from "react";
import ImageUploader from 'react-images-upload';
import img from './2.jpg';


import '../css/panel.css';


class PanelCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            onEdit: false,
            image: props.image,
            label: props.label,
            price: props.price,
            salePrice: props.salePrice,
            description: props.description,
            category: props.category,
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
            const { image, label, price, salePrice, description, category, isSale } = this.state;
            if (label && description && category && price && image && (!isSale || (isSale && salePrice))) {
                this.props.handleEdit(this.props.index, {
                    _id: this.props._id,
                    image,
                    label,
                    price,
                    salePrice,
                    description,
                    category,
                    isSale,
                })
            } else alert(`Заполните: ${!label ? 'название' : ''} ${!description ? 'описание' : ''} ${!category ? 'категорию' : ''} ${!price ? 'цену' : ''} ${!image ? 'картинку' : ''} ${isSale && !salePrice ? 'цену по акции' : ''}`);
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
                        Цена (грн/кг.)
                    </div>
                    <input name="price" value={this.state.price} disabled={!this.state.onEdit} onChange={this.handleChange} />
                </div>
                {this.state.salePrice && <div className="editableBlock">
                    <div>
                        Акционная цена (грн/кг.)
                    </div>
                    <input name="salePrice" value={this.state.salePrice} disabled={!this.state.onEdit} onChange={this.handleChange} />
                </div>}
                {this.state.onEdit && <div className="editableBlock">
                    <label>Акция?
                    <input name="isSale" value={this.state.isSale} onChange={this.handleChange} id="saleBox" type="checkbox"></input>
                    </label>
                </div>}
                <div className="editableBlock">
                    <div>
                        Описание
                    </div>
                    <textarea name="description" value={this.state.description} disabled={!this.state.onEdit} onChange={this.handleChange} maxLength={200}>
                    </textarea>
                </div>

                <div className="editableBlock">
                    <div>
                        Категория
                    </div>
                    <select name="category" onChange={this.handleChange} disabled={!this.state.onEdit}>
                        <option selected={!this.state.category} disabled>Выберите категорию</option>
                        <option selected={this.state.category === "Овощи"} value="Овощи">Овощи</option>
                        <option selected={this.state.category === "Фрукты"} value="Фрукты">Фрукты</option>
                        <option selected={this.state.category === "Орехи"} value="Орехи">Орехи</option>
                        <option selected={this.state.category === "Фрукты в шоколаде"} value="Фрукты в шоколаде">Фрукты в шоколаде</option>
                        <option selected={this.state.category === "Конфеты"} value="Конфеты">Конфеты</option>
                    </select>
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

export default PanelCard;
