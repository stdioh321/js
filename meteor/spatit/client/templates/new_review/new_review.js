Template.add_review_form.events({
    'submit #formAddRating': function(ev) {

        rating = ev.target.rating.value;
        body = ev.target.body.value;

        reviews = {
            rating: rating,
            body: body
        };


        Products.update({ _id: this._id }, {
            $push: {
                reviews: reviews
            }
        });
        FlashMessages.sendInfo("Review added");
        ev.target.reset();
        return false;
    }
});