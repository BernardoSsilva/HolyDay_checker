import express from "express";
import { database } from "./model/database";
import { createConnection } from "mysql";
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) =>{
    database.query("select * from holydays", (err, response)=>{
        if(err){
            console.log("erro ao selecionar");
        } else {
            console.log(response);
        }
    })
})

app.post('/register_holyday', (req, res) =>{
    const { name, type, date_holy, const_day } = req.body;

    const queryData = {
        name,
        type,
        date_holy,
        const_day
    };
        database.query("insert into holydays set ?", queryData, (err, results, fields) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao inserir no banco de dados' });
            }
    
            console.log(results.insertId);
            res.status(200).json({ message: 'Dados inseridos com sucesso!' });
    })
})




app.listen(3001, () =>{
    console.log("listen on port 3001")
});