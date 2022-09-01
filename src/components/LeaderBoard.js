import { connect } from "react-redux";

const LeaderBoard = (props) => {
	let sortableUsers = [];
	for (const user in props.users) {
		sortableUsers.push([
			props.users[user].name,
			Object.keys(props.users[user].answers).length,
			props.users[user].questions.length,
		]);
	}
	sortableUsers.sort(function (a, b) {
		const currB = b[1] + b[2];
		const currA = a[1] + a[2];
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
							<tr key={user[0]}>
								<td>{user[0]}</td>
								<td>{user[1]}</td>
								<td>{user[2]}</td>
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
