export const getOrderById = () =>{
    const order =  {
        id: '2345jkasdf',
        user:{

            name: 'John Doe',
        },
        amount: 1223,
        status: 'pending',
        createdDate: '2022-12-23T12:34:56Z',
        deliveryStatus: 'dispatched',
        products: [
            
                {
                    "id": "649d775128b6744f0f497040",
                    "name": "Smart Watch(Answer/Make Call), 1.85\" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023",
                    "description": "Bluetooth Call and Message Reminder: The smart watch is equipped with HD speaker, after connecting to your phone via Bluetooth, you can directly use the smartwatches to answer or make calls, read messages, store contacts, view call history. The smartwatch can set up more message notifications in \"GloryFit\" APP. You will never miss any calls and messages during meetings, workout and riding.",
                    "category": "Watch",
                    "brand": "Nerunsa",
                    "selectedImage": {
                        "color": "Black",
                        "colorCode": "#000000",
                        "image": "https://firebasestorage.googleapis.com/v0/b/e-shop-vid.appspot.com/o/products%2F1695192445608-watch-black.jpg?alt=media&token=4446b901-01ab-4152-8953-e36b22608755"
                    },
                    "quantity": 1,
                    "price": 50
                }
            ]
        
      
    }
    return order
}