import { createConnection } from "mysql";

export const database = createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "holyday_checker"
})

database.connect((err) => {
    if(err){
        console.log("erro ao conhectar: "+err);
    } else{
        console.log("iniciado com sucesso");
    }
})

