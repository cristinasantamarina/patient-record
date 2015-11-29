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
      var text = event.target.text.value;
 
      // Insert a task into the collection
      Patients.insert({
        text: text,
        createdAt: new Date() // current time
      });
 
      // Clear form
      event.target.text.value = "";
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
}