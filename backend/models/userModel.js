const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email :{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// static register method

userSchema.statics.register = async function(email, password){
    
    const exists = await this.findOne({ email });
    if (exists) {
        throw new Error('Email already in use.');
    }

    if(!email || !password){
        throw new Error('All fields are required.');
    }
    if(!validator.isEmail(email)){
        throw new Error('Email is not valid.');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('Password is not strong enough.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = this.create({ email, password: hashedPassword });

    return user;
}

// static login method

userSchema.statics.login = async function(email, password){

    if(!email || !password){
        throw new Error('All fields are required.');
    }

    const user = await this.findOne({ email });

    if(!user){
        throw new Error('Email is incorrect.');
    }

    const auth = await bcrypt.compare(password, user.password);

    if(!auth){
        throw new Error('Password is incorrect.');
    }

    return user;
}

const User = mongoose.model('User', userSchema);
module.exports = User;