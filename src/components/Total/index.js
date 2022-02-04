const Total = (props) => {
  const {scholars, averageEarnings, totalEarnings} = props
  return (
    <>
      <div>Scholars: {scholars}</div>
      <div>Average SLP Earning: {averageEarnings}</div>
      <div>Total Earning: {totalEarnings}</div>
    </>
  )
}

export default Total