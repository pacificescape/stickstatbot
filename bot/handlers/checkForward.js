module.exports = ({ date, forward_date }) => {
  console.log(date - forward_date)
  return (date - forward_date <= process.env.FORWARD_TTL)
}
