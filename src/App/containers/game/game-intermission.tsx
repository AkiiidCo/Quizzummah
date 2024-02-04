import { ReactElement, useState } from 'react';
import QRequest from '../../services/QRequest';
import { RootState, useAppSelector } from '../../redux/store';
import Countdown from 'react-countdown';
import { GameAnswersWrapper, GameDescriptionLabel, GameQuestion } from './game.styles';
import { QUAnswerItem } from '../../components/qu-answer-item/qu-answer-item';

export const GameIntermissionScreen = ({ gameState, players }: { gameState: any; players: string[] }): ReactElement => {
	console.log('gameState: ', gameState);
	const { host } = useAppSelector((state: RootState) => state.game);
	const username = useAppSelector((state: RootState) => state.game.username);
	const [loading, setLoading] = useState(false);

	const next = async () => {
		if (host) {
			setLoading(true);
			await QRequest.get('/gamerun/proceed');
		}
	};

	const countdownRenderer = ({ minutes, seconds, completed }) => <span>{completed ? <span>Starting next question</span> : <span>{seconds < 10 ? `0${seconds}` : seconds} seconds</span>}</span>;

	return (
		<div>
			Game Intermission Screen
			<GameDescriptionLabel>Question Number {gameState.questionNumber + 1}</GameDescriptionLabel>
			<GameQuestion>{gameState.question[0]?.question}</GameQuestion>
			<div>
				<GameDescriptionLabel>Answers</GameDescriptionLabel>
				<GameAnswersWrapper>
					{gameState.question[0]?.answers.map((answer, index) => {
						return (
							<QUAnswerItem
								AnswerIndex={index}
								content={answer.answer}
								checked={gameState.questionAnswer === answer.id}
								correct={gameState.submissions?.[gameState.questionNumber]?.[username]?.answer === answer.id}
								key={answer.id}
							/>
						);
					})}
				</GameAnswersWrapper>
			</div>
			<div>
				<div>Scores:</div>
				{players.map((player) => (
					<div>
						{player} - {gameState.scores?.[player] ?? 0}
					</div>
				))}
			</div>
			{gameState.intermissionEnds && <Countdown renderer={countdownRenderer} date={gameState.intermissionEnds} onComplete={next} />}
		</div>
	);
};
