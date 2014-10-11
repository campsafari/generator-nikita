define("<%= path %><%= initName %>", ["jquery", "backbone"], function($, Backbone){


        var <%= initName %>View = Backbone.View.extend({

            // View constructor
            initialize: function() {

                this.render();

            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                //this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                //this.$el.html(this.template);

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return <%= initName %>View;

    }

);
