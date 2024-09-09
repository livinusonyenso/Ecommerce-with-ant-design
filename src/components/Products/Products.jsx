import React, { useEffect, useState } from 'react'
import { Badge, Card, Image, List, message, Rate, Spin, Typography, Select } from 'antd'
import GetAllProducts, { getProductByCategory } from '../../API/GetAllProducts'
import addToCart from '../../API/GetAllProducts'
import { useParams } from 'react-router-dom'
import '../../App.css'

function Products() {
    const [loading, setloading] = useState(false)
    const [items,setItem] = useState([])
    const [sortOrder, setSortOrder] = useState('az')
    const param = useParams()

useEffect(()=>{
    setloading(true);
    let quaryParams = param.categoryId?.split(" ")?.join("-");

    (quaryParams ? getProductByCategory(quaryParams) : GetAllProducts()).then((res )=> {
        setItem(res.products);
        console.log(res.products)
        setloading(false);
})
},[param]);

if(loading){
    return <div className="spin-container">
    <Spin spinning size="large" className="spin" />
  </div>
}

function AddTocartHandle({item}) {
    const [loading, setLoading] = useState(false)
    function addProductToCart(){
        setLoading(true)
        addToCart(item.id).then(res => {
            message.success(`${item.title} has been add to the cart`)
            setLoading(false)
        })
    }
    return <button onClick={()=>{
        addProductToCart()
    }} type='link' loloadingad={loading}>Add to cart</button>
}

const getSortedOrder = () => {
    const sortedItem = [...items]
    sortedItem.sort((a,b) => {
        if(sortOrder === 'az'){
            return a.title.localeCompare(b.title);
            // return a.title - b.title 
        }
        else if(sortOrder === 'za'){
            return b.title.localeCompare(a.title);
            // return b.title - a.title 
        }
       else if(sortOrder === 'lowHigh'){
            return a.price - b.price 
        }
       else if(sortOrder === 'highLow'){
            return b.price - a.price 
        }
        
        return 0
    });
    return sortedItem
};

  return (
    <div className='productContainer'>
        <div>
            <Typography.Text>View Item Sorted by: </Typography.Text>
            <Select 
            onChange={(value)=>{
                setSortOrder(value)
            }}
            defaultValue={'az'}
            options={[
                {label : 'Aphabatically A-z',
                    value : 'az'

                },
                {label : 'Aphabatically Z-A',
                    value : 'za'

                },
                {label : 'price low to High',
                    value : 'lowHigh'

                },
                {label : 'price high to low',
                    value : 'highLow'

                },
            ]}></Select>
        </div>
        <List
        loading={loading} 
        grid={{column:3}}
        renderItem={(product , index) =>{
          return <Badge.Ribbon className='ItemCardBagde' text={`${product.discountPercentage}% off`} color='pink'>
          <Card 
          className='ItemCard'
          title={product.title}key={index}
            cover={<Image className='ItemCardImage' src={product.thumbnail} />}

            actions={[<Rate allowHalf disabled value={product.rating} />,< AddTocartHandle item={product} />]}
            >

                <Card.Meta title={<Typography.Paragraph>Price: ${product.price} {' '}
                    <Typography.Text delete type='danger'>
                        ${parseFloat(product.price - product.price * product.discountPercentage / 100).toFixed(2)}</Typography.Text>
                </Typography.Paragraph>}
                description={<Typography.Paragraph ellipsis={{rows:2 , expandable : true, symbol:'more'}}>{product.description}</Typography.Paragraph>}
                >
                </Card.Meta>
            </Card> 
            </Badge.Ribbon> 
        }} dataSource={getSortedOrder()}></List> 
    </div>
  )

}

export default Products


//3=:15