import React from 'react';
import { Outlet, Link } from "react-router-dom";

function Header(props) {
    const { countCartItem, setQuery } = props;
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                <Link className='navbar-brand' to="/">Home</Link>
                <div className='d-inline-flex flex-right'>
                    <ul className="navbar-nav mr-sm-3">
                        <li className="nav-item">
                            <Link className='nav-link' to="/cart">Cart</Link>
                        </li>
                        <li className='nav-item'>
                            {countCartItem ? (
                                <Link className='btn btn-danger' to='/cart'>{countCartItem}</Link>
                            ) : ('')}
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/list">List</Link>
                        </li>
                    </ul>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
                        <button className="btn btn-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default Header