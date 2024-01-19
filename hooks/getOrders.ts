export const getOrders = ()=>{
    
    return  [
        {
            id: '2345jkasdf',
            user:{
    
                name: 'John Doe',
            },
            amount: 1223,
            status: 'pending',
            createdDate: '2022-12-23T12:34:56Z',
            deliveryStatus: 'dispatched',
          
        },
        {
            id: '23sfds45jkasdf',
            user:{
    
                name: 'Johasdfn Doe',
            },
            amount: 122323,
            status: 'complete',
            createdDate: '2022-12-23T12:34:56Z',
            deliveryStatus: 'delivered',
          
        },
        {
            id: '23sfsfds45jkasdf',
            user:{
    
                name: 'Johasdfasdfn Doe',
            },
            amount: 12223323,
            status: 'pending',
            createdDate: '2022-12-23T12:34:56Z',
            deliveryStatus: 'pending',
          
        },
    ]
}