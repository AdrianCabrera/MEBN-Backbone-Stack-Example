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
 var Blogs = Backbone.Collection.extend({
 	url: 'http://localhost:3000/api/blogs'
 });




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
 	events:{
 		'click .edit-blog': 'edit',
 		'click .update-blog': 'update',
 		'click .cancel-blog': 'cancel',
 		'click .delete-blog': 'delete'
 	},
 	edit: function(){
 		this.$('.edit-blog').toggleClass('hidden');
 		this.$('.delete-blog').toggleClass('hidden');
 		this.$('.update-blog').toggleClass('hidden');
 		this.$('.cancel-blog').toggleClass('hidden');

 		var author  = this.$('.author').html();
 		var title  = this.$('.title').html();
 		var url  = this.$('.url').html();

 		this.$('.author').html('<input type="text" class="form- control author-update" value="'+author+'" />');
 		this.$('.title').html('<input type="text" class="form- control title-update" value="'+title+'" />');
 		this.$('.url').html('<input type="text" class="form- control url-update" value="'+url+'" />');
 	},
 	update: function(){
 		this.model.set('author',$('.author-update').val());
 		this.model.set('title',$('.title-update').val());
 		this.model.set('url',$('.url-update').val());
 	},
 	cancel: function(){
 		blogsView.render();
 	},
 	delete: function(){
 		this.model.destroy();
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
 		var self=this;
 		this.model.on('add', this.render, this);
 		this.model.on('change', function(){
 			setTimeout(function(){
 				self.render();
 			},30)
 		}, this);
 		this.model.on('remove', this.render, this);

 		// Initialize from DB
 		this.model.fetch({
 			success: function(response){
 				_.each(response.toJSON(),function(item){
 					console.log('Successfully GOT blog with :id: '+item._id);
 				})
 			},
 			error:function(){
 				console.log("Failed to get blogs!");
 			}
 		});
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
 		$('.author-input').val('');
 		$('.title-input').val('');
 		$('.url-input').val('');
 		blogs.add(blog);

 		blog.save(null,{
 			success:function(response){
 				console.log("Successfully saved blog with _id: "+response.toJSON()._id);
 			},
 			error:function(){
 				console.log("Failed to save blog!");
 			}
 		});
 	});
 });