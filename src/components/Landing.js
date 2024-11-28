import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Fragment>
      <section className="banner_section">
        <div class="green p-2" style={{ opacity: "0.8" }}></div>
      </section>

      <div className="blue darken-2 center white-text ">
        <p className="flow-text">
          Social, mental and psychological health is critical to our personal
          growth. We provide resources that may help you move towards wellness.
        </p>
      </div>

      <div class="container">
        <h3 className="center white-text">COMMON ISSUES</h3>
        <div>
          <div className="row">
            <div className=" card">
              <div className="card-image col s12 m7 responsive">
                <img
                  src="https://www.hopkinsmedicine.org/-/media/images/health/_-images-to-be-filed/depressionsleep.ashx"
                  alt="A Depressed Woman"
                  className="responsive"
                />
              </div>

              <div className="card-content">
                <h4 className="card-title center">Depression</h4>
                <p className="card-text">
                  Are you going through a stressful situation that is putting
                  you down? Don't drown in your own thoughts. We're here to help
                </p>
              </div>
              <div className="card-action center">
                <Link to="/content" className="btn-small yellow darken-3 ">
                  <i className="material-icons left">help</i>
                  Get Help
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div class="card">
              <div className="card-image">
                <img
                  src="https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/Lifestyle/Female_Lit_Shadows-1296x728-Header.jpg?w=1155&h=1528"
                  alt="An addicted individual"
                  className="responsive-img"
                />
              </div>
              <div className="card-content">
                <h4 className="card-title">Suicidal Ideation</h4>
                <p className="card-text">
                  Life is too precious to terminate it prematurely. Pause, talk
                  to someone, reflect and rediscover the purpose of your life.
                  We can help.
                </p>
                <div className="card-action center ">
                  <Link to="/content" className="btn-small yellow darken-3 ">
                    <i className="material-icons left">help</i>
                    Get Help
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="card">
              <div className="card-image col s12 m7 push-l6">
                <img
                  src="https://i1.wp.com/www.additudemag.com/wp-content/uploads/2020/12/GettyImages-1175538640-e1606858814560.jpg"
                  alt="An anxious person"
                  className="responsive-img"
                />
              </div>
              <div className="card-content col s12 m5 pull-l7">
                <h4 className="card-title">Anxiety</h4>
                <p className="card-text">
                  Are you unsettled because you are anxious over something? You
                  are absolutely normal and you need to calm down. Engage us.
                </p>
                <div className="card-action center">
                  <Link to="/content" className="btn-small yellow darken-3 ">
                    <i className="material-icons left">help</i>
                    Get Help
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div class="col s12 m5">
            <div class="card row">
              <div className="card-image responsive col s12 m7 push-l5">
                <img
                  src="https://res.cloudinary.com/upskilled/image/fetch/w_660,h_440,c_crop,c_fill,g_face:auto,f_auto/https://www.upskilled.edu.au/getmedia%2F1188bf86-a123-4efe-ad93-46c99f550ad0%2Fa-day-in-the-life-of-a-marriage-counsellor-HERO.jpg%3B.aspx%3Fwidth%3D1000%26height%3D667%26ext%3D.jpg"
                  alt="Counselling session for couples"
                  className="responsive"
                />
              </div>

              <div className="card-content col s12 m5 pull-l7">
                <h4 className="card-title">Strained Relationships</h4>

                <p className="card-text">
                  Relationships can be rocky, but they should make you strong.
                  Engaging a professional can save your union. Any trouble?
                </p>
              </div>
              <div className="card-action center col s12">
                <Link to="/content" className="btn-small yellow darken-3 ">
                  <i className="material-icons left">help</i>
                  Get Help
                </Link>
              </div>
            </div>
          </div>

          <div class="">
            <div class="card">
              <div className="card-image">
                <img
                  src="https://media.istockphoto.com/id/516398618/photo/alcohol-and-drugs.jpg?s=612x612&w=0&k=20&c=qdkUJeFgYTG0ffnLYwcjJdtfSiLCjdJoLaEPn_pZnIk="
                  alt="Youth in Mentorship session"
                  className="responsive-img"
                />
              </div>
              <div className="card-content">
                <h4 className="card-title">Addictions</h4>

                <p className="card-text">
                  Addictions should not control your life. Any time is a good
                  time to stop. Overcome them by engaging a ReachOut Consel
                  Professional.
                </p>
                <div className="card-action center">
                  <Link to="/content" className="btn-small yellow darken-3 ">
                    <i className="material-icons left">help</i>
                    Get Help
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="card">
              <div className="card-image col s12 m9 responsive-img">
                <img
                  src="https://themindfulword.org/wp-content/uploads/2014/09/woman-grieving-loss.jpg"
                  alt="Schooling Teenagers"
                  className="responsive-img"
                />
              </div>
              <div className="card-content">
                <h4 className="card-title">Dealing With Loss</h4>

                <p className="card-text">
                  Loss is unbearable, but there is much more to live for. We may
                  never bring them back, but we can recover our happiness.
                </p>
              </div>
              <div className="card-action center col s12">
                <Link to="/content" className="btn-small yellow darken-3 ">
                  <i className="material-icons left">help</i>
                  Get Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
