import "./App.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { api } from "./api";
import { useState } from 'react';

function App() {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('mundial');
  const [data, setData] = useState('');

  const registrar = () => {
    const values = {
      name: nome,
      type: tipo,
      date_holy: data
    };

    try {
      api.post("/register_holyday", values).then((response) => {
        
        if (response) {
          console.log(response);
        } else {
          alert("erro");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className="body">
    <div className="mainbody">
        <form>
          <div className="forminputs">
            <p>Nome do feriado</p>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
            />

            <p>Abrangência</p>
            <select
              name="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="mundial">Mundial</option>
              <option value="nacional">Nacional</option>
              <option value="estadual">Estadual</option>
              <option value="regional">Regional</option>
              <option value="municipal">Municipal</option>
            </select>

            <p>Data do feriado</p>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />

            <input
              type="button"
              value="Registrar"
              onClick={registrar}
            />
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default App;
