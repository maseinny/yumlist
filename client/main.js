Template.restaurantList.helpers({

	places: function(){
		if (Session.get('status') != null && Session.get('status') != 'all'){
			return Places.find({status: Session.get('status')}, {sort: {timestamp: -1}});
		}
		else {
			return Places.find({}, {sort: {timestamp: -1}}); 
		};
		if (Session.get('rating') != null && Session.get('rating') != 'all'){
			return Places.find({status: Session.get('rating')}, {sort: {timestamp: -1}});
		}
		else {
			return Places.find({}, {sort: {timestamp: -1}}); 
		}
	},

	prettyTime: function(){
		return moment(this.timestamp).format('LTS');
	},

	showDetailsSection: function(){
		return Session.get('showDetails');
	}

});


Template.restaurantList.events({
	'click .placeRow': function(e, tmpl){
		console.log('clicked row! ' + this._id);
		dataToModal = {
			id: tmpl.data._id
		};
		console.log(tmpl.data._id);
		Blaze.renderWithData(Template.detailsEditModal, dataToModal, document.body)
	}, 
	'click .delete': function() {
		Places.remove(this._id);
	}
});

Template.detailsEditModal.onRendered(function(){
	var tmpl = this;
	$("#modal-selector").modal(); //Launch the modal
	console.log(tmpl.data); 
})

Template.addForm.events({
	'click h5': function(e){
		$('.well').show();
		$('h5').hide();
	},

	'click a.close': function(e){
		$('.well').hide();
		$('h5').show();
	},

	'click button': function(e){
		var place = $('input[data-field=place]').val();
		var location = $('input[data-field=location]').val();
		var status = $('select[data-field=status]').val();
		var rating = $('select[data-field=rating]').val();
		var price = $('select[data-field=price]').val();

		/*Get values
		var place = $('input[data-field=place]').val();
		var status = $('input[data-field=status]').val();
		var rating = $('input[data-field=rating]').val();*/

		//Insert into DB
		Places.insert({
			place: place,
			location: location,
			status: status,
			rating: rating,
			price: price,
			timestamp: new Date()
		});

		//Reset Fields
		$('input[data-field=place]').val('').focus();
		$('input[data-field=location]').val('').focus();
		$('select[data-field=status]').val('').focus();
		$('select[data-field=rating]').val('').focus();
		$('select[data-field=price]').val('').focus();
	}
});


Template.placesFilter.events({
	'change select.statusFilter': function(e, template){
		return Session.set("status", $('select.statusFilter').val());
	},
	'change select.ratingFilter': function(e, template){
		return Session.set("rating", $('select.ratingFilter').val());
		console.log(Session.get('rating'));
	} 
});

/*Template.placesFilter.helpers({
	options: function(){
		var locationArray = Places.find({location});
		console.log(locationArray);
	}
});*/

Template.priceCode.events({
	'click h6': function(e){
		$('.price-table').show();
	},
	'click .table-close': function(e) {
		$('.price-table').hide();
	}
})