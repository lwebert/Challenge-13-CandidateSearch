import BounceLoader from 'react-spinners/BounceLoader';
// import type Candidate from '../interfaces/Candidate.interface';

// import { ImCross } from 'react-icons/im';
// import { CgPlayListAdd } from 'react-icons/cg';

import { useState, useEffect } from 'react'; //Gave us this import!
import { searchGithubUser } from '../api/API'; //Gave us this import!

type CandidateProps = {
	username: string;
};

const CandidateCard = ({ username }: CandidateProps) => {
	//Code to search for the user based on the username

	const [loading, setLoading] = useState(false);
	const [loadedUser, setLoadedUser] = useState<any>(undefined);

	useEffect(() => {
		setLoading(true);
		const initialize = async () => {
			const data = await searchGithubUser(username);
			return data;
		};

		initialize() //data
			.then((result) => {
				setLoadedUser(result);
				setLoading(false);
			})
			.catch((err: any) => {
				console.log('Error fetching users: ', err);
			});
	}, [username]);

	if (!loadedUser) {
		return null;
	}

	console.log('loaded user: ', loadedUser);

	return loading ? (
		<BounceLoader color="#FFFFFF" />
	) : (
		<div>
			<img
				src={loadedUser?.avatar_url}
				style={{
					borderTopLeftRadius: 25,
					borderTopRightRadius: 25,
					aspectRatio: 1,
					maxHeight: 500,
				}}></img>

			<h2>
				Name: {loadedUser?.name ? loadedUser.name : 'No name to render'}
			</h2>
			<p>
				<strong>Username: </strong>
				{loadedUser.login
					? loadedUser.login
					: 'No username found to render.'}
			</p>

			<p>
				<strong>Location: </strong>
				{loadedUser.location
					? loadedUser.location
					: 'No location found to render.'}
			</p>

			{/* <h3>Location: </h3>
			{loadedUser.location ? (
				<p>{loadedUser.location}</p>
			) : (
				<p>No location found to render</p>
			)} */}

			<p>
				<strong>Email: </strong>
				{loadedUser.email
					? loadedUser.email
					: 'No email found to render.'}
			</p>

			<p>
				<strong>URL: </strong>
				{loadedUser.html_url
					? loadedUser.html_url
					: 'No URL found to render.'}
			</p>

			<p>
				<strong>Company: </strong>
				{loadedUser.company
					? loadedUser.company
					: 'No company found to render.'}
			</p>

			<p>
				<strong>Bio: </strong>
				{loadedUser.bio ? loadedUser.bio : 'No bio found to render.'}
			</p>
		</div>
	);
};

export default CandidateCard;
