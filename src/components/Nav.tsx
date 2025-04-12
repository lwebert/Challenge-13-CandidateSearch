import { Link, useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// type NavProp = {
// 	showSavedCandidates: boolean;
// 	setShowSaveCandidates: (value: boolean) => void;
// };

// const Nav = ({ showSavedCandidates, setShowSaveCandidates }: NavProp) => {
const Nav = () => {
	const currentPage = useLocation().pathname;

	return (
		<nav>
			<ul className="nav nav-tabs">
				<li className="nav-item">
					<h2>
						<Link
							to="/"
							className={
								currentPage === '/'
									? 'nav-link active'
									: 'nav-link'
							}>
							Home
						</Link>
					</h2>
				</li>

				<li className="nav-item">
					<h2>
						<Link
							to="/SavedCandidates"
							className={
								currentPage === '/SavedCandidates'
									? 'nav-link active'
									: 'nav-link'
							}>
							Saved Candidates
						</Link>
					</h2>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
