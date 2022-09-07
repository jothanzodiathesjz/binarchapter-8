import React from "react";
class Users extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            userdata: [
                {
                    "name": "Louis Murray",
                    "address": "Ap #686-2963 Neque Street",
                    "email": "lorem.fringilla@hotmail.org",
                    "region": "Limpopo"
                },
                {
                    "name": "Diana Jimenez",
                    "address": "P.O. Box 146, 3164 In Rd.",
                    "email": "ut.cursus@protonmail.org",
                    "region": "Katsina"
                },
                {
                    "name": "Elton Rose",
                    "address": "925-5991 Suspendisse Road",
                    "email": "sodales.at@aol.com",
                    "region": "Adana"
                },
                {
                    "name": "Leila Slater",
                    "address": "572-1420 Id, Av.",
                    "email": "odio.nam@yahoo.net",
                    "region": "Georgia"
                },
                {
                    "name": "Britanni Whitfield",
                    "address": "Ap #184-8384 Mus. Road",
                    "email": "nisi.magna.sed@aol.com",
                    "region": "Ogun"
                }
            ]
        }
    }
    render() {
        return (
            <div className="container">
            <div className="row mt-5">
                    <div className="col-12">
                    <a href="/adduser" className="btn btn-primary">+Adduser</a>
                </div>
            </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            </tr>
                        </thead>
                            <tbody>
                                {
                                    this.state.userdata.map(element => (
                                        <tr>
                                            <th scope="row"> 1</th>
                                            <td>{ element.name }</td>
                                            <td>{ element.email }</td>
                                            <td>{ element.address }</td>
                                        </tr>
                                    ))
                                }
                            
                        </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Users;