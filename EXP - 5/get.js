var http = require('http');
var url = require('url');
var querystring = require('querystring');

function onRequest(req, res) {
    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;
    console.log('Request for ' + path + ' received');

    var qs = parsedUrl.query;
    var name = qs["name"];
    var id = qs["id"];
    var gender = qs["gender"];
    var branch = qs["branch"];
    var mobileno = qs["mobileno"];
    var address = qs["address"];

    var htmlResponse = `
        <html>
        <head>
            <title>Employee Details</title>
            <style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
    }
    table {
        width: 80%;
        margin: auto;
        border-collapse: collapse;
        border: 2px solid #3498db; /* Border color for the table */
        border-radius: 10px; /* Border radius for the table */
    }
    th, td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: left;
        background-color: #f2f2f2;
        color: #333;
    }
    th {
        background-color: #3498db; /* Header background color */
        color: white;
    }
    tr:nth-child(even) {
        background-color: #e5e5e5; /* Alternate row background color */
    }
    .center {
        text-align: center;
    }
    h1 {
        margin-top: 20px;
        margin-bottom: 20px;
        color: #3498db;
    }
</style>

        </head>
        <body>
            <h1 style="text-align: center;">Employee Details</h1>
            <table border="10">
                <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Gender</th>
                    <th>Branch</th>
                    <th>Mobile No</th>
                    <th>Address</th>
                </tr>
                <tr>
                    <td>${name}</td>
                    <td>${id}</td>
                    <td>${gender}</td>
                    <td>${branch}</td>
                    <td>${mobileno}</td>
                    <td>${address}</td>
                </tr>
            </table>
        </body>
        </html>
    `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(htmlResponse);
    res.end();
}

http.createServer(onRequest).listen(8000);
console.log('Server is running on port 8000...');