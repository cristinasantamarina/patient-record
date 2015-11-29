if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    patients: [
      { text: "This is patient 1" },
      { text: "This is patient 2" },
      { text: "This is patient 3" }
    ]
  });
}