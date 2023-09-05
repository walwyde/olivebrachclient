// import React from "react";
// import { Link } from "react-router-dom";

// const Conversation = () => {
//   return (
//     <div>
//       <h4 className="yellow-text center">Active Conversation</h4>
//       <div className="row">
//         <div className="col m4 hide-on-med-and-down">
//           <div className="card">
//             <div className="card-image">
//               <img src="https://picsum/photos/300" alt="" srcset="" />
//             </div>
//             <div className="card-content">
//               <span className="card-title center">John Doe</span>
//             </div>
//             <div className="card-action">
//               <Link to="." onClick={() => history.goBack()} className="right">
//                 Close Chat
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="col m6 push-l2">
//           <div className="card">
//             <div className="card-content">
//               <span className="card-title">me</span>
//               <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quo reprehenderit ex voluptate consequuntur autem, vero tenetur animi, praesentium, labore rerum veniam nihil? Perferendis laudantium inventore nisi repellendus, consequuntur magni.</p>
//             </div>
//             <div className="card-content">
//               <span className="card-title">
//                 john
//               </span>
//               <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere reprehenderit vero voluptas eligendi ad placeat dolorem cum ducimus blanditiis deserunt, error officia ut itaque natus nostrum dolores. Voluptatibus, molestiae? Commodi?</p>
//             </div>

//             <div className="card-action hide-on-med-and-up">
//               <Link to="." onClick={() => history.back()}>Close Chat</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Conversation;

import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import lodash from "lodash";
import Loading from "../layouts/Loading";
import { connect } from "react-redux";
import {
  initConversation,
  saveMessage,
  getConvoMessages,
  deleteMessage,
  setViewed,
} from "../../Actions/messaging";
import Moment from "react-moment";
import moment from "moment";
import { Link } from "react-router-dom";
import Conversation from "./Conversation";

//owns message array state, assembles subcomponents:
const api = ({
  match,
  initConversation,
  getConvoMessages,
  saveMessage,
  deleteMessage,
  setViewed,
  message: { loading, messages, conversation },
  auth: { user, loading: authloading },
}) => {
  useEffect(() => {
    initConversation(match.params.id);
    setViewed(
      !loading && conversation && conversation._id,
      !authloading && user && user._id
    );
  }, [loading, authloading, conversation._id, initConversation, match.params.id]);

  console.log(match.params);
  const [message, setMessage] = useState({
    sender: !authloading && user && user._id,
    conversation: !loading && conversation && conversation._id,
    timestamp: Date.now(),
    content: "",
  });

  const handleSubmit = (e) => {
    console.log(message);
    e.preventDefault();

    // const newMessages = [...messages, message];

    saveMessage(message, conversation._id);

    setMessage({
      sender: !authloading && user._id,
      conversation: !loading && conversation._id,
      timestamp: "",
      content: "",
    });
  };
  const handleTextChange = (e) => {
    e.preventDefault();
    setMessage({
      ...message,
      sender: user && user._id,
      [e.target.name]: e.target.value,
    });
  };

  const handleMessageDelete = (conversationId, messageId) => {
    deleteMessage(conversationId, messageId);
    console.log(conversationId, messageId);
  };

  const listenForEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
      toast.info('Click "send" To send message');
    }
  };

  const orderedMessages =
    !loading &&
    conversation &&
    lodash.orderBy(conversation.messages, "timestamp", "desc");

  const mapMessages = (messages) =>
    messages.map((message) => (
      <div className="card" key={!loading && message._id}>
        <div className="card-content">
          <span className="card-title">
            {message.sender === user._id ? (
              <span className="card-title">me</span>
            ) : (
              <span className="card-title">
                {conversation.participants[1]._id !== user._id
                  ? conversation.participants[1].fullname
                  : conversation.participants[0].fullname}
              </span>
            )}
          </span>

          <p>{message.content}</p>
          <span className=" card-text green-text">
            {moment(message.timestamp).fromNow()}
          </span>

          {message.sender === user._id && (
            <div className="card-action">
              <button
                onClick={() =>
                  handleMessageDelete(conversation._id, message._id)
                }
                className="right red accent-4 btn-small"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    ));

  const renderMessageInput = () => (
    <div>
      <Link className="btn-small show-on-medium-and-down" to="/messages">
        Close Chat
      </Link>
      <form onSubmit={handleSubmit} className="center">
        <div className="input-field">
          <textarea
            // placeholder="Your Message"
            name="content"
            value={message.content}
            onChange={handleTextChange}
            onKeyDown={(e) => listenForEnterKey(e)}
            className="materialize-textarea"
          ></textarea>
          <label htmlFor="content">message</label>
          <span className="helper-text">Type your message here</span>
        </div>
        <div className="input-field">
          <input
            className="btn btn-primary p-3"
            type="submit"
            value="Send"
            disabled={message.content === "" && "disabled"}
          />
        </div>
      </form>
    </div>
  );

  if (!loading && !conversation) {
    return (
      <Fragment>
        <p className="flow-text center">
          Unable to initialize conversation, please try again
        </p>
        <Link to="/messages" className="btn-small yellow darken-3">
          Go Back
        </Link>
      </Fragment>
    );
  }

  return (
    <div className="row">
      <h5 className="yellow-text center">Active Conversation</h5>
      {!loading && conversation.participants && (
        <Fragment>
          <div className="col m4 hide-on-med-and-down">
            <div className="card">
              <div className="card-image m-auto">
                <img
                  src={
                    !authloading &&
                    !loading &&
                    conversation.participants[0]._id !== user._id
                      ? `http://localhost:3001/${
                          conversation.participants[0] &&
                          conversation.participants[0].avatar
                        }`
                      : `http://localhost:3001/${
                          conversation.participants[1] &&
                          conversation.participants[1].avatar
                        }`
                  }
                  alt="avatar"
                  className="responsive-img"
                />
              </div>

              <div className="card-content">
                <p className="card-title">
                  {!authloading &&
                  !loading &&
                  conversation &&
                  conversation.participants[0]._id !== user._id
                    ? conversation.participants[0].fullname
                    : conversation.participants[1].fullname}
                </p>
              </div>
              <div className="card-action">
                <Link className="card-link btn btn-primary m-2" to="/messages">
                  Close Chat
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}

      <div className="col-md-7">
        <div>{renderMessageInput()}</div>

        {authloading && loading ? (
          <Fragment>
            <Loading />
          </Fragment>
        ) : !authloading &&
          !loading &&
          conversation &&
          conversation.messages &&
          conversation.messages.length > 0 ? (
          <Fragment>
            <div>{mapMessages(orderedMessages)}</div>
          </Fragment>
        ) : (
          <Fragment>
            <h5 className="center yellow-text">No messages Yet</h5>
          </Fragment>
        )}
      </div>
    </div>
  );
};

api.propTypes = {
  match: PropTypes.object.isRequired,
  initConversation: PropTypes.func.isRequired,
  getConvoMessages: PropTypes.func.isRequired,
  setViewed: PropTypes.func.isRequired,
  saveMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  message: state.message,
});

export default connect(mapStateToProps, {
  initConversation,
  saveMessage,
  deleteMessage,
  getConvoMessages,
  setViewed,
})(api);
