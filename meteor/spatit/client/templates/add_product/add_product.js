Template.add_product.helpers({
    categoriesDB() {
        return Categories.find({});
    }
});

Template.add_product.events({
    "submit #addProductForm": function(ev) {
        file = ev.target.prodImg.files[0];
        tmpInsert = {
            name: ev.target.nam.value,
            categories: ev.target.category.value,
            desc: ev.target.desc.value,
            is_featured: (ev.target.feature.value == "true") ? true : false
        };
        if (file) {
            fsFile = new FS.File(file);
            ProductImages.insert(fsFile, function(err, result) {
                if (!err) {
                    var img = "/cfs/files/ProductImages/" + result._id;
                    window.resFS = result;
                    tmpInsert.prodImg = img;
                    Products.insert(tmpInsert, handlerAddProduct);
                }
            });
        } else {
            var img = "/img/noimage.png";
            tmpInsert.prodImg = img;
            Products.insert(tmpInsert, handlerAddProduct);
        }
        ev.target.reset();
        return false;
    }
});

function handlerAddProduct(err, result) {
    if (err) {
        FlashMessages.sendError("Some data is Wrong");
        console.log(err);
    } else {
        FlashMessages.sendSuccess("Product Added");
        Router.go('/products');
    }
}