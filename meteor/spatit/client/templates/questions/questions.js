Template.questions.helpers({
    DB() {
        if (Questions.find({}).fetch().length > 0) {
            return Questions.find({});

        } else {
            return null;
        }
    }
});
Template.questions.events({
    'click .remove': function(ev) {
        Questions.remove(this._id);
    }
});