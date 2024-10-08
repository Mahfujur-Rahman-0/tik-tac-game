import { useState } from "react";

function Squire({ value, SquireClick }) {
	return (
		<button
			className="mr-1 bg-white border-2 border-gray-400 h-12 w-12"
			onClick={SquireClick}
		>
			{value}
		</button>
	);
}

function Gamebord({ onPlay, squier, XisNext }) {
	const winner = winnerCalculator(squier);
	let status;

	if (winner) {
		status = `Winner ${winner}`;
	} else {
		status = `Next player ${XisNext ? "X" : "O"}`;
	}
	function handelclick(i) {
		if (squier[i] || winnerCalculator(squier)) {
			return;
		}
		const nextSquare = squier.slice();
		if (XisNext) {
			nextSquare[i] = "X";
		} else {
			nextSquare[i] = "O";
		}

		onPlay(nextSquare);
	}
	return (
		<>
			<div>
				<div className="mb-10">{status}</div>

				<div className="firstGameContainer h-12 flex ">
					<Squire value={squier[0]} SquireClick={() => handelclick(0)} />
					<Squire value={squier[1]} SquireClick={() => handelclick(1)} />
					<Squire value={squier[2]} SquireClick={() => handelclick(2)} />
				</div>
				<div className="mt-1 secondGameContainer h-12 flex">
					<Squire value={squier[3]} SquireClick={() => handelclick(3)} />
					<Squire value={squier[4]} SquireClick={() => handelclick(4)} />
					<Squire value={squier[5]} SquireClick={() => handelclick(5)} />
				</div>
				<div className="mt-1 thirdGameContainer h-12 flex">
					<Squire value={squier[6]} SquireClick={() => handelclick(6)} />
					<Squire value={squier[7]} SquireClick={() => handelclick(7)} />
					<Squire value={squier[8]} SquireClick={() => handelclick(8)} />
				</div>
			</div>
		</>
	);
}
export default function Game() {
	//const [squier, setSquire] = useState(Array(9).fill(null));
	const [history, sethistory] = useState([Array(9).fill(null)]);
	const [XisNext, setXisNext] = useState(true);

	const [currentMove, setCurrentMove] = useState(0);
	const currentSquare = history[currentMove];
	function handlePlay(nextSquare) {
		setXisNext(!XisNext);
		const nextHistry = [...history.slice(0, currentMove + 1), nextSquare];
		sethistory(nextHistry);
		setCurrentMove(nextHistry.length - 1);
	}
	function jumpTo(move) {
		setCurrentMove(move);
		setXisNext(move % 2 === 0);
	}
	const moves = history.map((squier, move) => {
		let description;
		if (move > 0) {
			description = `go to the move number ${move}`;
		} else {
			description = `make your first move`;
		}
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	});
	return (
		<>
			<div className="sm:flex justify-center">
				<div className="flex justify-center">
					<Gamebord
						XisNext={XisNext}
						squier={currentSquare}
						onPlay={handlePlay}
					/>
				</div>
				<div className="sm:mt-0 mt-5">
					<ol className="text-center">{moves}</ol>
				</div>
			</div>
		</>
	);
}

function winnerCalculator(squier) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squier[a] && squier[a] === squier[b] && squier[a] === squier[c]) {
			return squier[a];
		}
	}
	return null;
}
