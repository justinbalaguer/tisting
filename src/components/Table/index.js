import React, {useEffect} from 'react'

const Table = (props) => {
  const {jsonData, axies, data, index} = props
  
  useEffect(() => {
    if(jsonData.indexOf(index) > -1) {
      jsonData[jsonData.indexOf(index)].data = []
      jsonData[jsonData.indexOf(index)].axies = []
      if(jsonData[jsonData.indexOf(index)].data.length === 0 && jsonData[jsonData.indexOf(index)].data.length === 0) {
        data && jsonData[jsonData.indexOf(index)].data.push(data)
      }
      if(jsonData[jsonData.indexOf(index)].axies.length === 0 && jsonData[jsonData.indexOf(index)].axies.length === 0) {
        axies && jsonData[jsonData.indexOf(index)].axies.push(axies)
      }
    }
  }, [jsonData, axies, data, index]);

  return (
    <table role='grid'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>MMR</th>
            <th>SLP</th>
            <th>SLP Balance</th>
            <th>SLP Total</th>
            <th>Last claim</th>
            <th>Next claim</th>
            <th colSpan={3}>Axies</th>
          </tr>
        </thead>
        <tbody>
          {
            jsonData.map((json,i) => (
              <tr key={i}>
                {
                  json?.data?.map((data,j) => (
                    <React.Fragment key={j}>
                      <td>{data.name}</td>
                      <td>{json.address}</td>
                      <td>{data.mmr}</td>
                      <td>{data.total_slp}</td>
                      <td>{data.lifetime_slp}</td>
                      <td>{data.raw_total}</td>
                      <td>{isNaN(new Date(data.last_claim * 1000).getMonth()) ? 0 : new Date(data.last_claim * 1000).getMonth() + 1}/{isNaN(new Date(data.last_claim * 1000).getDate()) ? 0 : new Date(data.last_claim * 1000).getDate()}/{isNaN(new Date(data.last_claim * 1000).getFullYear()) ? 0 : new Date(data.last_claim * 1000).getFullYear()}</td>
                      <td>{isNaN(new Date(data.next_claim * 1000).getMonth()) ? 0 : new Date(data.next_claim * 1000).getMonth() + 1}/{isNaN(new Date(data.next_claim * 1000).getDate()) ? 0 : new Date(data.next_claim * 1000).getDate()}/{isNaN(new Date(data.next_claim * 1000).getFullYear()) ? 0 : new Date(data.next_claim * 1000).getFullYear()}</td>
                    </React.Fragment>
                  ))
                }
                {jsonData[i]?.axies[0]?.data.axies.results.map((axie,k) => (
                  <React.Fragment key={k}>
                    <td>{axie.name}<img src={axie.image} alt='axie' style={{height:'auto',width:'100%'}} /></td>
                  </React.Fragment>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
  )
}

export default Table