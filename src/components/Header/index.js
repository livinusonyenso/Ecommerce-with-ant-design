import { Badge, Button, Checkbox, Drawer, Form, Input, InputNumber, Menu, message, Table } from 'antd';
import { HomeFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Typography from 'antd/es/typography/Typography';
import { useEffect, useState } from 'react';
import { getCart } from '../../API/GetAllProducts';

function AppHeader() {
  const Navigate = useNavigate();
  
  const onMenClick = (item) =>{
    Navigate(`/${item.key}`)

  }
  return (
    <div className="appheader">
      <Menu 
      className='appMenu'
      onClick={onMenClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: '',
          },
          {
            label: 'Men',
            key: 'men',
            children: [
              {
                label: "Mens Shirts",
                key: "mens shirts",
              },
              {
                label: "Mens Shoes",
                key: "mens shoes",
              },
              {
                label: "Mens Watches",
                key: "mens watches",
              },
            ],
          },
          {
            label: 'Women',
            key: 'women',
            children: [
              {
                label: "Womens Dresses",
                key: "womens dresses",
              },
              {
                label: "Womens Shoes",
                key: "womens shoes",
              },
              {
                label: "Womens Watches",
                key: "womens watches",
              },
              {
                label: "Womens Bags",
                key: "womens bags",
              },
              {
                label: "Womens Jewelry",
                key: "womens jewelry",
              },
            ],
          },
          {
            label: 'Fragrances',
            key: 'fragrances',
          },
        ]}
      />
      <Typography.Title>ivy Store</Typography.Title>
     <AppCart />
    </div>
  );
  function AppCart(){
    const [cartDrawOpen,setCartDrawOpen] = useState(false)
    const [cartItem , setCartItem] = useState([])
    const [checkoutDrawOpen, setCheckOutDrawOpen] = useState(false)
    useEffect(()=>{
      getCart().then(res => {
        setCartItem(res.products)
      })
    },[])
    const onConfirmedOrder = (values)=>{
      setCheckOutDrawOpen(false)
      setCartDrawOpen(false)
      message.success('your order has been  placed succesfully')
       console.log(values)}
    return <div>
       <Badge onClick={() =>{
        setCartDrawOpen(true)
       }} count={cartItem.length} className='ShoppingCart'>
    <ShoppingCartOutlined />
    </Badge>
    <Drawer open={cartDrawOpen} onClose={()=>{
      setCartDrawOpen(false)
    }} title='your cart'
    contentWrapperStyle={{width:500}}
    >
      
      <Table 
      pagination={false}
      columns={[
      {
        title:'Title',
        dataIndex: 'title'
      },
      {
        title:'Price',
        dataIndex: 'price',
        render: (value) => {
          return <span>${parseFloat(value).toFixed(0)}</span>
        }
      },
      {
        title:'Quantity',
        dataIndex: 'quantity',
        render: (value , record) => {
          return <InputNumber 
          min={0} 
          defaultValue={value}
          onChange={(value) =>{
          setCartItem((pre) =>
          pre.map((cart) =>{
              if(record.id === cart.id){
                cart.total = cart.price * value
              }
              return cart
            }))
          }}
          ></InputNumber>
        }
      },
      {
        title:'Total',
        dataIndex: 'total',
        render: (value) => {
          return <span>${parseFloat(value).toFixed(0)}</span>
        }
        
      },]} dataSource={cartItem} 
      summary={(data)=>{
       const total = data.reduce((pre,cur)=>{
        return pre+cur.total
        },0)
        return <span>Total :{parseFloat(total).toFixed(0)}</span>
      }}
      />
      <Button onClick={()=>{
        setCheckOutDrawOpen(true)
      }} type='primary'>Checkout To Your Cart</Button>
     </Drawer>

     <Drawer open={checkoutDrawOpen} onClose={()=>{
      setCheckOutDrawOpen(false)
     }}
     title='confirm order'
     >
   <Form onFinish={onConfirmedOrder}>
   <Form.Item
    label="Full Name"
    name="fullName"
    rules={[
      {
        required: true,
        message: 'Please enter your full name',
      },
    ]}
  >
    <Input placeholder="Enter your name..." />
  </Form.Item>


  <Form.Item
    label="Email"
    name="email"
    rules={[
      {
        required: true,
        message: 'Please enter a valid email',
      },
      {
        type: 'email',
        message: 'The input is not a valid email',
      },
    ]}
  >
    <Input placeholder="Enter your email..." />
  </Form.Item>

  <Form.Item
    label="Address"
    name="address"
    rules={[
      {
        required: true,
        message: 'Please enter your full address',
      },
    ]}
  >
    <Input placeholder="Enter your address..." />
  </Form.Item>
  <Form.Item>

    <Checkbox>cash on delivery</Checkbox>
  </Form.Item>
  <Typography.Paragraph>More methods coming soon...</Typography.Paragraph>
     <Button type='primary' htmlType='submit'>Confirm order</Button>

   </Form>    
   </Drawer>
    </div>
  }
}

export default AppHeader;
<Form.Item label='Full Email' name='Full Email'>
      <Input placeholder='Enter your Email...' />
     </Form.Item>