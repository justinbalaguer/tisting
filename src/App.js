import './App.css';
import { useState } from 'react';

const axios = require('axios')

const App = () => {

  const [address, setAddress] = useState('')
  const [axies, setAxies] = useState()
  const [data, setData] = useState()
  const [disable, setDisable] = useState(false)

  const options = {
    headers: {
      'x-rapidapi-host': 'axie-infinity.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_API_KEY
    }
  }

  const trackAxie = () => {
    setDisable(true)
    getAxies()
    getData()
    setDisable(false)
  }

  const getAxies = () => {
    const formatAddress = address.includes('ronin') ? address.replace('ronin:', '0x') : address
    axios.get(`https://axie-infinity.p.rapidapi.com/get-axies/${formatAddress}`, options)
      .then(response => {
        setAxies(response.data)
      })
      .catch(error => {
        console.log(`error: ${error}`)
      })
  }

  const getData = () => {
    axios.get(`https://game-api.axie.technology/api/v1/${address}`)
    .then(response => {
      setData(response.data)
    })
    .catch(error => {
      console.log(`error: ${error}`)
    })
  }
  
  return (
    <div className="App">
      <input type='text' onChange={e => setAddress(e.target.value)} />
      <button onClick={trackAxie} disabled={disable}>Add</button>
      <hr/>
      <table role='grid'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>MMR</th>
            <th>Total SLP</th>
            <th>Last claim</th>
            <th>Next claim</th>
            <th colSpan={3}>Axies</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {
              data && (
                <>
                  <td>{data.name}</td>
                  <td>{address}</td>
                  <td>{data.mmr}</td>
                  <td>{data.total_slp}</td>
                  <td>{new Date(data.last_claim * 1000).getMonth() + 1}/{new Date(data.last_claim * 1000).getDate()}/{new Date(data.last_claim * 1000).getFullYear()}</td>
                  <td>{new Date(data.next_claim * 1000).getMonth() + 1}/{new Date(data.next_claim * 1000).getDate()}/{new Date(data.next_claim * 1000).getFullYear()}</td>
                </>
              )
            }
            {axies && axies?.data?.axies?.results?.map((axie, i) => (
              <td key={i}>{axie.name}<img src={axie.image} alt='axie' style={{height:'100px'}} /></td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
