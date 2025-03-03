import Nav from './components/Nav';
import { Outlet } from 'react-router-dom';

// import { useState } from 'react';
// import CandidateSearch from './pages/CandidateSearch/index';

function App() {
	// const [showSavedCandidates, setShowSavedCandidates] = useState(false);

	return (
		<>
			<Nav
			// showSavedCandidates={showSavedCandidates}
			// setShowSaveCandidates={setShowSavedCandidates}
			/>
			<main>
				<Outlet />
				{/* <CandidateSearch
					// showSavedCandidates={showSavedCandidates}
				/> */}
			</main>
		</>
	);
}

export default App;
