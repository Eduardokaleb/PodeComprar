import { useState } from 'react'
import { getAnosApartir1950 } from './getAnosApartir1950';
import axios from 'axios';


function App() {

  const [pais, setPais] = useState('');
  const [anoNascimento, setAnoNascimento] = useState('');
  const [carregando, setCarregando] = useState(false);

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

  async function consultarDados() {
    setCarregando(true);
    const response = await axios.post('http://localhost:3002/pode-comprar', {
      anoNascimento,
      pais,
    });
    const { data } = response;
    setCarregando(false);
    return data.podeComprar;
  }

  async function handleOnClick() {
    let podeComprar = await consultarDados();
    setTimeout(() => {
      if(podeComprar) {
        alert('Você pode comprar alcool');
      } else {
        alert('Você não pode comprar alcool');
      }
    }, 10);
  }


  return (
    <>
    <div className="container">
      <div className="alls">
        <h1>Pode Comprar?</h1>
        <div className="pais">
          <label htmlFor="pais">País:</label>
          <br />
          <select
            name="pais"
            id="pais"
            onChange={(event) => setPais(event.target.value)}
            value={pais}
          >
            <option value="" disabled>Selecione</option>
            {getPaises().map(pais => (
              <option key={pais.id} value={pais.id}>{pais.descricao}</option>
            ))}
          </select>
        </div>
        <br />
        <div className="ano">
          <label htmlFor="ano">Ano de Nascimento:</label>
          <br />
          <select
            name="ano"
            id="ano"
            onChange={(event) => setAnoNascimento(event.target.value)}
            value={anoNascimento}
          >
            <option value="" disabled>Selecione</option>
            {getAnosApartir1950().map(ano => (
              <option key={ano} value={ano}>{ano}</option>
            ))}
          </select>
        </div>
        <br />
        <nav className="consulta">
      
        <button disabled={pais === '' || anoNascimento === ''} onClick={handleOnClick}>
        {carregando ? 'carregando...' : 'Consultar'}
        </button>
        </nav>
      </div>
    </div>
  </>
      
 
  )
}

export default App
