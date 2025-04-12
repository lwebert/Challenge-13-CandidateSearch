import { Plus, Minus } from 'lucide-react';
import './CanddiateSearch.css';
import { useState, useEffect } from 'react';

import { searchGithub } from '../../api/API';

import { type CandidateSummary } from '../../interfaces/Candidate.interface';
import CandidateCard from '../../components/CandidateCard/CandidateCard';

const CandidateSearch = () => {
	const [users, setUsers] = useState<CandidateSummary[]>([]); //when page 1st loads, make users an empty array
	const [currentUser, setCurrentUser] = useState<
		CandidateSummary | undefined
	>(undefined);

	useEffect(() => {
		const initialize = async () => {
			const data = await searchGithub();
			return data;
		};

		initialize() //data
			.then((result) => {
				setUsers(result); //use the state function to update the state variable; set users to list of users from github API fetch
				if (result.length > 0) {
					setCurrentUser(result[0]); //grab the first user from the array of all users
				}
			})
			.catch((err) => {
				console.log('Error fetching users: ', err);
			});
	}, []); //leave dependency array empty - only triggers when page loads the 1st time () since the empty array isn't going to change

	//functions
	const findUserIndex = () => {
		const currentIndex = users.findIndex((u) => u.id === currentUser?.id);

		if (currentIndex === undefined) {
			console.log('Unable to find index with current user', currentUser);
			return undefined;
		}
		if (currentIndex > users.length) {
			console.log(
				'No candidates are available to review, starting over.'
			);
			return 0;
		}

		return currentIndex;
	};

	const handleRejectUser = () => {
		const currentIndex = findUserIndex();
		if (currentIndex === undefined) {
			return;
		}

		setCurrentUser(users[currentIndex + 1]);
	};

	const handleSaveUser = () => {
		const currentIndex = findUserIndex();
		if (currentIndex === undefined) {
			return;
		}

		let parsedSavedUsers = [];
		const storedCandidates = localStorage.getItem('savedCandidates');

		if (typeof storedCandidates === 'string') {
			parsedSavedUsers = JSON.parse(storedCandidates);
		}
		parsedSavedUsers.push(currentUser);
		localStorage.setItem(
			'savedCandidates',
			JSON.stringify(parsedSavedUsers)
		);

		setCurrentUser(users[currentIndex + 1]);
	};

	return (
		<div>
			<div>
				<h1>Candidate Search</h1>
				{currentUser ? (
					<div className="container">
						<div className="card">
							<CandidateCard username={currentUser.login} />
						</div>
						<div className="button-row">
							<button
								onClick={handleRejectUser}
								className="minus-button">
								<Minus className="button" />
							</button>

							<button
								onClick={handleSaveUser}
								className="plus-button">
								<Plus className="button" />
							</button>
						</div>
					</div>
				) : (
					<h2>
						No candidates are available to review, starting over.
					</h2>
				)}
			</div>
		</div>
	);
};

export default CandidateSearch;
