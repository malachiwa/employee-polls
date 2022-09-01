import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const NewQuestion = ({ dispatch }) => {
	const navigate = useNavigate();
	const [optionOne, setOptionOne] = useState("");
	const [optionTwo, setOptionTwo] = useState("");

	const handleOneChange = (e) => {
		const text = e.target.value;

		setOptionOne(text);
	};

	const handleTwoChange = (e) => {
		const text = e.target.value;

		setOptionTwo(text);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(handleAddQuestion(optionOne, optionTwo));

		setOptionOne("");
		setOptionTwo("");

		navigate("/");
	};

	return (
		<div>
			<h3>Would you Rather</h3>
			<form onSubmit={handleSubmit}>
				<p>First option:</p>
				<input value={optionOne} onChange={handleOneChange} />
				<p>second option:</p>
				<input value={optionTwo} onChange={handleTwoChange} />

				<button
					type="submit"
					disabled={optionOne === "" || optionTwo === ""}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default connect()(NewQuestion);
