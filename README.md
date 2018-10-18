ember-cli-styled
==============================================================================

ember-cli add-on for modularizing style implementation.

Installation
------------------------------------------------------------------------------


    ember install ember-cli-styled
    
    
Features
------------------------------------------------------------------------------

* Separate styles by route and/or component
* Automatically apply styles based on the current route

Usage
------------------------------------------------------------------------------

To understand how `ember-cli-styled` works, you must first understand how routes
work in Ember. Whenever you enter or exit a route, the route fires the `activate`
and `deactivate` event, respectively, on the `Route` class. The `deactivate` event, 
if applicable, is always fired before the `activate` event. Likewise, routes (not 
to be mistaken with URL paths) can have child routes. For example, in `a/b/c` then 
`a` route has a child route of `b`, which has a child route of `c`. Each route 
has the option of providing a `{{outlet}}` for which the child route (or template) 
can generate its template code.

In the example route `a/b/c`, Ember will first fire the `activate` on route 
`a`, then fire the `activate` event on route `a/b`, and lastly fire the `activate`
event on route `a/b/c`. 

`ember-cli-styled` uses this behavior to apply and remove style class names that correspond 
to a given route as the user routes around your application. All style class names are 
applied the the `body` HTML element. In the example above, `ember-cli-styled` generate
a `body` element with the following class names:

```html
<body class="route__a route__a-b route__a-b-c">

</body>
```

This allows you to separate styles based on route definitions instead of adding them
all to `app.css` or `app.scss`. For example, if you have styles that are applicable 
to all child routes of `a/b`, like `a/b/c` or `a/b/d`, then you can define it in 
`.route__a-b`.

### Generate Styles for a Route

Use the `style` blueprint to generate the style for a route:

    ember g style [name]
    
For example, here is the command to generate the style for route `a/b/c`:

    ember g style a/b/c
    
This will generate the file `app/styles/routes/a/b/_c.scss`, which will contain
the following contents:

```scss
.route__a-b-c {

}
```    

Now, class names that appear within the scope `.route__a-b-c` will only be applied
when the user enters route `a/b/c`.

### Generate Styles for a Component

Use the `component-style` blueprint to generate the style for a component:

    ember g component-style [name]
    
For example, here is the command to generate the style for component `foo-bar`:

    ember g route foo-bar
    
This will generate the file `app/styles/components/_foo-bar.scss`, which will contain
the following contents:

```scss
.foo-bar {

}
```    

Now, class names that appear within the scope `.foo-bar` will be applied to components
that have `foo-bar` added to its `classNames` property.

Happy Coding!