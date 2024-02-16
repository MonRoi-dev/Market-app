import {Schema, model} from 'mongoose'

const schema = new Schema({
    name: {
        type: String,
        require: true
    },
    info: {
        type: String,
        require: true
    },
    image: {
        type: String,
        default: 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'
    },
    price: {
        type: Number,
        require: true,
        default: 0
    }

})

export default new model('Product', schema)