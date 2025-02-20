// import type React from 'react';
// import type CandidateSummary from '../interfaces/Candidate.interface';
// import CandidateCard from './CandidateCard';

// interface PotentialCandidatesProps {
// 	potentialCandidates: Candidate[];
// 	removeFromStorage:
// 		| ((
// 				e: React.MouseEvent<SVGSVGElement, MouseEvent>,
// 				currentlyOnCandidateList: boolean | null | undefined,
// 				name: string | null
// 		) => void)
// 		| null;
// }

// const PotentialCandidatesList = ({
// 	potentialCandidates,
// 	removeFromStorage,
// }: PotentialCandidatesProps) => {
// 	console.log(potentialCandidates);

// 	return (
// 		<div>
// 			<ul>
// 				{potentialCandidates.map((candidate) => (
// 					<CandidateCard
// 						currentCandidate={candidate}
// 						key={candidate.Username}
// 						onPotentialCandidateList={true}
// 						removeFromStorage={removeFromStorage}
// 					/>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// export default PotentialCandidatesList;