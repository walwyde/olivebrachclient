import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { displayContent } from "../Actions/contentDisplay";

const Content = () => {
  const [content, setContent] = useState({});

  const currentContent = displayContent(content);

  const handleClick = (e) => {
    e.preventDefault();
    setContent(e.target.id);
    e.target.setAttribute("class", "green-text");
  };
  return (
    <Fragment>
      <div className="row">
        <h3 className="yellow-text center">It's All Possible</h3>
        <div className="col s12 m5">
          <div className="sidebar">
            <Link
              to="#"
              onClick={(e) => handleClick(e)}
              id="suicidal_ideation"
              target="display_iframe"
            >
              Suicidal Ideation
            </Link>
            <Link
              to="#"
              onClick={(e) => handleClick(e)}
              id="addiction"
              target="display_iframe"
            >
              Addiction
            </Link>
            <Link
              to="#"
              onClick={(e) => handleClick(e)}
              id="loss"
              target="display_iframe"
            >
              Loss
            </Link>
            <Link
              to="#"
              onClick={(e) => handleClick(e)}
              id="anxiety"
              target="display_iframe"
            >
              Anxiety
            </Link>
            <Link
              to="#"
              onClick={(e) => handleClick(e)}
              id="relationship"
              target="display_iframe"
            >
              Relationship
            </Link>
            <Link
              to="#"
              onClick={(e) => handleClick(e)}
              id="depression"
              target="display_iframe"
            >
              Depression
            </Link>
          </div>
        </div>

        <div className="col s12 m6">
          <div className="card">
            <div className="card-content green darken-3">
              <h4 className="card-title">{currentContent.title}</h4>
              <p className="card-text ">
                {currentContent.description}
              </p>
              <Link to="/appointments" className="btn-floating pulse right">
                <i className="material-icons">handshake</i>
              </Link>
            </div>
            <div className="card-content green darken-3">
              <p className="card-text">{currentContent.expertAdvice}</p>
              <div className="">Word from the expert</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Content;
