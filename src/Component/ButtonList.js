import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AiFillMedicineBox } from "react-icons/ai";
import { RiGroupLine } from "react-icons/ri";
import { GoReport } from "react-icons/go";
import { HiOutlineDocumentReport } from "react-icons/hi";

const ButtonList = () => {
    const history = useHistory();
    return (
        <section className="p-5">
            <div className="container">
                <div className="row text-center g-4">
                    <div className="col-md">
                        <div className="card bg-dark text-light">
                            <div className="card-body text-center">
                                <div className="h1 mb-3">
                                    <AiFillMedicineBox />
                                </div>
                                <h3 className="card-title mb-3">Equipment</h3>
                                <p className="card-text">
                                    This is description!This is description!This is description!
                                    This is description!This is description!This is description!
                                </p>
                                <Button onClick={()=>history.push("/equipmentTable")}>Check</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="card bg-dark text-light">
                            <div className="card-body text-center">
                                <div className="h1 mb-3">
                                    <RiGroupLine />
                                </div>
                                <h3 className="card-title mb-3">User Group</h3>
                                <p className="card-text">
                                    This is description!This is description!This is description!
                                    This is description!This is description!This is description!
                                </p>
                                <Button onClick={()=>history.push("/usergroupTable")}>Check</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="card bg-dark text-light">
                            <div className="card-body text-center">
                                <div className="h1 mb-3">
                                    < GoReport />
                                </div>
                                <h3 className="card-title mb-3">Reported Issues</h3>
                                <p className="card-text">
                                    This is description!This is description!This is description!
                                    This is description!This is description!This is description!
                                </p>
                                <Button onClick={()=>history.push("/issueTable")}>Check</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="card bg-dark text-light">
                            <div className="card-body text-center">
                                <div className="h1 mb-3">
                                    <HiOutlineDocumentReport />
                                </div>
                                <h3 className="card-title mb-3">Produce Report</h3>
                                <p className="card-text">
                                    This is description!This is description!This is description!
                                    This is description!This is description!This is description!
                                </p>
                                <a href="/" className="btn btn-primary">Check</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default ButtonList;