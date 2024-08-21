import express from "express"
import { dirname } from "path"
import { fileURLToPath } from "url"
import bodyParser from "body-parser"
import { error } from "console";

const _dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));

var logInEmail = ["jeromeabelida19@gmail.com"];
var logInPassword = ["123"];

var insideEmail;
var insidePassword;

var count = 1;
var title = undefined;
var description = undefined;

app.get("/", (req, res) => {
    console.log(insideEmail);
    console.log(insidePassword);
    res.render("home.ejs", {
        email: insideEmail,
        password: insidePassword
    });
})

app.get("/signup", (req, res) => {
    res.render("signUp.ejs")
});

app.get("/login", (req, res) => {
    res.render("login.ejs")
});

app.get("/blog",(req, res) => {
    console.log(title);
    console.log(description);
    res.render("blog.ejs", {
        headerTitle: title,
        postDescription: description,
        email: insideEmail,
        password: insidePassword
    });
})

app.get("/about", (req, res) => {
    res.render("about.ejs", {
        email: insideEmail,
        password: insidePassword
    });
}); 

app.get("/contact", (req, res) => {
    
    res.render("contact.ejs", {
        email: insideEmail,
        password: insidePassword
    });
})
 
app.post("/login",(req, res) => {   // Login An Account
    insideEmail = req.body["Email"];
    insidePassword = req.body["Password"];
    console.log(insideEmail);
    console.log(insidePassword)
    if(logInEmail[0] == req.body["Email"] && logInPassword[0] == req.body["Password"]) {
        res.render("home.ejs", {
            email: insideEmail,
            password: insidePassword
        });
    }
} )

app.post("/submit", (req, res) => {   //Submit A Post
    title =[];
    description = [];
    title.push(req.body["title"]);
    description.push(req.body["postDescription"])
    console.log(title);
    console.log(description);
    res.render("blog.ejs", {
        headerTitle: title,
        postDescription: description,
        email: insideEmail,
        password: insidePassword,
        postID: count
    });
})

app.get("/log-out", (req, res) => {   // Log-out An Account
    insideEmail = undefined;
    insidePassword = undefined;
    res.render("home.ejs")
})

app.get("/edit", (req, res) => {      // editing your post
    console.log("/edit")
    res.render("edit.ejs", {
        headerTitle: title,
        postDescription: description,
        email: insideEmail,
        password: insidePassword,
    });
});

app.post("/done", (req, res) => {
    title =[];
    description = [];
    title.push(req.body["title"]);
    description.push(req.body["postDescription"]);

    res.render("blog.ejs", {
        headerTitle: title,
        postDescription: description,
        email: insideEmail,
        password: insidePassword,
    })
})

app.get("/delete",(req, res) => {     // Delete A Post
    title = undefined;
    description= undefined;
    count = 0;

    res.render("blog.ejs", { 
        email: insideEmail,
        password: insidePassword
    });
})


app.listen(port, () => {
    console.log("Sever is listening in port 3000");
});
