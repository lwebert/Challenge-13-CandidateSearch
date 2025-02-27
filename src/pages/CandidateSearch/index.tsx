import './CanddiateSearch.css';
import { useState, useEffect } from 'react'; //Gave us this import!

// import { searchGithub, searchGithubUser } from '../api/API'; //Gave us this import!
import { searchGithub } from '../../api/API';

import {type CandidateSummary} from '../../interfaces/Candidate.interface';
import CandidateCard from '../../components/CandidateCard';
import SavedCandidates from '../SavedCandidates/index';

type Props = {
	showSavedCandidates: boolean;
};

const CandidateSearch = ({showSavedCandidates}: Props) => {
	// return <h1>CandidateSearch</h1>;

	//useState = Hook (prebuilt in react library) that returns (initializes) 2 things - a state variable (where data is stored) & a state function (to update data in the variable)
	const [users, setUsers] = useState<CandidateSummary[]>([]); //when page 1st loads, make users an empty array
	const [savedUsers, setSavedUsers] = useState<string[]>([]);
	const [currentUser, setCurrentUser] = useState<CandidateSummary | undefined>(
		undefined
	);
	// const [showSelectedUsers, setShowSelectedUsers] = useState(false);

	//useEffect
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
			.catch((err: any) => {
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
			//TODO: fix this later to have a message pop-up or something display on screen...
			console.log(
				'No candidates are available to review, starting over.'
			);
			// setCurrentUser(users[0]);
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

		const savedUsersClone = [...savedUsers]; //make a copy of this array since it is a readonly variable in the state hook

		if (currentUser) {
			savedUsersClone.push(currentUser.login);
		}

		setSavedUsers(savedUsersClone);
		setCurrentUser(users[currentIndex + 1]);
	};

	// const handleToggleSelectedUsers = () => {
	// 	setShowSaveCandidates(!showSavedCandidates);
	// };

	return (
		<div>
			{/* <button onClick={handleToggleSelectedUsers}>{showSavedCandidates ? 'Return To User Search' :'Show Saved Users'} </button> */}

			{showSavedCandidates ? (
				
				<SavedCandidates usernames={savedUsers} />
			) : (
				<div>
					<h1>Candidate Search</h1>
					{currentUser ? (
						<div>
							<CandidateCard username={currentUser.login} />
							<button onClick={handleRejectUser}>
								Reject User
							</button>

							<button onClick={handleSaveUser}>Save User</button>
						</div>
					) : null}
				</div>
			)}
		</div>
	);
}

export default CandidateSearch;