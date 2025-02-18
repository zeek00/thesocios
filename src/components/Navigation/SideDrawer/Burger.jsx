import React, { useState } from "react";
import styled from "styled-components";
import LeftNav
 from "./LeftNav";
const BurgerStyle = styled.div`
  width: 2rem;
  height: 2rem;
  position: absolute;
  padding-left: .1rem;
  top: .6rem;
  right: ${({ open }) => (open ? "1rem" : ".9rem")}; /* Adjusted to the left */
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  z-index: 40;
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? "#0077b6" : "#fff")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      transform: ${({ open }) =>
        open ? "translateX(-100%)" : "translateX(0)"}; /* Adjusted to the left */
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
  @media (min-width: 700px) {
    display: none;
`;

const Burger = () => {
    
  const [open, setOpen] = useState(false);
  return (
    <>
      <BurgerStyle open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </BurgerStyle>
      <LeftNav open={open} setOpen={setOpen} />
    </>
  );
};

export default Burger;
