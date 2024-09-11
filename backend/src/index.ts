import { ExpressAuth } from "@auth/express"
import Cognito from "@auth/express/providers/cognito"
import GitHub from "@auth/express/providers/github"
import express, { NextFunction, Request, Response } from "express"
 
import { getSession } from "@auth/express"
import { AuthConfig } from "@auth/core"
import http_api from "@auth/express/lib/http-api-adapters"
import { request } from "http"
import { createProxyMiddleware } from "http-proxy-middleware"
const app = express()
const fs = require('fs');
console.log(process.env)
// const server = require('https').createServer({
//     key: fs.readFileSync('./src/keys/privatekey.pem'),
//     cert: fs.readFileSync('./src/keys/cert.pem'),
// }, app)

// const allowCrossDomain = function(req, res, next) {
//   const allowedOrigins = ['http://localhost:8100', 'http://localhost', 'capacitor://localhost', 'http://192.168.1.14:8100', "http://172.29.156.208:8100", "https://halt.a.pinggy.link"];
//   const origin = req.headers.origin;

//   console.log({origin})
//   // if (allowedOrigins.includes(origin)) {
//   //   console.log('match', {origin})
//   res.setHeader('Access-Control-Allow-Origin', "https://halt.a.pinggy.link");
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   // }

//   // res.header('Access-Control-Allow-Origin', '*')
//   // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//   // res.header('Access-Control-Allow-Credentials', 'true')

//   // intercept OPTIONS method
//   if ('OPTIONS' === req.method) {
//     res.send(200)
//   } else {
//     next()
//   }
// }

// app.use(allowCrossDomain)
const useSecureCookies = true;
const authConfig:AuthConfig = {
  
  // skipCSRFCheck: true,
  trustHost: true,

  providers: [ Cognito, GitHub ] ,
}
// app.use('/f', createProxyMiddleware({
//   target: 'http://localhost:5173', // Viteの開発サーバーのURLとポート
//   changeOrigin: true,
// }));


 
// If app is served through a proxy, trust the proxy to allow HTTPS protocol to be detected
// https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', true)
app.get("/", (req, res) => res.send("Hello World!"))
app.use("/auth/*", ExpressAuth(authConfig))
export async function authSession(req: Request, res: Response, next: NextFunction) {
  // req.protocol = "https"
  const session = await getSession(req, authConfig)
  console.log({session})
  res.locals.session = session
  next()
}
app.use(authSession)
//  export async function authenticatedUser(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const session = res.locals.session ?? (await getSession(req, authConfig))
//   if (!session?.user) {
//     res.redirect("/login")
//   } else {
//     next()
//   }
// }


// app.get("/auth/profile", authenticatedUser, (req, res) => {
//   const { session } = res.locals
//   res.render("profile", { user: session?.user })
// })
 

// Now in your route
app.get("/", (req, res) => {
  const { session } = res.locals
  res.render("index", { user: session?.user })
})

app.post("/api/me", (req, res) => {
  console.log(req.headers)
  console.log("hooooooooooooo")
  const { session } = res.locals
  console.log({
    user: session?.user
  })
  res.json({ user: session?.user })
})

app.get("/api/me", (req, res) => {
  console.log(req.headers)
  console.log("hooooooooooooo")
  const { session } = res.locals
  console.log({
    user: session?.user
  })

  res.json({ user: session?.user })
})
app.listen(3000, () =>{
  console.log(`
  🚀 Server ready at: http://localhost:3000
  ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
})