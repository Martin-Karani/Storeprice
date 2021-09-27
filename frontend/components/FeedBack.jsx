
function FeedBack() {
  const { input, handleChange, handleSubmit } = useForm({
    feedback: "",
  });
  return (
    <div className="feedBack">
      <h3>Thanks for Your FeedBack</h3>
      <textarea name="" id="" cols="30" rows="10" autoFocus></textarea>
      <button>Send</button>
    </div>
  );
}

export default FeedBack;
