import React from 'react'

const Footer = () => {
  return (
    <div className="footer_section">
    <footer>
      <div className="column">
        <div className="links">
          <h3>Relatable links</h3>
          <p>
            <a
              href="https://www.therapybyshannon.com/blog-2/2019/1/14/7-things-counseling-should-and-shouldnt-be"
              target="blank"
            >
              {" "}
              7 Things Counseling shouls and shouldn't be.
            </a>
          </p>
          <p>
            <a
              href="https://www.google.com/search?sxsrf=AOaemvLb1eh-Wg1YTnO0ukP4k4fwOP0pxA:1633944253437&q=5+facts+about+counseling&sa=X&ved=2ahUKEwiZ3bvWhMLzAhXT8OAKHRNUDLsQ1QJ6BAgtEAE"
              target="blank"
            >
              5 Facts about counseling.
            </a>
          </p>
          <p>
            <a
              href="https://medcraveonline.com/JPCPY/the-effect-of-psychological-counseling-on-mental-health.html"
              target="blank"
            >
              Effect of Counselling on mental health.
            </a>
          </p>
        </div>
        <div className="Quote">
          <p>
            {" "}
            <em>
              {" "}
              If we have no peace, it is because we have forgotten that we
              belong to each other.
            </em>
          </p>
          <p>― Mother Teresa.</p>
        </div>
      </div>

      <div className="column2">
        <div className="info">
          <h3>Information</h3>
          <p>
            <a href="#About Us">About Us</a>
          </p>
          <p>
            <a href="#Contact Us">Contact Us</a>
          </p>
          <p>
            {" "}
            <a href="Support Us"> Support Us</a>
          </p>
        </div>

        <div className="contacts">
          <h3>Contact Us</h3>
          <p>+02234567778</p>
          <p>
            <a href="jwnjoroge4@gmail.com">jwnjoroge4@gmail.com</a>
          </p>
        </div>

        <div className="socials">
          <a href="twitter.com">
            <img
              src="https://cliply.co/wp-content/uploads/2021/09/CLIPLY_372109260_TWITTER_LOGO_400.gif"
              alt=" twitter logo"
            />
          </a>
          <a href="whatsapp.com">
            <img
              src="https://cliply.co/wp-content/uploads/2021/08/372108180_WHATSAPP_ICON_400.gif"
              alt="whatsapp logo"
            />
          </a>
        </div>
      </div>

      <div className="copyrights">
        <p>
          Copyright &copy 2021 | All rights reserved |{" "}
          <a href="https://en.wikipedia.org/wiki/Online_counseling">
            License
          </a>{" "}
          |{" "}
          <a href="https://www.onlinetherapy.com/terms-and-conditions/">
            Terms and Services.
          </a>
        </p>
      </div>
    </footer>
  </div>
  )
}

export default Footer