const Answer = ({isSelected, text,countThis, countAll}) => {
	return (
		<div>
			<p>
				{isSelected ? <strong>Your Answer:</strong> : ""}{" "}
				{text}
			</p>
			<p>
				{countThis} -{" "}
				{100 * (countThis / (countAll))}%
			</p>
		</div>
	);
};

export default Answer;
