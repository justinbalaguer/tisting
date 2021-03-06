import './App.css';
import { useState } from 'react';
import { Table, Total } from './components'

const axios = require('axios')

const App = () => {

  const [address, setAddress] = useState('')
  const [axies, setAxies] = useState()
  const [data, setData] = useState()
  const [disable, setDisable] = useState(false)
  const [jsonData, setJsonData] = useState([])
  const [total] = useState({
    scholars: 0,
    averageEarnings: 0,
    totalEarnings: 0
  })

  const options = {
    headers: {
      'x-rapidapi-host': 'axie-infinity.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_API_KEY
    }
  }

  const index = jsonData.find(json => json.address === address)
  
  const trackAxie = async () => {
    if(address.length !== 0) {
      if(jsonData.indexOf(index) === -1) {
        setJsonData(json => [...json, {
          address,
          axies: [],
          data: []
        }])
        total.scholars += 1
      }
      setDisable(true)
      await getAxies()
      await getData()
      setDisable(false)
    }
  }
  
  const getAxies = async () => {
    const formatAddress = address.includes('ronin') ? address.replace('ronin:', '0x') : address
    await axios.get(`https://axie-infinity.p.rapidapi.com/get-axies/${formatAddress}`, options)
      .then(response => {
        setAxies(response.data)
      })
      .catch(error => {
        console.log(`error: ${error}`)
        alert('api error, please try again')
      })
  }

  const getData = async () => {
    await axios.get(`https://game-api.axie.technology/api/v1/${address}`)
    .then(response => {
      setData(response.data)
      if(jsonData.indexOf(index) === -1) {
        //average earnings
        total.averageEarnings += response.data.total_slp
        total.averageEarnings /= total.scholars
        //total earnings
        total.totalEarnings += response.data.raw_total
      }
    })
    .catch(error => {
      console.log(`error: ${error}`)
    })
  }
  
  return (
    <div className="App">
      <Total scholars={total.scholars} averageEarnings={total.averageEarnings} totalEarnings={total.totalEarnings}/>
      <input type='text' onChange={e => setAddress(e.target.value)} placeholder='address' />
      <button onClick={trackAxie} disabled={disable}>Add</button>
      <hr/>
      <Table index={index} jsonData={jsonData} axies={axies} data={data} />
    </div>
  );
}

export default App;
