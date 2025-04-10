
import { useEffect, useState } from 'react';
// import { searchGithubUser } from '../../api/API';
import BounceLoader from 'react-spinners/BounceLoader';
import { type CandidateDetails } from '../interfaces/Candidate.interface';
import './SavedCandidates.css';


const SavedCandidates = () => {
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState<CandidateDetails[]>([]);

	const removeFromStorage = (
		// e: React.MouseEvent<SVGSVGElement, MouseEvent>,
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		// e: { preventDefault: () => void },
		userId: number
	) => {
		e.preventDefault();

		console.log('user ID: ', userId);

		if (userId !== undefined) {
			let parsedSavedUsers: any[] = [];
			const storedCandidates = localStorage.getItem('savedCandidates');

			if (typeof storedCandidates === 'string') {
				parsedSavedUsers = JSON.parse(storedCandidates);

				console.log(
					' //SavedCandidates ~ parsedSavedUsers:',
					parsedSavedUsers
				);
			}

			parsedSavedUsers = parsedSavedUsers.filter(
				(candidate: { id: number }) => {
					console.log(candidate.id, userId);
					return candidate.id !== userId;
				}
			);

			console.log('Filtered users: ', parsedSavedUsers);

			setUsers(parsedSavedUsers);

			localStorage.setItem(
				'savedCandidates',
				JSON.stringify(parsedSavedUsers)
			);
		} else {
			console.error('Error removing userId from local storage', userId);
		}
	};

	useEffect(() => {
		setLoading(true);
		const savedUsers = localStorage.getItem('savedCandidates');
		if (savedUsers) {
			const parsedSavedUsers = JSON.parse(savedUsers);
			setLoading(false);
			setUsers(parsedSavedUsers);
		} else {
			console.error(
				'Error retriving savedUsers from localStorage: ',
				savedUsers
			);
		}
	}, []);

	//TODO: move some of this code up - searchGithubUser...
	// useEffect(() => {
	// 	setLoading(true);
	// 	const init = async () => {
	// 		const candidates: any[] = [];

	// 		for (let ii = 0; ii < usernames.length; ii++) {
	// 			const user = await searchGithubUser(usernames[ii]);
	// 			console.log('Loaded user: ', user);
	// 			if (user) {
	// 				candidates.push(user);
	// 			}
	// 		}

	// 		return candidates;
	// 	};

	// 	init()
	// 		.then((result) => {
	// 			setUsers(result);
	// 			setLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.log('Unable to fetch users', err);
	// 		});
	// }, [users]);

	// const handleRemoveUser = (userId: number) => {
	// 	const clonedUsers = [...users];

	// 	const userIndex = clonedUsers.findIndex((u) => {
	// 		console.log(u.id === userId);
	// 		return u.id === userId;
	// 	});
	// 	if (userIndex === undefined) {
	// 		console.log('No index found with userId: ', userId);
	// 		return;
	// 	}

	// 	clonedUsers.splice(userIndex, 1);

	// 	setUsers(clonedUsers);
	// };

	return (
		<div>
			<h1>Potential Candidates</h1>

			{loading ? (
				<BounceLoader color="#FFFFFF" />
			) : (
				<table>
					<thead>
						<tr>
							<th>Image</th>
							<th>Name</th>
							<th>Location</th>
							<th>Email</th>
							<th>Company</th>
							<th>Bio</th>
							<th>Reject</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr key={index}>
								<td>
									<img
										src={user?.avatar_url}
										className="table-row-image"
									/>
								</td>
								<td>
									{user.name ? user.name : 'No name found.'}
								</td>
								<td>
									{user.location
										? user.location
										: 'No location found.'}
								</td>
								<td>
									{user.email
										? user.email
										: 'No email found.'}
								</td>
								<td>
									{user.company
										? user.company
										: 'No company found.'}
								</td>
								<td>{user.bio ? user.bio : 'No bio found.'}</td>

								<td>
									<button
										onClick={(e) =>
											// handleRemoveUser(user.id)
											removeFromStorage(e, user.id)
										}>
										{' '}
										-{' '}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				// <div className="table-container">
				// 	<div className="table-row-black">
				// 		<div>Image</div>

				// 		<div>Name</div>

				// 		<div>Location</div>

				// 		<div>Email</div>

				// 		<div>Company</div>

				// 		<div>Bio</div>

				// 		<div>Reject</div>
				// 	</div>
				// 	{users.map((user, index) => (
				// 		<div
				// 			className={
				// 				index % 2 === 0
				// 					? 'table-row-gray'
				// 					: 'table-row-black'
				// 			}
				// 			key={index}>
				// 			<div>
				// 				<img
				// 					src={user?.avatar_url}
				// 					className="table-row-image"
				// 				/>
				// 			</div>

				// 			<div>
				// 				{user.name ? user.name : 'No Name found.'}
				// 			</div>

				// 			<div>
				// 				{user.location
				// 					? user.location
				// 					: 'No location found. '}
				// 			</div>

				// 			<div>{user.email}</div>

				// 			<div>
				// 				{user.company
				// 					? user.company
				// 					: 'No Company listed'}
				// 			</div>

				// 			<div>
				// 				{user.bio ? user.bio : 'Nothing to show.'}
				// 			</div>

				// 			<div>
				// 				<button
				// 					onClick={() => handleRemoveUser(user.id)}>
				// 					-
				// 				</button>
				// 			</div>
				// 		</div>
				// 	))}
				// </div>
			)}
		</div>
	);
};

export default SavedCandidates;
