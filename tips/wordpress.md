### Hide the Admin Bar in WordPress

<http://davidwalsh.name/hide-admin-bar-wordpress>

> ```
> add_filter('show_admin_bar', '__return_false');
> ```

### Apply Custom CSS to Admin Area

<http://css-tricks.com/snippets/wordpress/apply-custom-css-to-admin-area/>

> Add to the functions.php file:
> 
> ```
> add_action('admin_head', 'my_custom_fonts');
> 
> function my_custom_fonts() {
>   echo '<style>
>     body, td, textarea, input, select {
>       font-family: "Lucida Grande";
>       font-size: 12px;
>     } 
>   </style>';
> }
> ```