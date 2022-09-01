import { connect } from "react-redux";
import LiteQuestion from "./LiteQuestion";

const Dashboard = (props) => {
	let doneQuestionsIds = [];
	let newQuestionsIds = [];

	props.questionIds.forEach((id) => {
		if (
			props &&
			props.questions[id] &&
			(props.questions[id].optionOne.votes.includes(props.authedUser) ||
				props.questions[id].optionTwo.votes.includes(props.authedUser))
		) {
			doneQuestionsIds.push(id);
		} else {
			newQuestionsIds.push(id);
		}
	});

	return (
		<div>
			<div>
				<h2>New Questions</h2>
				<ul>
					{newQuestionsIds.map((id) => {
						return (
							<li key={id}>
								<LiteQuestion id={id} />
							</li>
						);
					})}
				</ul>
			</div>
			<div>
				<h2>Done</h2>
				<ul>
					{doneQuestionsIds.map((id) => {
						return (
							<li key={id}>
								<LiteQuestion id={id} />
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

const mapStateToProps = ({ questions, authedUser }) => ({
	questionIds: Object.keys(questions).sort(
		(a, b) => questions[b].timestamp - questions[a].timestamp
	),
	questions,
	authedUser,
});

export default connect(mapStateToProps)(Dashboard);
