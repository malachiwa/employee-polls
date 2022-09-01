import { _saveQuestion, _saveQuestionAnswer } from "../_DATA";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}

export function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question,
	};
}

export function handleAddQuestion(optionOneText, optionTwoText) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		const question = {
			optionOneText,
			optionTwoText,
			author: authedUser,
		};

		return _saveQuestion(question).then((question) =>
			dispatch(addQuestion(question))
		);
	};
}

export function addAnswer(answer) {
	return {
		type: ADD_ANSWER,
		answer,
	};
}

export function handleAddAnswer(qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		const answerObj = {
			qid,
			option: answer,
			authedUser,
		};

		return _saveQuestionAnswer({ authedUser, qid, answer }).then(() =>
			dispatch(addAnswer(answerObj))
		);
	};
}
