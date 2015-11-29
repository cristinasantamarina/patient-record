Patients = new Mongo.Collection("patients");
 
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    patients: function () {
      // Show newest patients at the top
      return Patients.find({}, {sort: {createdAt: -1}});
    }
  });
 
  Template.body.events({
    "submit .new-patient": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var name = event.target.name.value;
 
      // Add a patient to the MongoDB collection
      Patients.insert({
        name: name,
        createdAt: new Date(),            // current time
        owner: Meteor.userId(),           // _id of logged in user
        username: Meteor.user().username  // username of logged in user
      });
 
      // Clear form
      event.target.name.value = "";
    }
  });
 
  Template.patient.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Patients.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Patients.remove(this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Template.registerHelper("prettifyDate", function (event) {
    return new Date().toString('yyyy-MM-dd')
  });

}