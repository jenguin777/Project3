const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
  firstName: { type: String, unique: false },
  lastName: { type: String, unique: false },
  username: { type: String, unique: true, required: false },
  password: { type: String, unique: false, required: false },
  joinIngredient : [{type: Schema.Types.ObjectId, ref: 'Ingredient' }], //trying to get user view to work
  joinRecipe : [{type: Schema.Types.ObjectId, ref: 'Recipe' }], //trying to get user view to work
  joinFaves : [{type: Schema.Types.ObjectId, ref: 'Faves' }] //trying to get user view to work
});

// Define schema methods
userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10);
	}
};

// Define hooks for pre-saving
userSchema.pre('save', function(next) {
	if (!this.password) {
		console.log('No password provided!');
		next();
	} else {
		this.password = this.hashPassword(this.password);
		next();
	}
})

// Create reference to User & export
const User = mongoose.model('User', userSchema);
module.exports = User;
