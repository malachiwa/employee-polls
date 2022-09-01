import { connect } from "react-redux";
import { formatDate } from "../helpers";
import { Link } from "react-router-dom";


const LiteQuestion = (props) => {
	if (props.question === null) {
		return <p>Question doesn't exist</p>;
	}
	const { author, timestamp } = props.question;
	return (
		<Link to={`/questions/${props.id}`}>
			<h3>{author}</h3>
			<p>{formatDate(timestamp)}</p>
		</Link>
	);
};

function mapStateToProps({ authedUser, questions }, {id}) {

	const question = questions[id];

	return {
		id,
		authedUser,
		question: question ? question : null,
	};
}

export default connect(mapStateToProps)(LiteQuestion);
