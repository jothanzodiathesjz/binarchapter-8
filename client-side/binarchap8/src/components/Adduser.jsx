import React from "react";

class AddUser extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col-8">
                        <div className="card p-5">
                        <form>
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label"> Username</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control"/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label"> Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control"/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label"> Email</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control"/>
                                </div>
                                </div>
                            <div className="col-12 text-end">
                                <button className="btn btn-primary">Add User</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddUser