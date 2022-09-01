import { connect } from "react-redux";
import { withRouter } from "../helpers";
import { useNavigate } from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";
import Answer from "./Answer";

const Question = (props) => {
	const navigate = useNavigate();

	const votesOne = props.question.optionOne.votes;
	const votesTwo = props.question.optionTwo.votes;

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
		navigate("/");
	};
	return (
		<>
			{!isAnswered() ? (
				<div>
					<h2>Poll by {props.question.author}</h2>
					<img src={require(`${window.location.origin}${props.users[props.question.author].avatarURL}`).default} style={{width:'100px',height:'auto' }}/>
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
