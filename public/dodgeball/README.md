run **npm install**
 
**npm start** or **yarn start**

 Runs the app in development mode.

 Then: open http://localhost:3000/ to view Home Page.
 Then: open http://localhost:3000/introduction to view Introduction Page.
 Then: open http://localhost:3000/step to view Step Page.

 The page will reload if you make edits.
 You will see the build errors and lint warnings in the console

**npm run build** or **yarn build**
 
 Builds the app for production to the build folder.
 It correctly bundles React in production mode and optimizes the build for the best performance.
 
 The build is minified and the filenames include the hashes.
 By default, it also includes a service worker so that your app loads from local cache on future visits.

**create .htaccess file**

 Create in your build derictiory .htaccess file and write in it:

```
RewriteEngine On

RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]

RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d

RewriteRule ^ - [L]

RewriteRule ^ /index.html [L]


```
Your app is ready to be deployed.