const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// Connect to MongoDB
try {
    mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => console.log("connected"));
} catch (error) {
    console.log("could not connect");
}
mongoose.set('useCreateIndex', true);

// User schema
const UserSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, select: false }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare password
UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Export the model
module.exports = mongoose.model('User', UserSchema);
