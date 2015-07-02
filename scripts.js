/**
 * [Blog Backbone Model]
 * @type {[Backbone.Model]}
 */
var Blog = Backbone.Model.extend({
	defaults: {
		author:"",
		title:"",
		url:""
	}
});

/**
 * [Blogs Backbone Collection]
 * @type {[Backcbone.Collection]}
 */
var Blogs = Backbone.Collection.extend({});

//Instantiate blogs

var blog1 = new Blog({ author:"Adrián 1", title: "Adrian's Blog 1",url:"test1.com"});

var blog2 = new Blog({ author:"Adrián 2", title: "Adrian's Blog 2",url:"test2.com"});


// Instantiate a Collection

var blogs= new Blogs([blog1,blog2]);