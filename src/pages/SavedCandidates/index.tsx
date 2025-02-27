import { useEffect, useState } from 'react';
import { searchGithubUser } from '../../api/API'; 
import BounceLoader from 'react-spinners/BounceLoader';
// import { type CandidateDetails } from '../interfaces/Candidate.interface';
import './SavedCandidates.css';

type Props = {
	usernames: string[];
};

const SavedCandidates = ({ usernames }: Props) => {
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState<any[]>([]);

	useEffect(() => {
		setLoading(true);
		const init = async () => {
			const users: any[] = [];

			for (let ii = 0; ii < usernames.length; ii++) {
				const user = await searchGithubUser(usernames[ii]);
				console.log('Loaded user: ', user);
				if (user) {
					users.push(user);
				}
			}

			return users;
		};

		init()
			.then((result) => {
				setUsers(result);
				setLoading(false);
			})
			.catch((err) => {
				console.log('Unable to fetch users', err);
			});
	}, [usernames]);

	const handleRemoveUser = (userId: number) => {
		const clonedUsers = [...users];

		const userIndex = clonedUsers.findIndex((u) => {
			console.log(u.id === userId);
			return u.id === userId;
		});
		if (userIndex === undefined) {
			console.log('No index found with userId: ', userId);
			return;
		}

		clonedUsers.splice(userIndex, 1);

		setUsers(clonedUsers);
	};

	return (
		<div>
			<h1>Potential Candidates</h1>

			{loading ? (
				<BounceLoader color="#FFFFFF" />
			) : (
				//TODO: style container for table
				<div className="table-container">
					<div className="table-row-black">
						<div>Image</div>

						<div>Name</div>

						<div>Location</div>

						<div>Email</div>

						<div>Company</div>

						<div>Bio</div>

						<div>Reject</div>
					</div>
					{users.map((user, index) => (
						<div
							className={
								index % 2 === 0
									? 'table-row-gray'
									: 'table-row-black'
							}
							key={index}>
							<div>
								<img
									src={user?.avatar_url}
									className="table-row-image"
								/>
							</div>

							<div>
								{user.name ? user.name : 'No Name found.'}
							</div>

							<div>
								{user.location
									? user.location
									: 'No location found. '}
							</div>

							<div>{user.email}</div>

							<div>
								{user.company
									? user.company
									: 'No Company listed'}
							</div>

							<div>
								{user.bio ? user.bio : 'Nothing to show.'}
							</div>

							<div>
								<button
									onClick={() => handleRemoveUser(user.id)}>
									-
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SavedCandidates;
