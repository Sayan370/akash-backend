import mongoose from 'mongoose'



const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
      
    }, 
    email: {
        type: String,
        required: true
        
    },
    phone: {
        type: String,
        required: true
       
      
    },
    message: {
        type: String
       
      
    },
    date:{
        type: Date
    }


   
});

const Contact = mongoose.model('contact', contactSchema);


export default Contact