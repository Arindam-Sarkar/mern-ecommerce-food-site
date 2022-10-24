import React from 'react'
import './cart.css'

const Cart = () => {
  return (
    <>
      <div className='pageMcont'>
        <div className='pageCont'>


          <table className="">
            <thead>
              <tr>
                <th>Product Name</th>
                <th className="">Quantity</th>
                <th className="">Subtotal</th>
                <th className="">Discount</th>
                <th className=""><button>Empty Cart</button></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <div className="cartTableDataWithImage">
                    <img src="https://via.placeholder.com/220x180/FF0000/000000" alt="Product" />
                    <div className="">
                      <h4 className="">Unionbay Park</h4><span><em>Size:</em> 10.5</span><span><em>Color:</em> Dark Blue</span>
                    </div>
                  </div>
                </td>

                <td className="">
                  <div className="">
                    <select className="">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </td>
                <td className=" ">$43.90</td>
                <td className=" ">$18.00</td>
                <td className=""></td>
              </tr>

            </tbody>
          </table>



          {/* <div className="shopping-cart-footer">
              <div className="column">
                <form className="coupon-form" method="post">
                  <input className="form-control form-control-sm" type="text" placeholder="Coupon code" required="" />
                  <button className="btn btn-outline-primary btn-sm" type="submit">Apply Coupon</button>
                </form>
                <textarea className="form-control " placeholder="Special Instructions"></textarea>
              </div>

              <div className="column text-lg">Subtotal: <span className="text-medium">$289.68</span></div>
            </div> */}
          {/* <div className="shopping-cart-footer">
              <div className="column"><a className="btn btn-outline-secondary" href="#"><i className="icon-arrow-left"></i>&nbsp;Back to Shopping</a></div>
              <div className="column"><a className="btn btn-primary" href="#" data-toast="" data-toast-type="success" data-toast-position="topRight" data-toast-icon="icon-circle-check" data-toast-title="Your cart" data-toast-message="is updated successfully!">Update Cart</a><a className="btn btn-success" href="#">Checkout</a></div>
            </div> */}


        </div>
      </div>



    </>
  )
}

export default Cart