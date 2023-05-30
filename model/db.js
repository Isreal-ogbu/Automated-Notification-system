async function userdb(){
    const users = [
        { id: 1, 
            username: 'user1', 
            first_name: "user",
            last_name: "USER1",
            password: '$2b$10$VWrLit2RCdB42zhFZfE5H.ncal2Vlqj6P44d561BcV50gP6p4KYG2',
            wallet: {
                walletId: "user001",
                currency: "NGN",
                Balance: "10000",
                created_at: "2021-11-29T23:17:50.000Z",
                updated_at: "2021-12-15T20:19:52.000Z"
            },
            phone: "+2347082366844",
            email: "ogbuisreal@gmail.com",
            country: "Nigeria",
            created_at: "2021-11-29T23:17:50.000Z",
            updated_at: "2021-11-30T20:19:52.000Z"
        }, // Password: password1
        { id: 2, 
            username: 'user2',
            first_name: "stacky",
            last_name: "solution",
            password: '$2b$10$8Iojw0LFCQVunzTSH9RfmuC7Sz8zKE5XZPn/9kZLT5Z/2vvEkTHPy' ,
            wallet: {
                walletId: "user002",
                currency: "USD",
                Balance: "10000",
                created_at: "2021-12-15T20:19:50.000Z",
                updated_at: "2021-12-15T20:19:52.000Z"
            },
            phone: "07069607473",
            email: "ogbuisreal22@gmail.com",
            country: "USA",
            created_at: "2021-12-15T20:19:50.000Z",
            updated_at: "2021-12-15T20:19:52.000Z"
        }, // Password: password2
      ];
      return users
}

module.exports = userdb