import React, { Fragment, Component } from 'react'
import { Doughnut } from 'react-chartjs-2'
import styled, { css } from 'styled-components'

const Grid = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
`
const Box = styled.div`
  padding: 0.5rem;
  color: var(--pink);
  text-align: center;
  background: #1e2227;
  border: solid 3px var(--pink);
  border-radius: 4px;
`
const Input = styled.input`
  width: 50%;
`
const Submit = styled.input`
  color: var(--darkPink);
  background: var(--pink);
  text-align: center;
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0.5rem;
`
const H1 = styled.h1`
  text-align: center;
  padding: 0.5rem;
  color: var(--darkPink);
  border: solid 3px var(--pink);
  border-radius: 5px;
  background: #1e2227;
`
const H3 = styled.h3`
  color: var(--darkPink);
`
const Total = styled(Box)``
export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      malih: '',
      bolot: '',
      sah: '',
      tidakSah: '',
    }
  }

  handleChange = e => {
    const target = e.target
    const value = target.type === 'number' && target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    if (
      this.state.malih === '' ||
      this.state.bolot === '' ||
      this.state.sah === '' ||
      parseInt(this.state.sah) === 0
    ) {
      return alert(`Boi!! Input dulu, jgn asal maen pencet Submit aje!!`)
    } else if (
      parseInt(this.state.malih) < 0 ||
      parseInt(this.state.bolot) < 0 ||
      parseInt(this.state.sah) < 0 ||
      parseInt(this.state.tidakSah) < 0
    ) {
      window.alert('Boi! Kaga boleh minus. Ane bilangin Om Budi Anduk lho!')
    } else if (
      parseInt(this.state.malih) + parseInt(this.state.bolot) !==
      parseInt(this.state.sah)
    ) {
      return alert('Boi! Ngupi dulu. Ente salah input tuh!!')
    } else if (
      parseInt(this.state.malih) + parseInt(this.state.bolot) > 300 ||
      parseInt(this.state.malih) +
        parseInt(this.state.bolot) +
        parseInt(this.state.tidakSah) >
        300
    ) {
      return alert(
        'Boi, Total Keseluruhan Suara gak boleh lebih dari 300 suara!'
      )
    } else {
      return confirm(
        'Nah!! Inputnya dah bener tuh!! Press OK untuk confirm OR Cancel klo masih ragu.'
      )
    }
  }

  render() {
    let { malih, bolot, sah, tidakSah } = this.state

    const total = parseInt(malih) + parseInt(bolot) + parseInt(tidakSah)

    const data = {
      labels: ['Bang Malih', 'Bang Bolot', 'Sah', 'Ga Sah'],
      datasets: [
        {
          data: [malih || 149, bolot || 140, sah || 189, tidakSah || 11],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'var(--green)'],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            'var(--green)',
          ],
        },
      ],
    }

    return (
      <Fragment>
        <H1>TPS KARDUS</H1>

        <form onSubmit={this.handleSubmit}>
          <Grid>
            <Box>
              <H3>Suara Bang Malih:</H3>
              <Input
                name="malih"
                type="number"
                placeholder="input angka..."
                value={malih}
                onChange={this.handleChange}
              />
            </Box>
            <Box>
              <H3>Suara Bang Bolot:</H3>
              <Input
                name="bolot"
                type="number"
                placeholder="input angka..."
                value={bolot}
                onChange={this.handleChange}
              />
            </Box>
            <Box>
              <h4>Suara Sah:</h4>
              <input
                name="sah"
                type="number"
                placeholder="input angka..."
                value={sah}
                onChange={this.handleChange}
              />
            </Box>
            <Box>
              <label>
                <h4>Suara Tidak Sah:</h4>

                <input
                  name="tidakSah"
                  type="number"
                  placeholder="input angka..."
                  value={tidakSah}
                  onChange={this.handleChange}
                />
              </label>
            </Box>
            <Submit type="submit" value="Submit [Fake Server]" />
            {/* <Button type="submit">Submit [Fake Server]</Button> */}
          </Grid>
        </form>
        <Doughnut data={data} />
        <Total>
          <h3>Total Keseluruhan Suara</h3>
          <h1
            css={css`
              color: var(--darkPink);
            `}
          >
            {total}
          </h1>
        </Total>
      </Fragment>
    )
  }
}
