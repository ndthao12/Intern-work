import React from 'react'

export default function Cart(props) {
    const { cartItems, onAdd, onRemove, onClear, onClearAll, countCartItem } = props;
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    return (
        <aside className='mt-5'>
            <div style={{ paddingBottom: "30px" }}></div>
            <h1 className='text-info text-center mt-4'>Giỏ hàng {countCartItem ? (
                `(${countCartItem})`
            ) : ('')}</h1>
            <div className='mt-5'>
                {cartItems.length === 0 && <div><h3 className='text-uppercase ml-auto'>Không có sản phẩm trong giỏ hàng</h3></div>}
                {cartItems.map((item) => (
                    <div className='row mb-3 border-custom' key={item.id}>
                        <img className='cart-img col-md-2' src={item.image} alt="sản phẩm" />
                        <div className=' col-md-9 text-left'>
                            <h5 className='mt-2'>{item.name}</h5>
                            <div className='mb-2'>
                                {formatter.format(item.price)}
                            </div>
                            <div className="row align-items-center">
                                <button className='btn btn-info mr-2 mb-2' onClick={() => onAdd(item)}>+</button>
                                <span className='mr-2 mb-2'>{item.qty}</span>
                                <button className='btn btn-danger mr-2 mb-2' onClick={() => onRemove(item)}>-</button>
                                <button className='btn btn-danger mr-2 mb-2' onClick={() => onClear(item)}>Xóa</button>
                            </div>
                        </div>
                    </div>
                ))}
                {cartItems.length !== 0 && (
                    <>
                        <hr />
                        <div className='row'>
                            <div className='col-8'>
                                <h5>Tổng tiền</h5>
                            </div>
                            <div className='col-4 font-weight-bold'>{formatter.format(itemsPrice)}</div>
                        </div>
                        <hr />
                        <button className='btn btn-danger mr-2 w-20' onClick={() => onClearAll()}>Xóa hết</button>
                        <button className='btn btn-info w-75'>Thanh toán</button>
                        <div style={{ paddingBottom: "30px" }}></div>
                    </>
                )}
            </div>

        </aside>
    )
}
