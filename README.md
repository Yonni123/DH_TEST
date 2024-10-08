# DH_TEST
 
The `FrontEnd` directory has a single react app, to run it, open a terminal, navigate into the `FrontEnd/react_app` and run `npm start`

The `FrontEnd` directory has an entire Visual Studio resolution, I suggest opening it in Visual Studio via File → Open → Project/Resolution and then select `BackEnd/HD_Backend.sln` 

Before running the backend, make sure to modify the `DHConnection` string in `Backend/DH_Backend/appsettings.json` in order to correctly be able to connect to the database. Also, make sure your database has a table called `dbo.Contacts` with these rows:
- Name (nchar(50))
- Phone (nchar(10))
- ID (`Primary Key`, int)