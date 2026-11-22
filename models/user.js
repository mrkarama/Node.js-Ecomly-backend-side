const {Schema, model} = require('mongoose');

const userSchema = Schema({
    'name': {type: String, required: true, trim: true},
    'email': {type: String, required: true, trim: true},
    'passwordHash': {type: String, required: true},
    'phone': {type: Number, required: true, trim: true},
    'isAdmin': {type: String, default: false},
    'street': String,
    'apartment': String,
    'postalCode': String,
    'resetPasswordOtp': Number,
    'resetPasswordOtpExpires': Date,
    'country': String,
    'city': String,
    'wishlist': [
        {
            'productId': {type: Schema.Types.ObjectId, ref: 'Product', required: true},
            'productName': {type: String, required: true},
            'productImage': {type: String, required: true},
            'productPrice': {type: Number, required: true}
        },
    ]
});

userSchema.index({email: 1}, {unique: true});
exports.User = model('User', userSchema);