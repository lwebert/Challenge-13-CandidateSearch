import './CandidateCard.css';
import BounceLoader from 'react-spinners/BounceLoader';
import { type CandidateDetails } from '../../interfaces/Candidate.interface';

import { useState, useEffect } from 'react';
import { searchGithubUser } from '../../api/API';

type CandidateProps = {
	username: string;
};

const CandidateCard = ({ username }: CandidateProps) => {
	//Code to search for the user based on the username
	const [loading, setLoading] = useState(false);
	const [loadedUser, setLoadedUser] = useState<CandidateDetails>();

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
			.catch((err) => {
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
			<div className="imgContainer">
				{loadedUser.avatar_url ? (
					<img
						src={loadedUser?.avatar_url}
						className="candidateImg"></img>
				) : (
					<img
						className="candidateImg"></img>
				)}
			</div>

			<div className="cardContent">
				<h2>
					Name:{' '}
					{loadedUser?.name ? loadedUser.name : 'No name to render'}
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
					{loadedUser.bio
						? loadedUser.bio
						: 'No bio found to render.'}
				</p>
			</div>
		</div>
	);
};

export default CandidateCard;
