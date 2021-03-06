import bcrypt from 'bcryptjs';

const data = {
    companies: [
        {
            companyName: 'PQL Exports',
            servicesList: [
                {
                    shortDescription: 'this is short description',
                    longDescription: 'this is long description',
                    price: 85
                }
            ],
            users: [
                {
                    userName: "Shaheer",
                    password: bcrypt.hashSync('1234', 8),
                    status: 'active',
                },
                {
                    userName: "Ali",
                    password: bcrypt.hashSync('1234', 8),
                    status: 'active',
                }
            ],
            clients: [
                {
                    clientName: 'Client # 1',
                    email: 'client1@gmail.com',
                    address: 'abc traders, xyz street karachi',
                    phone: 584515468353,
                    ABN: 45845454487,
                }
            ],
            invoices: [
                {
                    clientId:'nbeerf9e0fs98e8sdf',
                    clientName: 'client 1',
                    email: 'client1@gmail.com',
                    address: 'abc traders, xyz street karachi',
                    phone: 584515468353,
                    ABN: 45845454487,
                    listItems: [
                        {
                            shortDescription: 'this is short description',
                            longDescription: 'this is long description',
                            price: 85
                        }
                    ],
                }
            ]
        }
    ],
    // users: [
    //     {
    //         userName: 'Shayan123',
    //         password: bcrypt.hashSync('1234', 8),
    //         companyId: 'jsadhksjse9345j43',
    //         status: 'Active',
    //     },
    //     {
    //         userName: 'Shahee1r',
    //         password: bcrypt.hashSync('1234', 8),
    //         companyId: 'jsadhffdksjse9345j43',
    //         status: 'Inactive',
    //     },
    // ],
    // clients: [
    //     {
    //         clientName: 'Shayan Ali',
    //         companyName: 'ABC Traders',
    //         email: 'abctraders@gmail.com',
    //         address: 'abc street xyz karachi',
    //         phone: 95325477852,
    //         ABN: 354165168514,
    //     },
    //     {
    //         clientName: 'Shaheer Ahmed',
    //         companyName: 'XYZ Tech',
    //         email: 'xyztech@gmail.com',
    //         address: 'abc street xyz karachi',
    //         phone: 95325475852,
    //         ABN: 354166168514,
    //     },
    // ],
    // services: [
    //     {
    //         shortDescription: 'Service # 1',
    //         longDescription: 'This is long Description of Service # 1',
    //         price: 56
    //     },
    //     {
    //         shortDescription: 'Service # 2',
    //         longDescription: 'This is long Description of Service # 2',
    //         price: 89
    //     },
    // ],
    // invoices: [
    //     {
    //         invoiceNumber: 1,
    //         invoiceUniqueCompanyNumber: 2152,
    //         customerDetails: {
    //             name: "abc",
    //             email: "xyz@gmail.com",
    //             phone: 5665565685359,
    //             ABN: 63565463813633,
    //         },
    //         companyDetails: {
    //             masterCompany: "ABC",
    //             companyName: "XYZ",
    //             companyPhone: 652001822563,
    //             companyEmail: "abc@org.com",
    //             companyAddress: "abc company, xyz street Karachi Pakistan",
    //             companyABN: 785234,
    //         },
    //         invoiceLineItems: {
    //             description: "this is invoice description",
    //             amount: 125,
    //         },
    //         totalAmount: 6520,
    //     },
    // ]
};
export default data;