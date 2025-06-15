import { useState } from "react";
import axiosInstance from "../Hooks/axiosInstance";
import InputField from "./InputField";

function SignUp() {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const HendleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const { data: res } = await axiosInstance.post("/register", data);
      console.log(res.token);
      console.log(res);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  return (
    <>
      <div className="w-full h-[20vh] flex justify-center items-center text-5xl font-semibold">
        SignUp
      </div>
      <form
        action=""
        onSubmit={HendleSubmit}
        className="h-[60vh] w-full flex flex-col items-center justify-center  border-black"
      >
        <InputField
          Type={"text"}
          Change={handleChange}
          Data={data.name}
          Name={"name"}
        />
        <InputField
          Type={"text"}
          Change={handleChange}
          Data={data.username}
          Name={"username"}
        />
        <InputField
          Type={"email"}
          Change={handleChange}
          Data={data.email}
          Name={"email"}
        />
        <InputField
          Type={"password"}
          Change={handleChange}
          Data={data.password}
          Name={"password"}
        />
        <button
          type="submit"
          className="w-11/12 h-[10%] bg-green-400 text-2xl font-semibold text-white border"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default SignUp;
