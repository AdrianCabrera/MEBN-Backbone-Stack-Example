'use strict'

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




// // Instantiate blogs
// /**
//  * [blog1,blog2 Blog objects (Model)]
//  * @type {Blog}
//  */
//  var blog1 = new Blog({ author:"Adrián 1", title: "Adrian's Blog 1",url:"test1.com"});
//  var blog2 = new Blog({ author:"Adrián 2", title: "Adrian's Blog 2",url:"test2.com"});





// Instantiate a Collection
/**
 * [blogs Blogs object (Collection)]
 * @type {Blogs}
 */
 //var blogs= new Blogs([blog1,blog2]);
 var blogs= new Blogs();



/**
 * [BlogView Backbone View for one blog]
 * @type {[Backbone View]}
 */
 var BlogView = Backbone.View.extend({
 	model: new Blog(),
 	tagName: 'tr',
 	initialize: function(){
 		this.template = _.template($('.blogs-list-template').html());
 	},
 	render: function(){
 		this.$el.html(this.template(this.model.toJSON()));
 		return this;
 	}
 });

/**
 * [BlogsViews Backbone View for all blogs]
 * @type {[type]}
 */
 var BlogsViews = Backbone.View.extend({
 	model: blogs,
 	el: $('.blogs-list'),
 	initialize: function(){
 		this.model.on('add', this.render, this);
 	},
 	render: function(){
 		var self = this;
 		this.$el.html('');
 		_.each(this.model.toArray(), function(blog){
 			self.$el.append((new BlogView({model:blog})).render().$el);
 		});
 		return this;
 	}
 });


 var blogsView = new BlogsViews();

 $(document).ready(function() {
 	$('.add-blog').on('click',function(){
 		var blog= new Blog({
 			author: $('.author-input').val(),
 			title: $('.title-input').val(),
 			url: $('.url-input').val()
 		});
 		blogs.add(blog);
 		$('.author-input').val('');
 		$('.title-input').val('');
 		$('.url-input').val('');
 	});
 });