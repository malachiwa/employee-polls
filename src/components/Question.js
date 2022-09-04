import { connect } from "react-redux";
import { withRouter } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { handleAddAnswer } from "../actions/questions";
import Answer from "./Answer";

const Question = (props) => {
	console.log("q props: ", props.question);

	const navigate = useNavigate();

	let votesOne, votesTwo;

	useEffect(() => {
		if (!props.question) {
			console.log("not found");
			navigate("/404");
		} else {
			console.log("found!");
			console.log(props.question);
		}
	}, [navigate]);

	if (props.question) {
		votesOne = props.question.optionOne.votes;
		votesTwo = props.question.optionTwo.votes;
	}

	if (props.question === null) {
		return <p>Question doesn't exist</p>;
	}

	const isAnswered = () => {
		if (
			votesOne.includes(props.authedUser) ||
			votesTwo.includes(props.authedUser)
		) {
			return true;
		}
		return false;
	};

	const isSelected = (votes) => {
		return votes.includes(props.authedUser);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		props.dispatch(handleAddAnswer(props.id, e.target.value));
		console.log(e.target.value);
	};
	return (
		<>
			<h2>Poll by {props.question.author}</h2>
			<img
				src={`${process.env.PUBLIC_URL}/assets${
					props.users[props.question.author].avatarURL
				}`}
				style={{ width: "100px", height: "auto" }}
				alt={props.question.author}
			/>
			{!isAnswered() ? (
				<div>
					Would You Rather
					<button value="optionOne" onClick={handleSubmit}>
						{props.question.optionOne.text}
					</button>
					<button value="optionTwo" onClick={handleSubmit}>
						{props.question.optionTwo.text}
					</button>
				</div>
			) : (
				<div>
					<Answer
						isSelected={isSelected(votesOne)}
						text={props.question.optionOne.text}
						countThis={votesOne.length}
						countAll={votesOne.length + votesTwo.length}
					/>
					<Answer
						isSelected={isSelected(votesTwo)}
						text={props.question.optionTwo.text}
						countThis={votesTwo.length}
						countAll={votesOne.length + votesTwo.length}
					/>
				</div>
			)}
		</>
	);
};

function mapStateToProps({ authedUser, questions, users }, props) {
	const { id } = props.router.params;
	const question = questions[id];

	return {
		id,
		authedUser,
		question: question ? question : null,
		users,
	};
}

export default withRouter(connect(mapStateToProps)(Question));
