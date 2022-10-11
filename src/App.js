import './index.css'
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';
import BinIcon from './icons/bin.png'

import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { isCursorAtStart } from '@testing-library/user-event/dist/utils';

var currItem = "морковь"

function App() {

  const [ingr, setIngr] = useState(currItem)
  const [ingrOpen, setIngrOpen] = useState(false)
  const [items, setItems] = useState([])


  return (
    <div>
      <div className='title-box'><a className='title'> Цифровой повар </a></div>
      
      <NavItem first={true} text="+ продукты">
        <DropdownMenu open={setIngrOpen} act={setIngr}></DropdownMenu>
      </NavItem>
      {console.log(items)}
      <ul className='ingr-list'>
        {items.map(item => {
        return <li className='ingr-item'>{Item(item=item)}</li>
        })}
      </ul>
      <Ingredient items={items} setItems={setItems} openAct={setIngrOpen} act={ingrOpen} item={ingr}></Ingredient>
    </div>
    
    
    
  );
}

function Item(item) {
  console.log()
  return(
    <span className="">
      <p className='ingr-text'>{item[0]}: {item[1]}</p>
      <img className='ingr-bin' src={BinIcon}></img>
    </span>
  )
}

function Ingredient(props){

  const [amount, setAmount] = useState('')

  function handleClose(func){
    func(false)
    setAmount('')
  }

  function handleAdd(items, item, amount, func, func1){
    if (amount) {
      let res = items.concat(Array([item, amount]))
      func1(res)
      handleClose(func);
    }
    
  }

  return (
    <div style={{"display": props.act ? "initial" : "none"}} className='add-box'>
      <div className='add-left'>
        <p className='add-title'>{props.item}</p>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='кол-во штук' className='add-input'></input>
        <br/>
        <button onClick={() => handleAdd(props.items, props.item, amount, props.openAct, props.setItems)} className='add-add'> <p>Добавить</p></button>
        <br/>
        <button onClick={() => handleClose(props.openAct)} className='add-cancel'> <p>Отмена</p></button>
      </div>
      
    </div>
  )
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className={props.first ? "nav-item-first" : "nav-item"}>
      <a href="#" style={open && props.first ? {'border-radius': '0.8vw 0.8vw 0 0'} : {}} className={props.first ? "icon-button-first" : "icon-button"} onClick={() => setOpen(!open)}>
        {props.icon}
        {props.text}
      </a>

      {open && props.children}
    </li>
  );
}


function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const [currItem1, setCurrItem1] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function handleClick(item) {
    // currItem = item;
    console.log(2);
  }

  function DropdownItem(props) {
    
    function handleTomato(func, func1){
      props.goToMenu && setActiveMenu(props.goToMenu)
      !props.goToMenu && func(props.children)
      !props.goToMenu && func1(true)
      console.log(currItem)
    }

    return (
      <a href="#" className="menu-item" onClick={() => handleTomato(props.act, props.open)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          
          <DropdownItem
            act={props.act}
            leftIcon="🥦"
            rightIcon={<ChevronIcon />}
            goToMenu="vegetables">
            Овощи
          </DropdownItem>
          <DropdownItem
            leftIcon="🍌"
            rightIcon={<ChevronIcon />}
            goToMenu="animals">
            Фрукты
          </DropdownItem>
          <DropdownItem
            leftIcon="🌰"
            rightIcon={<ChevronIcon />}
            goToMenu="nuts">
            Орехи
          </DropdownItem>
          <DropdownItem
            leftIcon="🍒"
            rightIcon={<ChevronIcon />}
            goToMenu="berries">
            Ягоды
          </DropdownItem>
          <DropdownItem
            leftIcon="🍣"
            rightIcon={<ChevronIcon />}
            goToMenu="fish">
            Рыба
          </DropdownItem>
          <DropdownItem
            leftIcon="🥩"
            rightIcon={<ChevronIcon />}
            goToMenu="meat">
            Мясо
          </DropdownItem>
          <DropdownItem
            leftIcon="🥛"
            rightIcon={<ChevronIcon />}
            goToMenu="diary">
            Молочка
          </DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'vegetables'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem open={props.open} act={props.act} goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Овощи</h2>
          </DropdownItem>
          <DropdownItem open={props.open} act={props.act} leftIcon={<BoltIcon />}>Помидоры </DropdownItem>
          <DropdownItem open={props.open} act={props.act} leftIcon={<BoltIcon />}>Огурцы</DropdownItem>
          <DropdownItem open={props.open} act={props.act} leftIcon={<BoltIcon />}>Картофель</DropdownItem>
          <DropdownItem open={props.open} act={props.act} leftIcon={<BoltIcon />}>Лук</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;