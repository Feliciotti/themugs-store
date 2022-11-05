import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        age: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        token: {
            type: String,
            default: null
        },
        tokenConfirm: {
            type: Boolean,
            default: false
        },
        role: {
                ref: 'role',
                type: mongoose.Schema.Types.ObjectId
        }
    },
    {
        timestamps: true
    }
);

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('user', userSchema);

export { User } // to be used in middleware/passport