import {Schema, model} from 'mongoose'

const schema = new Schema({
    products: [{
        name:{
            type: String,
            require: true
        },
        qnty: {
            type: Number,
            require: true,
            default: 1
        }
    }],
    totalPrice: {
        type: Number,
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default new model('Order', schema)