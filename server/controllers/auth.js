import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (request, response) => {
  const username = request.body[0].username
  const password = request.body[1].password 
  const email = request.body[2].email

  db.query(
      "SELECT username FROM users WHERE username = ?",
      [username],
      (error, result) => {
          if (result.length > 0) {
              response.send({"message": 'User already exists!'})
          } else {
              const saltRounds = 10
              bcrypt.hash(password, saltRounds, (err, hash)=>{
                  db.query(
                      "INSERT INTO users (username, password, email) VALUES(?,?,?)",
                      [username, hash, email],
                      (error, result) => {
                          response.send({"status": response.statusCode})
                      }
                  )
              })
          }
      }
  )

};


export const login = (request, response) => {
    const username = request.body[0].username
    const password = request.body[1].password
    
    db.query(
        "SELECT * FROM users WHERE username = ?",[username],
        (error, result) => {
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (errCompare, resCompare)=> {
                    if (resCompare) {
                        const token = jwt.sign({ id:result[0].id }, "jwtkey")
                        const { password, ...other } = result[0];

                        response
                        .cookie("access_token", token, {
                            httpOnly: true
                        })
                        .status(200)
                        .json(other);
                    } else {
                        response.send({message: "Wrong username or password" })
                    }
                })
            } else {
                response.send({message: "User doesn't exist!"})
            }
        }
    )
};



export const logout = (request, response) => {
    response.clearCookie("access_token", {
      sameSite: "none",
      secure:true
    }).status(200).json("User has been logged out!")
};