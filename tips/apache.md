# apache

### 403 forbidden: permission to access images

<http://stackoverflow.com/questions/9173880/403-forbidden-permission-to-access-images>

```
you should check file permissions for /v2/wp-content/themes/default/images/contact-yellow-icon.png

i think they should be 644 so that all can read that file

or you can check file permissions of /v2/wp-content/themes/default/images/contact-innovation-logo.png

you can change permissions with ftp manager or with shell

** updated by Eric Leroy if file permissions 644 does not work, change to 755 that is what I used to fix the issue. If you are not familiar on how to do this on *inx based, and mac systems, here is how: Open terminal and navigate to the parent folder of the images. type sudo chmod -R 775 (then type the name of your images folder after 775 ) it will ask you for your password, then your images will work on your website.
```