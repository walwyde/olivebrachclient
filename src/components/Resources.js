import React from "react";

const Resources = () => {
  return (
    <div className="categories_section">
      <div className="educational_videos_section center-align">
        <h1 className=" green-text center-align">
          <strong>EXPERTS' TALK</strong>
        </h1>
          <div className="row center-align">
            <div className="col-sm-4 green lighten-3">
              <div className="embed-responsive embed-responsive-16by9">
                <h3>DEPRESSION</h3>
                <iframe
                  width="400"
                  height="400"
                  src="https://www.youtube.com/embed/f_gL2WAoL-M"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                <p>
                  The video shows a kid who is depressed and almost commiting
                  suicide.
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="embed-responsive embed-responsive-16by9">
                <h3> SUICIDAL IDEATION</h3>
                <iframe
                  width="400"
                  height="400"
                  src="https://www.youtube.com/embed/_TV81xIJsVo"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>

                <p>
                  This is a sample video of man without limbs and hands who
                  almost killed himself.
                </p>
              </div>
            </div>
            <div className="col-sm-4 green lighten-3">
              <div className="embed-responsive embed-responsive-16by9">
                <h3>
                  <strong>ANXIETY</strong>
                </h3>
                <iframe
                  width="400"
                  height="400"
                  src="https://www.youtube.com/embed/psQkuax3xj0"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>

                <p>
                  The video tells more on axiety,all the insecurity and the
                  trepidation and what they mean
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="embed-responsive embed-responsive-16by9">
                <h3>
                  <strong>LOSS</strong>
                </h3>
                <iframe
                  width="400"
                  height="400"
                  src="https://www.youtube.com/embed/_D6Lqsl4lPs"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                <p>
                  The video tells more about loss and how to deal to with loss
                </p>
              </div>
            </div>
            <div className="col-sm-4 green lighten-3">
              <div className="embed-responsive embed-responsive-16by9">
                <h3>
                  <strong>ADDICTION</strong>
                </h3>
                <iframe
                  width="400"
                  height="400"
                  src="https://www.youtube.com/embed/y4lxgcyCM6o"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                <p>The video shows more on addiction</p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="embed-responsive embed-responsive-16by9">
                <h3>
                  <strong>RELATIONSHIPS</strong>
                </h3>
                <iframe
                  width="400"
                  height="400"
                  src="https://www.youtube.com/embed/cn5JpA5mIV0"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>

                <p>
                  This is a sample video that talks more on toxic relationships.
                </p>
              </div>
            </div>
          </div>
        <div className="clearfix"></div>
      </div>
    </div>
  );
};

export default Resources;
