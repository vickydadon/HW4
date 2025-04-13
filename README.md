# Assignment Four
## Purpose
1. This project is a RESTful API built with node.js, express, and Mongo DB that lets users signup and signin, add and view movies, write reviews for movies and view movies without without reviews. Some routes are proected with JWT authentication so users need to be signed in to use them. 

2. To install and run it, downllod the project from github and clone it, you can then install the required packages. 

3. Enviorment settings:
PORT=8080
DB=mongodb+srv://new_user:1234@webapi.jmxmx.mongodb.net/?retryWrites=true&w=majority&appName=WebApi
SECRET_KEY=123

4. Link to my postman: 
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/41591769-88c2708b-62ca-452e-832a-0bf9b2692e93?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D41591769-88c2708b-62ca-452e-832a-0bf9b2692e93%26entityType%3Dcollection%26workspaceId%3De90833fa-bd34-43ab-984c-c7a720b65302#?env%5BOmiteru_HW3%5D=W3sia2V5IjoiSldUIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6IkpXVC4uLiIsImNvbXBsZXRlU2Vzc2lvblZhbHVlIjoiSldUIGV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNklqWTNabUZtWXpjME56TTVPRGd6TURBMk5ETXpNR0ZsTWlJc0luVnpaWEp1WVcxbElqb2lWakFpTENKcFlYUWlPakUzTkRRMU1ESTBOVFlzSW1WNGNDSTZNVGMwTkRVd05qQTFObjAuRlFHQThHRnZaNUtzRDg1RlBUU19mOHdXTXozY2Q5UDFjM1hiWE5Sckk5MCIsInNlc3Npb25JbmRleCI6MH0seyJrZXkiOiJhdXRoVG9rZW4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiSldULi4uIiwiY29tcGxldGVTZXNzaW9uVmFsdWUiOiJKV1QgZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2SWpZM1pEYzJNakV3TkRsa09HVTJNV0poT1RZM09EZGhOQ0lzSW5WelpYSnVZVzFsSWpvaVZqQXhNak1pTENKcFlYUWlPakUzTkRJeE56azVPVGNzSW1WNGNDSTZNVGMwTWpFNE16VTVOMzAuM2JJeXdOMUc4M2xDWGZ0RHlGcVc2WmdDeDNoeDdoaTZVbEp1M3NMaEZmZyIsInNlc3Npb25JbmRleCI6MX1d)