import express from 'express'


import multer from 'multer';

import Contact from '../modals/contact.modal.js';
import nodemailer   from 'nodemailer';

const router4 = express.Router();

let upload = multer();

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'yourmail@gmail.com',
            pass: 'yourpassword',
         },
    secure: true,
    });


router4.route('/records').get( (req1, res1) => {
 


    Contact.find({}, function(err, docs) {
        if (err) {
            res1.status(400).json('Error: ' + err);
        } else {
            res1.status(200).json(docs);

            
        }
    })
  

});

router4.route('/find').post(upload.fields([]), (req2, res1) => {
 


const idcxs = req2.body.id;




    Contact.findOne({ "_id": idcxs}, function(err, docs) {
       
        if (err) {
            res1.status(400).json('Error: ' + err);
        } else {
            res1.status(200).json(docs);

            
        }
    })
  

});

router4.route('/add').post(upload.fields([]), (req2, res) => {
 


const name = req2.body.name;
const email = req2.body.email;
const phone = req2.body.phone;
const message = req2.body.message;
const date = new Date().toLocaleString();


const newUserData = {
    name,
    email,
    phone,
    message,
    date
  
  
}

// const mailData = {
//       from: 'sayanm481@gmail.com',  // sender address
//       to: 'sayanroyal370@gmail.com',   // list of receivers
//       subject: 'Sending Email using Node.js',
//       text: 'That was easy!',
//       html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
//     };

//     transporter.sendMail(mailData, function (err, info) {
//         if(err)
//           console.log(err)
//         else
//           console.log(info);
//      });

const newUser = new Contact(newUserData);

newUser.save()
       .then(() => res.json('Contact Added'))
       .catch(err => res.status(400).json('Error: ' + err));

  

});



router4.route('/delete').post(upload.fields([]), (req2, res) => {
 


const idcxs = req2.body.id;





Contact.deleteOne(  { _id:idcxs})
.then(() => res.json('Contact Deleted'))
.catch(err => res.status(400).json('Error: ' + err));


  

});

export default router4