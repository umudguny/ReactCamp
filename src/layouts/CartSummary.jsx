import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Dropdown, Label } from "semantic-ui-react";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
export default function CartSummary() {
  const [isMenuOpen,setIsMenuOpen]=useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch=useDispatch();
  const handleDecrease=(product)=>{
    dispatch(removeFromCart(product));
  }
  const handleIncrease=(product)=>{
    dispatch(addToCart(product));
  }
  const onDropdownClick=()=>{
    setIsMenuOpen(!isMenuOpen);
  } 
  return (
    <div>
      <Dropdown item text="Sepetiniz" >
        <Dropdown.Menu open={isMenuOpen} onClick={()=>onDropdownClick()}>
          {
          cartItems.map((item,index) => 
            <Dropdown.Item key={index}>
              {item.product.title+" : "}
              <Label>{item.quantity}</Label>
              <Button onClick={()=>handleIncrease(item.product)}>+</Button>
              <Button onClick={()=>handleDecrease(item.product)}>-</Button>
              </Dropdown.Item>
          )
          }

          <Dropdown.Divider />
          <Dropdown.Item as={NavLink} to="/cart">
            Sepete git
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}