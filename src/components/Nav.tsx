// import { Link, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

type NavProp = {
	showSavedCandidates: boolean;
	setShowSaveCandidates: (value: boolean) => void;
};

const Nav = ({showSavedCandidates, setShowSaveCandidates}: NavProp) => {
	// TODO: Add necessary code to display the navigation bar and link between the pages
	// const currentPage = useLocation().pathname;

	// return <div>Nav</div>;
	return (
		<nav>
			<h1>
				<Link to="/">Title?</Link>
			</h1>
			<ul className="nav nav-tabs">
				<li className="nav-item">
					<h2>
						{/* <Link
							to="/"
							className={
								currentPage === '/'
									? 'nav-link active'
									: 'nav-link'
							}>
							HOME
						</Link> */}
						<button
						onClick={() => setShowSaveCandidates(false)}
						style={
							showSavedCandidates ? styles['button']: styles['button-active'] 
						}>
							HOME
						</button>
					</h2>
				</li>
				<li className="nav-item">
					<h2>
						<button
							style={
								showSavedCandidates ? styles['button-active'] : styles['button']
							}
							onClick={() => setShowSaveCandidates(true)}
						>
							Potential Candidates
						</button>
					</h2>
				</li>
			</ul>
		</nav>
	);
};

const styles: {[key: string]: any} = {
	button: {
		background: 'inherit',
		color: 'inherit',
		border: 'none',
		padding: 0,
		font: 'inherit',
		outline: 'inherit'
	},
	'button-active': {
		background: 'white',
		color: 'inherit',
		border: 'none',
		padding: 0,
		font: 'inherit',
		outline: 'inherit'
	}
}

export default Nav;
