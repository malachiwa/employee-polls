const Answer = ({ isSelected, text, countThis, countAll }) => {
	return (
		<div>
			<h3> {isSelected ? <strong>Your Answer:</strong> : ""} </h3>
			<p>{text}</p>
			<p>
				{countThis} - {100 * (countThis / countAll)}%
			</p>
		</div>
	);
};

export default Answer;
