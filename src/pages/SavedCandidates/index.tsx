import { useEffect, useState } from 'react';
// import { searchGithubUser } from '../../api/API';
import { Minus } from 'lucide-react';

import BounceLoader from 'react-spinners/BounceLoader';
import { type CandidateDetails } from '../../interfaces/Candidate.interface';

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
			let parsedSavedUsers = [];
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

	console.log(users.length);

	return (
		<div>
			<h1>Potential Candidates</h1>

			{loading ? (
				<BounceLoader color="#FFFFFF" />
			) : users.length > 0 ? (
				<table className="table">
					<thead>
						<tr>
							<th>Image</th>
							<th>Name</th>
							<th>Username</th>
							<th>Location</th>
							<th>Email</th>
							<th>URL</th>
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
									{user.login ? user.login : 'No name found.'}
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
									{user.html_url
										? user.html_url
										: 'No URL found.'}
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
											removeFromStorage(e, user.id)
										}
										className="minus-button2">
										<Minus className="button" />{' '}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className="noCandidates">
					No candidates have been accepted.
				</p>
			)}
		</div>
	);
};

export default SavedCandidates;
