import React, { useState } from 'react';

function Category(props) {
    const { onAdd, data } = props;
    const [show, setShow] = useState([]);

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const alertMessage = (product) => {
        const newShow = [...show];
        newShow[product.id] = 1;
        setShow(newShow);
    };

    return (
        <main className='mt-5'>
            <div style={{ paddingBottom: "30px" }}></div>
            <h1 className='text-center text-info mt-4'>Shop</h1>
            <div className='container-fluid mx-2'>
                <div className='row mt-5 mx-2'>
                    <div className='col-md-12'>
                        <div className='row'>
                            {data.map((product) => {
                                const { id, name, price, image } = product;
                                return (
                                    <div className="col-md-4 mb-4" key={id}>
                                        <div className="card">
                                            <img className="card-img-top" src={image} alt="trang-phuc-nam" />
                                            <div className="card-body">
                                                <p className="card-text">{name}</p>
                                                <h4 className="card-title">{formatter.format(price)}</h4>
                                                <button onClick={() => { onAdd(product); alertMessage(product) }} className='btn btn-info mb-2'>Thêm vào giỏ hàng</button>
                                                {show[product.id] === 1 && <p className='text-success mt-2'>{product.name} Đã được thêm vào giỏ hàng!</p>}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Category;