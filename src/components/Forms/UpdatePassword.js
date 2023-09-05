import React from "react";
import Joi from "joi-browser";
import axios from "axios";
import { toast } from "react-toastify";
const UpdatePassword = ({ match: { params }, history }) => {
  const [data, setData] = React.useState({
    newPassword: "",
    confirmPassword: "",
    token: params.token,
    errors: {},
    showPass: false,
  });

  const Schema = {
    newPassword: Joi.string().required().min(0).max(8).label("New Password"),
    confirmPassword: Joi.string()
      .required()
      .min(0)
      .max(8)
      .label("Confirm Password"),
  };

  const validateInput = (e) => {
    const { name, value } = e.target;
    const obj = { name: value }; // [name] is a computed property name
    const schema = { name: Schema[name] };
    console.log(schema);
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    const errors = { ...data.errors };
    const errorMessage = validateInput(e);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];
    const formData = { ...data, errors };
    formData[name] = value;
    setData(formData);
  };
  const handleCheckChange = () => {
    setData({ ...data, showPass: !data.showPass });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    delete data.errors;
    try {
      const res = await axios.post("/api/auth/reset-password", data);
      console.log(res);
      const errors = res.data.errors;
      const success = res.data.success;
      if (success) {
        toast.success(success.msg);
        history.push("/login");
      } else {
        errors.map((e) => toast.error(e.msg));
      }
    } catch (err) {
      console.log(err.response);
      if (err.response.data.errors) {
        err.response.data.errors.map((e) => toast.error(e.msg));
      } else {
        toast.error(err.response.statusText);
      }
    }
  };
  return (
    <div>
      <h3 className="center yellow-text">Reset Password</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input-field">
          <input
            name="newPassword"
            type={data.showPass ? "text" : "password"}
            value={data.newPassword}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor="newPassword">New Password</label>
          {data.errors.newPassword && (
            <div
              style={{
                width: "50%",
                padding: "10px",
                borderRadius: "5px",
                margin: "0 auto",
                opacity: "0.7",
              }}
              className="red yellow-text center accent-4"
            >
              {data.errors.newPassword}
            </div>
          )}
        </div>

        <div className="input-field">
          <input
            type={data.showPass ? "text" : "password"}
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>

          {data.errors.confirmPassword && (
            <div
              style={{
                width: "50%",
                padding: "10px",
                borderRadius: "5px",
                margin: "0 auto",
                opacity: "0.7",
              }}
              className="red yellow-text center accent-4"
            >
              {data.errors.confirmPassword}
            </div>
          )}
        </div>
        <div className="input-field">
          <p>
            <label className="yellow-text">
              <input
                checked={data.showPass}
                type="checkbox"
                id="showPass"
                onChange={() => handleCheckChange()}
              />
              <span>
                {" "}
                {data.showPass ? "Hide Password " : "Show Password "}
              </span>
            </label>
          </p>
        </div>
        <button className="btn-small green" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
