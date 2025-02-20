import { useEffect, useState } from 'react';
import { searchGithubUser } from '../api/API'; //Gave us this import!
import BounceLoader from 'react-spinners/BounceLoader';
// import { type CandidateDetails } from '../interfaces/Candidate.interface';

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
				users.push(user);
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

	return (
		<>
			<h1>Potential Candidates</h1>

			{loading ? (
				<BounceLoader color="#FFFFFF" />
			) : (
				users.map((user, index) => <div key={index}>{user.login}</div>)
			)}
		</>
	);
};

export default SavedCandidates;
