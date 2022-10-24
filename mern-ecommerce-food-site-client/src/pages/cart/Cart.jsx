import React from 'react'
import './cart.css'

const Cart = () => {
  return (
    <>
      <div className='pageMcont'>
        <div className='pageCont'>
          <table>
            <thead>
              <tr>
                <th className='th1'>col 1</th>
                <th>col 2</th>
                <th>col 3</th>
                <th>col 4</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
              </tr>

              <tr>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
              </tr>

              <tr>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
              </tr>
            </tbody>

          </table>

        </div>
      </div>
    </>
  )
}

export default Cart