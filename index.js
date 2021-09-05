var express = require("express");
var app = express();
const rateLimit = require("express-rate-limit");
const { Client } = require("cassandra-driver");
// const crypto = require('crypto');
var uuid = require('uuid');
const cors = require('cors');

const config = require('./config.json');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  
  //  apply to all requests
  app.use(limiter);
  app.use(cors());
  app.use(express.urlencoded());

  // Parse JSON bodies (as sent by API clients)
  app.use(express.json());


//  NOTE THAT AUTHENTICATION FUNCTIONALITY FOR DEMO PURPOSE ONLY
// ENCRYPTION IS TO BE ADDED
  app.post("/login",async (req,res)=>{
    console.log(req.body);
      var email = "dcdevesh3@gmail.com";
      var pwd = "enigma911";      
    const rs = await client.execute("SELECT email FROM alekha.users WHERE email='"+email+"' AND password='"+pwd+"' ALLOW FILTERING");
    console.log(rs);
    console.log(Object.keys(rs))
     console.log(rs.rows);
    res.send({statusCode:200 ,"data":rs.rows })
  });

//  NOTE THAT AUTHENTICATION FUNCTIONALITY FOR DEMO PURPOSE ONLY
// ENCRYPTION IS TO BE ADDED
  app.post("/signup",async (req,res)=>{
    console.log(req.body);
      var email = "dcdevesh3@gmail.com";
      var pwd = "enigma911";      
      var inset = await client.execute("INSERT INTO alekha.users (id, email, password) VALUES (" + uuid.v4() + ",'" + req.body.email +"','"+ req.body.password +"')");
      console.log("inset ");
      console.log(inset);
    res.send({statusCode:200 })
  });

  app.post("/savechart",async (req,res)=>{
    console.log(req.body);
            
      var inset = await client.execute("INSERT INTO alekha.charts (id, email, chartOptions, title) VALUES (" + uuid.v4() + ",'" + req.body.email +"','"+ req.body.options +"','"+ req.body.title + "')");
      console.log("inset ");
      console.log(inset);
    res.send({statusCode:200 })
  });

  app.post("/getcharts",async (req,res)=>{
    console.log(req.body);     
    const rs = await client.execute("SELECT email,chartOptions,title FROM alekha.charts WHERE email='"+req.body.email +"' ALLOW FILTERING");
    console.log(rs);
    res.send({statusCode:200 ,"data":rs.rows})
  });


//   const client = new Client({
//     cloud: { secureConnectBundle: './secure-connect-dvshc7.zip' },
//     credentials: { username: config.Client_Id, password: config.Client_Secret }
//   });

//   client.connect().then((res)=>{
//     console.log("res");  
//     console.log(res);
//   })



  async function run() {
    const client = new Client({
        cloud: { secureConnectBundle: './secure-connect-dvshc7.zip' },
        credentials: { username: config.Client_Id, password: config.Client_Secret }
      });
  
    await client.connect();
  
    // Execute a query
    const rs = await client.execute('SELECT * FROM system.local');
    console.log(`Hello from cluster: ${rs.first()['cluster_name']}`);

    // var ct = await client.execute('CREATE TABLE alekha.users ( id UUID PRIMARY KEY, email text, password text )');
    //   console.log("ct || ");
    //   console.log(ct);

     var ct = await client.execute('CREATE TABLE alekha.charts (id UUID PRIMARY KEY, email text, chartOptions text, title text )');
       console.log("ct || ");
       console.log(ct);

    console.log(uuid.v4());

    // var inset = await client.execute("INSERT INTO alekha.users (id, email, password) VALUES (559dccee-d2e0-497e-a955-fc17f3e84849,'devesh7@protonmail.com','enigma911')");
    //    console.log("inset ");
    //    console.log(inset);

    // await client.shutdown();
  }
  
  // Run the async function
//    run();
const client = new Client({
    cloud: { secureConnectBundle: './secure-connect-dvshc7.zip' },
    credentials: { username: config.Client_Id, password: config.Client_Secret }
  });

client.connect();

  app.listen(3000,()=>{
      console.log("CODE INIT");
  });

