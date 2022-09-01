import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_ANSWER } from "../actions/questions";

export default function questions(state = {}, action) {
	switch (action.type) {
		case RECEIVE_QUESTIONS:
			return {
				...state,
				...action.questions,
			};
		case ADD_QUESTION:
			return {
				...state,
				[action.question.id] : action.question
			}
		case ADD_ANSWER:
			const {qid, option, authedUser} = action.answer;
			return {
				...state,
				[qid] : {
					...state[qid], 
					[option] : {
						...state[qid][option],
						votes: state[qid][option].votes.concat([authedUser])
					}
				}
			}
		default:
			return state;
	}
}
