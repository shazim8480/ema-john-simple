import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import "./Shipment.css";

const Shipment = () => {
  // calling context api to set name and email field dynamically//
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log("form submitted", data);

  // console.log(watch("form submitted")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Your Name"
        defaultValue={loggedInUser.name}
        {...register("name", { required: true })}
      />
      {errors.name && <span className="error">Name is required</span>}

      <input
        placeholder="Your email"
        defaultValue={loggedInUser.email}
        {...register("email", { required: true })}
      />
      {errors.email && <span className="error">Email is required</span>}

      <input
        placeholder="Your Address"
        {...register("address", { required: true })}
      />
      {errors.address && <span className="error">Address is required</span>}

      <input
        placeholder="Your Contact Number"
        {...register("contact", { required: true })}
      />
      {errors.contact && (
        <span className="error">Contact Number is required</span>
      )}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
