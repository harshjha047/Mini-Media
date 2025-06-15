import React from "react";

function InputField({
    Type,
    Data,
    Change,
    Name
}) {
  return (
    <div className="w-11/12  flex flex-col h-1/5 border-black">
      <label htmlFor={Name} className="text-2xl">
        {Name.charAt(0).toUpperCase() + Name.slice(1)}
      </label>
      <input
        type={Type}
        value={Data}
        name={Name}
        required
        onChange={Change}
        className="w-full h-1/2 border-black text-2xl rounded-md p-2 bg-gray-300"
      />
    </div>
  );
}

export default InputField;
