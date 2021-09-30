import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./context/auth";
import { ASK_QUESTION } from "./graphql/Mutations";
import useForm from "./hooks/useForm";

function Questions({ questions, productId, productName, getProductRefetch }) {
  const { user } = useContext(AuthContext);
  const { handleChange, handleSubmit, input } = useForm(addQuestionCallback, {
    question: "",
  });
  const [toggleAskQuestion, setToggleAskQuestion] = useState(false);
  const [askQuestion, { loading: askQuestionLoading }] = useMutation(
    ASK_QUESTION,
    {
      onError(err) {
        console.log(err.graphQLErrors[0].message);
        // setErrors(err.graphQLErrors[0].extensions.exception.errors);
      },
      onCompleted(data) {
        console.log(data);
        getProductRefetch();

        setToggleAskQuestion(false);
      },
      variables: { question: input.question, productId },
    }
  );

  const router = useRouter();

  function addQuestionCallback() {
    if (user) {
      return askQuestion();
    } else {
      router.push("/login");
    }
  }
  if (askQuestionLoading) return "Loading";

  return (
    <div>
      <h3 className="category-name">Frequency Questions &amp; Answer</h3>
      <div>
        {questions.length > 0 &&
          questions.map((question, index) => (
            <ul key={question.questionId}>
              <p className="question">
                {index + 1} {question.question}
              </p>
              <p className="question-author italic">
                By {question.creator.userName}
              </p>
              <button className="add-answer-btn">Add Answer</button>
              {/* <div className="add-answer-form">
                <h3 className="category-name"></h3>
                <div>Samsung S9+</div>
                <div>
                  {index + 1} {question.question}
                </div>
                <textarea name="" id="" cols="30" rows="2"></textarea>
              </div> */}
              {question.answers && question.answers.length > 0 ? (
                <li className="answers tab">
                  {question.answers.map((answer) => (
                    <div className="answer " key={answer.answerId}>
                      {answer.answer}
                    </div>
                  ))}
                </li>
              ) : (
                <div className="no-answers tab italic">No answers yet</div>
              )}
            </ul>
          ))}
      </div>

      <hr className="hr" />
      <p className="category-name__desc">
        Ask a Question about the product and get Answers from us or other
        members
      </p>
      <button
        className="askQuestion-btn"
        onClick={() => setToggleAskQuestion(true)}
      >
        Ask a Question
      </button>
      {toggleAskQuestion && (
        <div>
          <div
            className="overlay"
            onClick={() => setToggleAskQuestion(false)}
          ></div>
          <div className="similar-card">
            <button
              className="close"
              onClick={() => setToggleAskQuestion(false)}
            >
              &times;
            </button>
            <h3 className="category-name">
              Ask Any Question about {productName}
            </h3>
            <textarea
              id=""
              cols="30"
              rows="10"
              name="question"
              value={input.question}
              onChange={handleChange}
              placeholder="Characters "
              className="question-asked"
              autoFocus
            ></textarea>
            <div className="flex-row justify-space-btwn">
              <button
                className="btn-cancel"
                onClick={() => setToggleAskQuestion(false)}
              >
                Cancel
              </button>
              <button className="btn-post" onClick={handleSubmit}>
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Questions;
