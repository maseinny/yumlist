//Messages = new Mongo.Collection('messages');

Places = new Meteor.Collection("places");

Filter = new Meteor.Collection('')

/*Messages.allow({
	insert: function(userId, doc){
		if(!userId){ return false; }

		if(doc._owner !== userId) { return false; }

		return true;
	}
});*/