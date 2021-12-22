import ButtonList from "../Component/ButtonList";
import {FaQuestion} from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.css';


const indexMain = () => {
    return (
        <div className = "indexMain" id = "mainContent">
            <section className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
                <div className="container">
                    <div className="d-sm-flex align-items-center justify-content-between">
                        <div>
                            <h1><span className="text-warning"> Welcome </span></h1>
                            <p className="lead my-4">
                                This is description!This is description!This is description!<br></br>
                                This is description!This is description!This is description!<br></br>
                                This is description!This is description!This is description!<br></br>
                                This is description!This is description!This is description!<br></br>
                                The background is waiting a picture!!!!<br></br>
                            </p>
                        </div>
                        <img
                            className="img-fluid w-50 d-none d-sm-block"
                            src="./defaultProfile.png"
                            alt=""
                        />
                    </div>
                </div>
            </section>
            <div className="float-end" id = "faqButton">
                <a href="/"><FaQuestion size="20px"/></a>
            </div>
            <ButtonList/>
        </div>
     );
}
 
export default indexMain;