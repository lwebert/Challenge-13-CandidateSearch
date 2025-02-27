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

	return (
		loading ? (
			<BounceLoader color='#FFFFFF' />
		) : (
			<div className="card">
			<img src={loadedUser?.avatar_url}></img>
			<h2>{loadedUser?.name ? loadedUser.name : loadedUser?.login}</h2>
			{/* //TODO: fix this later to always have the "Location: " and such... */}
			<h3> Location: </h3>
			{loadedUser.location ? (
				<p>{loadedUser.location}</p>
			) : (
				<p>No location found to render</p>
			)}


			{loadedUser.email ? (
				<p>
					<strong>Email: </strong>
					{loadedUser.email}
				</p>
			) : (
				<p>No email found to render</p>
			)}
			{loadedUser.company ? (
				<p>
					<strong>Company: </strong>
					{loadedUser.company}
				</p>
			) : (
				<p>No company found to render</p>
			)}
			{loadedUser.bio ? (
				<p>
					<strong>Bio: </strong>
					{loadedUser.Bio}
				</p>
			) : (
				<p>No Bio found to render</p>
			)}
		</div>
		)
	);
};

export default CandidateCard;
