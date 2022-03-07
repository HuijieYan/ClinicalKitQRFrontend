import { useHistory } from "react-router-dom";
import { AiFillMedicineBox } from "react-icons/ai";
import { RiGroupLine } from "react-icons/ri";
import { GoReport } from "react-icons/go";
import { HiOutlineDocumentReport } from "react-icons/hi";
import "./HomePageActionCards.css";
import {getLevel} from "../Functions/UserStatus";
import {FaRegHospital} from "react-icons/fa";
import {FaSearch} from "react-icons/fa";
import {FaQuestion} from "react-icons/fa";

const ButtonList = () => {
  const history = useHistory();
  return (
    <section className="p-5">
      <div className="container">
        <div className="row text-center g-4">
          <div className="col-md">
            <div
              className="card bg-dark d-flex text-light h-100 "
              onClick={() => history.push("/equipmentTable")}
            >
              <div className="card-body justify-content-center d-flex align-items-center">
                <div>
                  <div className="h1 mb-3">
                    <AiFillMedicineBox />
                  </div>
                  <h3 className="card-title mb-3">Equipment</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md">
            <div
                className="card bg-dark d-flex text-light h-100 "
                onClick={() => history.push("/search")}
            >
              <div className="card-body justify-content-center d-flex align-items-center">
                <div>
                  <div className="h1 mb-3">
                    <FaSearch />
                  </div>
                  <h3 className="card-title mb-3">Search Equipment</h3>
                </div>
              </div>
            </div>
          </div>

          {parseInt(getLevel()) === 3 &&
            <div className="col-md">
              <div
                  className="card bg-dark d-flex text-light h-100 "
                  onClick={() => history.push("/hospitalTable")}
              >
                <div className="card-body justify-content-center d-flex align-items-center">
                  <div>
                    <div className="h1 mb-3">
                      <FaRegHospital/>
                    </div>
                    <h3 className="card-title mb-3">Hospital</h3>
                  </div>
                </div>
              </div>
            </div>
          }

          <div className="col-md">
            <div
              className="card bg-dark text-light h-100"
              onClick={() => history.push("/usergroupTable")}
            >
              <div className="card-body justify-content-center d-flex align-items-center">
                <div>
                  <div className="h1 mb-3">
                    <RiGroupLine />
                  </div>
                  <h3 className="card-title mb-3">User Group</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md">
            <div
              className="card bg-dark text-light h-100"
              onClick={() => history.push("/issueTable")}
            >
              <div className="card-body justify-content-center d-flex align-items-center">
                <div>
                  <div className="h1 mb-3">
                    <GoReport />
                  </div>
                  <h3 className="card-title mb-3">Reported Issues</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md">
            <div
              className="card bg-dark text-light h-100"
              onClick={() => history.push("/contactbook")}
            >
              <div className="card-body justify-content-center d-flex align-items-center">
                <div>
                  <div className="h1 mb-3">
                    <HiOutlineDocumentReport />
                  </div>
                  <h3 className="card-title mb-3">Contact Book</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md">
            <div
              className="card bg-dark text-light h-100"
              onClick={() => history.push("/inbox")}
            >
              <div className="card-body justify-content-center d-flex align-items-center">
                <div>
                  <div className="h1 mb-3">
                    <HiOutlineDocumentReport />
                  </div>
                  <h3 className="card-title mb-3">Inbox</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md">
            <div
                className="card bg-dark text-light h-100"
                onClick={() => history.push("/reports")}
            >
              <div className="card-body text-center">
                <div className="h1 mb-3">
                  <HiOutlineDocumentReport />
                </div>
                <h3 className="card-title mb-3">Produce Report</h3>
              </div>
            </div>
          </div>

          <div className="col-md">
            <div
                className="card bg-dark d-flex text-light h-100 "
                onClick={() => history.push("/faq")}
            >
              <div className="card-body justify-content-center d-flex align-items-center">
                <div>
                  <div className="h1 mb-3">
                    <FaQuestion />
                  </div>
                  <h3 className="card-title mb-3">FAQs</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ButtonList;
