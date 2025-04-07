# Assignment Four
## Purpose
1. This project is a RESTful API built with node.js, express, and Mongo DB that lets users signup and signin, add and view movies, write reviews for movies and view movies without without reviews. Some routes are proected with JWT authentication so users need to be signed in to use them. 

2. To install and run it, downllod the project from github and clone it, you can then install the required packages. 

3. Enviorment settings:
PORT=8080
DB=mongodb+srv://new_user:1234@webapi.jmxmx.mongodb.net/?retryWrites=true&w=majority&appName=WebApi
SECRET_KEY=123

4. Link to my postman: 
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/41591769-88c2708b-62ca-452e-832a-0bf9b2692e93?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D41591769-88c2708b-62ca-452e-832a-0bf9b2692e93%26entityType%3Dcollection%26workspaceId%3De90833fa-bd34-43ab-984c-c7a720b65302#?env%5BOmiteru_HW3%5D=W3sia2V5IjoiSldUIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6Im51bGwiLCJjb21wbGV0ZVNlc3Npb25WYWx1ZSI6Im51bGwiLCJzZXNzaW9uSW5kZXgiOjB9LHsia2V5IjoiYXV0aFRva2VuIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6IkpXVC4uLiIsImNvbXBsZXRlU2Vzc2lvblZhbHVlIjoiSldUIGV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNklqWTNaRGMyTWpFd05EbGtPR1UyTVdKaE9UWTNPRGRoTkNJc0luVnpaWEp1WVcxbElqb2lWakF4TWpNaUxDSnBZWFFpT2pFM05ESXhOems1T1Rjc0ltVjRjQ0k2TVRjME1qRTRNelU1TjMwLjNiSXl3TjFHODNsQ1hmdER5RnFXNlpnQ3gzaHg3aGk2VWxKdTNzTGhGZmciLCJzZXNzaW9uSW5kZXgiOjF9XQ==)