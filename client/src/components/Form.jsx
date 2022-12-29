import React from "react";

const Form = () => {
  return (
    <form style={{ display: "flex", alignItems: "center" }}>
      <input
        autoFocus
        className="new-todo"
        placeholder="What needs to be done?"
      />
      {/* {isLoading && <span style={{ paddingRight: 10 }}>Loading...</span>} */}
    </form>
  );
};

export default Form;
