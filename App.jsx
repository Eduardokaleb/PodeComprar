import { useState } from 'react'
import axios from 'axios';

function getAnosApartir1950() {
  const anoLimite = 1950;
  let anoReferencia = new Date().getFullYear();

  const anos = [];

  do {
    anos.push(anoReferencia);
    anoReferencia--;
  } while (anoReferencia >= anoLimite)
  return anos;
}

import axios from 'axios';

axios({
    method: 'get',
    url: 'http://localhost:3002/pode-comprar',
    data: {
      anoNascimento: "2006",
      pais: 'BR',
    }
  }).then((response) => {
    console.log(response.data);
  });


function App() {

  const [pais, setPais] = useState('');
  const [anoNascimento, setAnoNascimento] = useState('');

  const getPaises = () => {
    return [
      {
        descricao: 'Brasil',
        id: 'BR',
      },
      {
        descricao: 'Japão',
        id: 'JP',
      },
      {
        descricao: 'Estados Unidos',
        id: 'EUA',
      }
    ]
  }

  
  function handleOnClick() {
    let podeComprar;
    const idade = new Date().getFullYear() - Number(anoNascimento);

    switch(pais) {
      case 'BR':
        podeComprar = idade >= 18;
        break;
      case 'JP':
        podeComprar = idade >= 19;
        break;
      case 'EUA':
        podeComprar = idade >= 21;
        break;
      default:
        podeComprar = false;
        break;
    }
    if(podeComprar) {
      alert('Você pode comprar alcool');
    } else {
      alert('Você não pode comprar alcool');
    }
  }


  return (
    <>
      <h1>Pode Comprar?</h1>
      <label for="pais">País:</label>
      <br />
      <select name="pais" id="pais" onChange={(event) => {
        setPais(event.target.value)
      }}>
        <option value="" disabled selected>Selecione</option>
        {
          getPaises().map(pais => (
            <option value={pais.id}>{pais.descricao}</option>
          ))
        }
      </select>
      <br />
      <label for="ano">Ano Nascimento:</label>
      <br />
      <select name="ano" id="ano" onChange={(event) => {
        setAnoNascimento(event.target.value)
      }}>
        <option value="" disabled selected>Selecione</option>
        {
          getAnosApartir1950().map(ano => (
            <option value={ano}>{ano}</option>
          ))
        }
      </select>
      <br />
      <button disabled={pais === '' || anoNascimento === ''} onClick={handleOnClick}>Consultar</button>
    </>
  )
}

export default App
