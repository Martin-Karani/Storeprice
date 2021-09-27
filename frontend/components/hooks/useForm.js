import { useState } from "react";

function useForm(callback = null, initialState = {}) {
  const [input, setInput] = useState(initialState);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callback();
  };
  return {
    handleChange,
    handleSubmit,
    input,
  };
}

export default useForm;
