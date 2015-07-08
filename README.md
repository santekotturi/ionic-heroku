### Deploy ionic app to heroku as angular webapp

1. this is meant as a proof of concept
2. I think this should only be done to apps that have been designed for larging screens (ionic grid provides the ability to make this responsive)
3. this is based off of http://awaxman11.github.io/blog/2014/07/13/how-to-create-an-angular-app-using-yeoman-and-deploy-it-to-heroku/
4. this does not follow some best practices including minifying your code. 
5. but it works! 

start an ionic app: 
`ionic start starter sidemenu`
cd into it
`cd starter`
add the neccessary npm modules for the server:
`npm install gzippo express morgan --save`

create the server file in your root directory /web.js:
```
var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/www"));
app.listen(process.env.PORT || 5000); 
```

create the Procfile in your root directory /Procfile: 
`web: node web.js`

using the Heroku toolbelt (install from Heroku's site)
`heroku create`

One of the most important steps is to 'remove' a bunch of the cordova files because Heroku doesn't need them and it'll only bloat youre web app. 
your git ignore should contain at least the following: 
```
node_modules/
platforms/
plugins/
config.xml
scss/
hooks/
```

Although ideally you'd also remove all the cordova plugins and cordova platforms from your package.json
I'm pretty new to heroku and can't figure out if their build script ignore these by default or if you should manually do this. 
In the future I'll update with a gruntfile that specifically builds just the files you need allowing you leave your ionic code untouched and just push what you need to heroku. 

My understanding of poking around is that you only need the /www directory, your server web.js file, the Procfile and your package.json file. 



```
git add .
git commit -m "Create angular app using Yeoman"
git push heroku master
```

then just scale up one dyno:
`heroku ps:scale web=1`

and open your app: 
`heroku open`

