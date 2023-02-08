import React, { useEffect, useState } from "react";
import axios from "../utilities/axios";
import "../styles/projects.scss";
import moment from "moment";
import {
  HourglassTop,
  CameraVideo,
  Film,
  ChatLeftText,
  CheckCircle,
  XLg,
} from "react-bootstrap-icons";

function Projects() {
  const [data, setData] = useState([
    { id: "", name: "", status: "", type: "", createdOn: "", archived: false },
  ]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
  const [order, setOrder] = useState<string>("desc");
  const [label, setLabel] = useState<boolean>(true);

  useEffect(() => {
    getTotalData();
    getData();
  }, [page, search, status, type, display, order]);
  async function getTotalData() {
    let query = `data?`;
    if (search) {
      query = query + `&name_like=${search}`;
    }
    if (status) {
      query = query + `&status=${status}`;
    }
    if (type) {
      query = query + `&type=${type}`;
    }
    if (display) {
      query = query + `&archived=${display}`;
    }
    const data = await axios.get(query);
    setTotalPage(Math.ceil(data.data.length / 10));
  }
  async function getData() {
    let query = `data?_page=${page}&_limit=10&_sort=createdOn&_order=${order}`;
    if (search) {
      query = query + `&name_like=${search}`;
    }
    if (status) {
      query = query + `&status=${status}`;
    }
    if (type) {
      query = query + `&type=${type}`;
    }
    if (display) {
      query = query + `&archived=${display}`;
    }
    const data = await axios.get(query);
    setData(data.data);
    window.scrollTo(0, 0);
  }
  const prevPageHandler = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };
  const nextPageHandler = () => {
    if (page === totalPage) {
      return;
    }
    setPage(page + 1);
  };
  const keywordHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setKeyword(e.target.value);
  };
  const searchHandler = () => {
    setSearch(keyword);
    setPage(1);
  };
  const statusHandler = (value: React.SetStateAction<string>) => {
    setStatus(value);
  };
  const typeHandler = (value: React.SetStateAction<string>) => {
    setType(value);
  };
  const displayHandler = (
    value: boolean | ((prevState: boolean) => boolean)
  ) => {
    setDisplay(value);
  };
  const sortHandler = (value: React.SetStateAction<string>) => {
    setOrder(value);
  };
  const labelHandler = () => {
    setLabel(!label);
  };

  return (
    <div className="row col-l-12 p-0 m-0 body">
      <img
        src={require("../assets/images/logo.png")}
        className="vimi-logo d-none d-md-flex"
      />
      <div className="box">
        <div className="bar">
          <input
            type="text"
            className="input"
            onChange={keywordHandler}
            value={keyword}
            placeholder="Search Project ..."
          />
          <div className="button" onClick={searchHandler}>
            <div>Search</div>
          </div>
        </div>
        <div className={label ? "label" : "none"}>
          <div className="status">
            <div
              className={status === "INCOMPLETE" ? "item-active" : "item"}
              onClick={() => {
                statusHandler("INCOMPLETE");
              }}
            >
              Form Incomplete
            </div>
            <div
              className={status === "SHOOTING" ? "item-active" : "item"}
              onClick={() => {
                statusHandler("SHOOTING");
              }}
            >
              Shooting
            </div>
            <div
              className={status === "EDITING" ? "item-active" : "item"}
              onClick={() => {
                statusHandler("EDITING");
              }}
            >
              Video Editing
            </div>
            <div
              className={status === "FEEDBACK" ? "item-active" : "item"}
              onClick={() => {
                statusHandler("FEEDBACK");
              }}
            >
              Waiting for Feedback
            </div>
            <div
              className={status === "COMPLETED" ? "item-active" : "item"}
              onClick={() => {
                statusHandler("COMPLETED");
              }}
            >
              Completed
            </div>
          </div>
          <div className="type">
            <div
              className={type === "educational" ? "item-active" : "item"}
              onClick={() => {
                typeHandler("educational");
              }}
            >
              Educational
            </div>
            <div
              className={type === "testimonial" ? "item-active" : "item"}
              onClick={() => {
                typeHandler("testimonial");
              }}
            >
              Testimonial
            </div>
            <div
              className={type === "training" ? "item-active" : "item"}
              onClick={() => {
                typeHandler("training");
              }}
            >
              Training
            </div>
            <div
              className={type === "recreational" ? "item-active" : "item"}
              onClick={() => {
                typeHandler("recreational");
              }}
            >
              Recreational
            </div>
          </div>
          <div className="display">
            <div
              className={display === false ? "item-active" : "item"}
              onClick={() => {
                displayHandler(false);
              }}
            >
              Active
            </div>
            <div
              className={display === true ? "item-active" : "item"}
              onClick={() => {
                displayHandler(true);
              }}
            >
              Archived
            </div>
          </div>
        </div>
        <div className="buttonContainer">
          <div className="hide" onClick={labelHandler}>
            {label ? "Hide Filters" : "Show Filters"}
          </div>
          <div
            className="clear"
            onClick={() => {
              statusHandler("");
              displayHandler(false);
              typeHandler("");
              setKeyword("");
              setSearch("");
              setPage(1);
              setOrder("desc");
            }}
          >
            <XLg />
            <div>Reset</div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="header">
          <select
            name="sort"
            id="sort"
            onChange={(e) => {
              sortHandler(e.target.value);
            }}
            value={order}
            className="sort"
          >
            <option value="desc">Sort Newest to Oldes</option>
            <option value="asc">Sort Oldest to Newest</option>
          </select>
        </div>
        <div className="row column d-none d-md-flex">
          <div className="col-lg-3 col-md-3">Name</div>
          <div className="col-lg-3 col-md-3">Type</div>
          <div className="col-lg-3 col-md-3">Status</div>
          <div className="col-lg-3 col-md-3">Created</div>
        </div>
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <div key={item.id} className="row item">
                <div className="col-lg-3 col-md-3">{item.name}</div>
                <div className="col-lg-3 col-md-3">
                  {item.type === "educational" ? <div>Educational</div> : <></>}
                  {item.type === "testimonial" ? <div>Testimonial</div> : <></>}
                  {item.type === "training" ? <div>Training</div> : <></>}
                  {item.type === "recreational" ? (
                    <div>Recreational</div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="col-lg-3 col-md-3 status">
                  {item.status === "INCOMPLETE" ? (
                    <div className="container-incomplete">
                      <HourglassTop className="logo" />
                      Form Incomplete
                    </div>
                  ) : (
                    <></>
                  )}
                  {item.status === "SHOOTING" ? (
                    <div className="container-shooting">
                      <CameraVideo className="logo" />
                      Shooting
                    </div>
                  ) : (
                    <></>
                  )}
                  {item.status === "EDITING" ? (
                    <div className="container-editing">
                      <Film className="logo" />
                      Video Editing
                    </div>
                  ) : (
                    <></>
                  )}
                  {item.status === "FEEDBACK" ? (
                    <div className="container-feedback">
                      <ChatLeftText className="logo" />
                      Waiting for Feedback
                    </div>
                  ) : (
                    <></>
                  )}
                  {item.status === "COMPLETED" ? (
                    <div className="container-completed">
                      <CheckCircle className="logo" />
                      Completed
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="col-lg-3 col-md-3 text-end text-md-start">
                  {moment(item.createdOn).format("MMMM D, YYYY")}
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
        <div className="pagination">
          <div className="button" onClick={prevPageHandler}>
            Prev
          </div>
          <div className="page">
            {page}/{totalPage}
          </div>
          <div className="button" onClick={nextPageHandler}>
            Next
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
