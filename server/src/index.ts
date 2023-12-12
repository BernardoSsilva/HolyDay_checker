import express from "express";
import { database } from "./model/database";
import { createConnection } from "mysql";
import bodyParser from 'body-parser';
import cors from 'cors'



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.get('/', (req,res) =>{
    database.query("select * from holydays", (err, response)=>{
        if(err){
            console.log("erro ao selecionar");
        } else {
            console.log(response);
        }
    })
})

app.post('/register_holyday', (req, res) => {
    const { name, type, date_holy } = req.body;

    // Validação de dados
    if (!name || !type || !date_holy) {
        return res.status(400).json({ error: 'Dados incompletos ou inválidos' });
    }

    console.log("chegou")
    const queryData = {
        name,
        type,
        date_holy
    };

    database.query("INSERT INTO holydays SET ?", queryData, (err, results, fields) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao inserir no banco de dados' });
        }

        console.log(results.insertId);
        res.status(200).json({ message: 'Dados inseridos com sucesso!' });
    });
});




app.listen(3001, () =>{
    console.log("listen on port 3001")
});