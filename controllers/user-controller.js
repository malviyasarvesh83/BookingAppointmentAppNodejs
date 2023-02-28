const User = require('../models/user');

exports.getUser = (req, res, next)=> {
    res.render('bookappointment', {pageTitle:'Book An Appointment',appointmentButton:'Book Appointment', path:'/bookappointment'});
}

exports.postUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const date = req.body.date;
    const time = req.body.time;
    User.create({
        name: name,
        email: email,
        phone: phone,
        date: date,
        time: time
    }).then((result) => {
        console.log('Appointment Booked..!');
        res.redirect("/allappointment");
    }).catch((err) => {
        console.log(err);
    })
}

exports.showUser = (req, res, next) => {
    User.findAll()
        .then((user) => {
            console.log('Data Find: ',user);
            res.render('allappointment', { user: user });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.editUser = (req, res, next) => {
    const userId = req.params.id;
    User.findByPk(userId).then(user => {
        console.log('User : ', user);
        res.render("bookappointment", {
          pageTitle: "Edit User",
          appointmentButton: "Update Appointment",
          user: user,
          path: "/bookappointment/:id",
        });
    }).catch((err) => {
        console.log(err);
    })
}

exports.updateUser = (req, res, next) => {
    const userId = req.params.id;
    const updatedName = req.params.name;
    const updatedEmail = req.params.email;
    const updatedPhone = req.params.phone;
    const updatedDate = req.params.date;
    const updatedTime = req.params.time;
    User.findByPk(userId).then(user => {
        user.name = updatedName;
        user.email = updatedEmail;
        user.phone = updatedPhone;
        user.date = updatedDate;
        user.time = updatedTime;
        user.save();
    }).then(result => {
        console.log('User Updated..!');
    }).catch(err => {
        console.log(err);
    });
}

exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;
    console.log('User Id :',userId);
    User.findByPk(userId).then(user => {
        user.destroy();
    }).then(result => {
        console.log('User Deleted..!');
        res.redirect('/allappointment');
    }).catch(err => {
        console.log(err);
    });
}