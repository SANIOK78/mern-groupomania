const mongoose = require('mongoose');
// install pack "validator" et import {isEmail}
const { isEmail } = require("validator");
// Install et import "bcrypt" pour cripter le MdP
const bcrypt = require('bcrypt');

// schema User
const userSchema = new mongoose.Schema(
    {
        pseudo: { 
            type: String, required: true, minLength: 3, maxLength: 55,
            unique: true,
            trim: true    //suprim les espasses debut, fin
        },
        email: {
            type: String, required: true, unique: true, trim: true,
            validate: [isEmail], //validé par "validator"
            lowercase: true,   //en minuscule  
        },       
        password: { type: String, required: true, max: 1024, minlength: 6 },
        job : { type: String },
        role : { type: String, default: "USER" },
        // isAdmin: { type: Boolean, default: false }, 
        avatar : { type : String, default: "./uploads/profil/random-user.png" },
        bio : { type: String, max: 1024 },
        followers : { type: [String] },    
        following : { type: [String] },
        likes : { type: [String] } 
    },
    { timestamps: true }
);

// cryptage du MdP avant l'enregistrement dans la BD
userSchema.pre("save", async function(next) {
    // on géner un "salt"
    const salt = await bcrypt.genSalt(7);
    // cryptage de MdP
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// décryptage du "Mot de passe" au connexion
userSchema.statics.login = async function(email, password) {
    // récup "user" depuis BD, correspondant au "email"
    const user = await this.findOne({ email });
    if(user) {
        // si "user" trouvé, comparaison du MdP rentré avec le MdP dans la BD
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

module.exports = mongoose.model('user', userSchema);


