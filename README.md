# TrackIT-server

TrackIT-server is Node API built soly to communicate with TrackIT mobile app (Android & iOS).

### Server functions
TrackIT-server is built having two main features in mind:

- syncing user local datbase with server
- declaring user ```infected``` by admin

### Routes

Server defualt route is: ```/api/user```.
Server endpoints are:
- ```/singup``` for creating user
- ```/admin``` for creating admin user
- ```/syncing``` for syncing local database with server **```authentication```**
- ```/infected```  for declaring userID infected **```authentication & autherization```**

### Stack

API was built using :
- Node 
- MongoDB 
- node_modules

## Buy us coffee

We have invested a lot time in building this app and implementing new features to it, so we would really appricate if you would take moment and
<br><br>
<a href="https://www.buymeacoffee.com/nedimf" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-blue.png" alt="Buy Me A Coffee" width="150" height="30" ></a>

#### MIT License

```
Copyright (c) 2020 TechAvangers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

