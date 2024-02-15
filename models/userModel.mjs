import { Schema, model } from 'mongoose';

const schema = new Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    ctreatedAt: {
        type: Date,
        default: Date.now()
    }
});

export default new model('User', schema)