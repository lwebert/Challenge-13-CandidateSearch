import { useState } from 'react';
import Nav from './components/Nav';
import CandidateSearch from './pages/CandidateSearch/index';

function App() {
	const [showSavedCandidates, setShowSavedCandidates] = useState(false);

	return (
		<>
			<Nav
				showSavedCandidates={showSavedCandidates}
				setShowSaveCandidates={setShowSavedCandidates}
			/>
			<main>
				<CandidateSearch
					showSavedCandidates={showSavedCandidates}
				/>
			</main>
		</>
	);
}

export default App;
