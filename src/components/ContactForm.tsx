import { useState } from "react";
import "../index.css";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  message: string;
}

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [successMessage, setSuccessMessage] = useState("");
  const onSubmit = () => {
    setSuccessMessage("We have received your information successfully!");
  };

  return (
    <>
      <form
        className="contact-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="name-div">
          <label htmlFor="name">Name </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: {
                value: true,
                message: "The name field is required!",
              },
              minLength: {
                value: 3,
                message: "Name length has to be at least 3!",
              },
              pattern: {
                value: /[a-zA-Z]+\s*/,
                message:
                  "Name should only contain letters and a space separating them!",
              },
            })}
          />
          {errors?.name?.type == "required" && <p>{errors.name.message}</p>}
          {errors?.name?.type == "minLength" && <p>{errors.name.message}</p>}
          {errors?.name?.type == "pattern" && <p>{errors.name.message}</p>}
        </div>
        <div className="email-div">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "The email field is required!",
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid E-mail format!",
              },
            })}
          />
          {errors?.email?.type == "required" && (
            <p> {errors.email?.message} </p>
          )}
          {errors?.email?.type == "pattern" && <p> {errors.email?.message} </p>}
        </div>

        <div className="message-div">
          <label htmlFor="message">Message </label>
          <input
            type="text"
            id="message"
            {...register("message", {
              required: {
                value: true,
                message: "The message field is required!",
              },
            })}
          />
          {errors?.message?.type == "required" && (
            <p>{errors.message?.message} </p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
      {successMessage && <h3>{successMessage}</h3>}
    </>
  );
}

export default ContactForm;
