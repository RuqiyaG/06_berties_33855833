# Berties Books
A web application using express,ejs and sql with differnt route handlers showing a home page,search page, about page, add books page, book list page and register page for the website that sells books and how to register , search and add books to our system/database. I started initialising the node project by using npm init and then used npm install to install both express and ejs.

Ejs allows you to add dynamic behaviour when making a html file you use .ejs not .html so you can include this dynamic tag <%= %> to embed javascrpt.When embedding make sure you define the variable you are using in your main,js file where the route handlers are otherwise there will be an error and the whole file with semantic tags will show on local host.

Installed mysql on my computer locally and on the virtual server and created a database on there which I later connected to my code so that it can use it, the database info is stored in my create_db.sql file with all the sensitive info which I changed so that is hidden in Week 7 lab. I have another .sql file caleed insert data which contains what books I have added and their price points.

Created a .env file and stored my database credentials that was stated in my code for everyone to see and then added .env to .gitignore so that it will not be pushed to github where anyone can accsess my database.

Added access control to my adding books page and search books page so that if you want accsess to those things you have to register justv so that it feels more exclusive to users.

I also added sanitization to my last name and username as they will be stored in my database and shown in the browser and I want to protect them from hackers who insert harmful HTML.

To start this application locally you need to open up the terminal and input node index.js and the console should tell you its running on localhost:800 To view it on the virtual server/online just head over to my links file and click the links.


