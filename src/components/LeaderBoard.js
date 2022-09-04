import { connect } from "react-redux";

const LeaderBoard = (props) => {
	let sortableUsers = [];
	for (const user in props.users) {
		sortableUsers.push({
			name: props.users[user].name,
			answers: Object.keys(props.users[user].answers).length,
			questions: props.users[user].questions.length,
			imgUrl: props.users[user].avatarURL,
		});
	}
	sortableUsers.sort(function (a, b) {
		const currB = b.answers + b.questions;
		const currA = a.answers + a.questions;
		return currB - currA;
	});

	return (
		<div>
			LeaderBoard
			<table>
				<thead>
					<tr>
						<th>User</th>
						<th>Answers</th>
						<th>Questions</th>
					</tr>
				</thead>
				<tbody>
					{sortableUsers.map((user) => {
						return (
							<tr key={user.name}>
								<td>
									<div>
										<p>{user.name}</p>
										<img
											src={`${process.env.PUBLIC_URL}/assets${user.imgUrl}`}
											style={{
												width: "100px",
												height: "auto",
											}}
											alt={user.name}
										/>
									</div>
								</td>
								<td>{user.answers}</td>
								<td>{user.questions}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

const mapStateToProps = ({ users }) => ({
	users,
});

export default connect(mapStateToProps)(LeaderBoard);
