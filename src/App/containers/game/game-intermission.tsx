import { ReactElement, useEffect, useState } from 'react';
import QRequest from '../../services/QRequest';
import { RootState, useAppSelector } from '../../redux/store';
import Countdown from 'react-countdown';
import { GameAnswersWrapper, GameContainer, GameDescriptionLabel, GameQuestion } from './game.styles';
import { QUAnswerItem } from '../../components/qu-answer-item/qu-answer-item';
import Markdown from 'markdown-to-jsx';
import { QUPlayeritem } from '../../components/qu-player-item/qu-player-item';
import { Timer } from '../../Images';

export const GameIntermissionScreen = ({ gameState, players }: { gameState: any; players: string[] }): ReactElement => {
	const { host } = useAppSelector((state: RootState) => state.game);
	const username = useAppSelector((state: RootState) => state.game.username);
	const [loading, setLoading] = useState(false);
	const [mapAnswerIdToIdx, setMapAnswerIdToIdx] = useState({});

	const next = async () => {
		if (host) {
			setLoading(true);
			await QRequest.get('/gamerun/proceed');
		}
	};

	const countdownRenderer = ({ minutes, seconds, completed }) => (
		<div className="relative flex w-[150px] h-[150px] items-center justify-center ml-auto mr-auto mt-4">
			<img className="absolute w-full h-full z-10 inset-0" src={Timer} />
			<div className="relative z-20 mt-8 text-white1 text-lg text-center flex items-center justify-center">
				{completed ? <div className="w-[50%] text-sm">Starting next question...</div> : <span>{seconds < 10 ? `0${seconds}` : seconds}</span>}
			</div>
		</div>
	);

	useEffect(() => {
		// Map answers id to indexes
		const anwsersList = gameState.question?.answers;
		const tempMapAnswerIdToIdx = {};
		for (let index = 0; index < anwsersList.length; index++) {
			const answer = anwsersList[index];
			tempMapAnswerIdToIdx[answer.id] = { ...answer, index };
		}
		setMapAnswerIdToIdx(tempMapAnswerIdToIdx);
	}, []);

	return (
		<GameContainer>
			<div className="flex flex-col gap-4">
				<div>
					<GameDescriptionLabel>Question Number {gameState.questionNumber + 1}</GameDescriptionLabel>
					<GameQuestion>{gameState.question?.question}</GameQuestion>
				</div>
				<div>
					<GameDescriptionLabel>Answers</GameDescriptionLabel>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{gameState.question?.answers.map((answer, index) => {
							return <QUAnswerItem AnswerIndex={index} content={answer.answer} correct={gameState.questionAnswer === answer.id} key={answer.id} showCorrect />;
						})}
					</div>
				</div>
				{gameState.question?.proof && (
					<div>
						<div className="text-sm">Proof</div>
						<div className="text-xl italic">
							<Markdown children={gameState.question?.proof} />
						</div>
					</div>
				)}
			</div>
			<div className="mt-4">
				{gameState.submissions?.[gameState.questionNumber]?.[username]?.correct ? (
					<div className="text-4xl text-answerGreen font-bold text-center">Your answer was Correct </div>
				) : (
					<div className="text-4xl text-answerRed font-bold text-center">Your answer was Wrong</div>
				)}
				<div>
					<div>
						<div className="text-sm">Score</div>
						<div className="flex flex-col gap-2">
							{players.map((player, index) => {
								const playerStat = gameState.submissions?.[gameState.questionNumber]?.[player];
								const answerIdx = mapAnswerIdToIdx[playerStat?.answer]?.index;
								return (
									<QUPlayeritem
										showBadges
										Place={index + 1}
										showCorrect
										correct={playerStat?.correct ?? false}
										AnswerIndex={answerIdx}
										playerName={player}
										playerPoints={gameState.scores?.[player] ?? 0}
									/>
								);
							})}
						</div>
					</div>
				</div>
				{/* <div>
				This question was answered correct {gameState.question?.total_correct / gameState.question?.total_used}% ({gameState.question?.total_correct} times)
			</div> */}
				{gameState.intermissionEnds && <Countdown renderer={countdownRenderer} date={gameState.intermissionEnds} onComplete={next} />}
			</div>
		</GameContainer>
	);
};
