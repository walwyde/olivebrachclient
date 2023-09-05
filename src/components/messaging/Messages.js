// import React from "react";
// import { Link } from "react-router-dom";

// const messages = () => {
//   return (
//     <div>
//       <ul>
//         <li>
//           <div className="card">
//             <div className="card-content">
//               <h6 className="card-title">john</h6>
//               <p className="card-text truncate">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 Excepturi omnis veniam unde. Voluptatem, aliquam labore animi
//                 non consequuntur quidem ipsum, saepe libero quos corrupti
//                 maxime! Ratione sunt modi dolorum dicta!
//               </p>
//             </div>
//             <div className="card-action">
//               <Link to="/messages/22" className="right">
//                 Chat
//               </Link>
//             </div>
//           </div>
//         </li>
//         <li>
//           <div className="card">
//             <div className="card-content">
//               <h6 className="card-title">john</h6>
//               <p className="card-text truncate">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 Excepturi omnis veniam unde. Voluptatem, aliquam labore animi
//                 non consequuntur quidem ipsum, saepe libero quos corrupti
//                 maxime! Ratione sunt modi dolorum dicta!
//               </p>
//             </div>
//             <div className="card-action">
//               <Link to="/messages/22" className="right">
//                 Chat
//               </Link>
//             </div>
//           </div>
//         </li>
//         <li>
//           <div className="card">
//             <div className="card-content">
//               <h6 className="card-title">john</h6>
//               <p className="card-text truncate">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 Excepturi omnis veniam unde. Voluptatem, aliquam labore animi
//                 non consequuntur quidem ipsum, saepe libero quos corrupti
//                 maxime! Ratione sunt modi dolorum dicta!
//               </p>
//             </div>
//             <div className="card-action">
//               <Link to="/messages/22" className="right">
//                 Chat
//               </Link>
//             </div>
//           </div>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default messages;

import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getConversations,
  deleteConvo,
  loadNewMessages,
} from "../../Actions/messaging";

const MessageInterface = ({
  getConversations,
  loadNewMessages,
  deleteConvo,
  message: { conversations, loading },
  auth: { user, loading: authloading },
  history,
}) => {
  useEffect(() => {
    getConversations();
    loadNewMessages(!authloading && user && user._id);
  }, [
    loading,
    authloading,
    user,
    getConversations,
    authloading,
    loadNewMessages,
  ]);

  const handleDeleteConvo = (convoId) => {
    console.log(convoId);
    deleteConvo(convoId);
  };

  if (!loading && conversations.length === 0)
    return (
      <Fragment>
        <h5 className="center yellow-text">You have no conversations yet..</h5>
        <Link to="/profile" className="btn btn-primary btn-sm m-2">
          Go Back
        </Link>
      </Fragment>
    );
  return (
    !loading &&
    conversations && (
      <Fragment>
        <Link
          className="btn btn-primary btn-sm m-2"
          to="."
          onClick={() => history.push("/profile")}
        >
          Go Back
        </Link>
        <div className="mt-3">
          {!authloading &&
            !loading &&
            conversations.map((convo) => (
              <div key={convo._id} className=" card">
                <div className="card-content">
                  <span className="card-title">
                    {convo.participants[0]._id !== user._id
                      ? convo.participants[0].fullname
                      : convo.participants[1].fullname}
                    {convo.messages &&
                    convo.messages.length > 0 &&
                    convo.messages[convo.messages.length - 1].seen.indexOf(
                      user && user._id
                    ) === -1
                      ? " (Read)"
                      : ""}
                  </span>
                  <hr />
                  <div>
                    <p className="green-text truncate">
                      {convo.messages.length > 0
                        ? convo.messages[convo.messages.length - 1].content
                        : "No messages in this conversation yet.."}
                    </p>
                  </div>
                  <div className="card-action">
                    <Link
                      className="right btn-small green "
                      to={`/messages/${
                        convo.participants[0]._id !== user._id
                          ? convo.participants[0]._id
                          : convo.participants[1]._id
                      }`}
                    >
                      View Chat
                    </Link>
                    <button
                      onClick={() => handleDeleteConvo(convo._id)}
                      className="btn-small red"
                    >
                      delete chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Fragment>
    )
  );
};

MessageInterface.propTypes = {
  getConversations: PropTypes.func.isRequired,
  loadNewMessages: PropTypes.func.isRequired,
  deleteConvo: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.message,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getConversations,
  deleteConvo,
  loadNewMessages,
})(MessageInterface);
