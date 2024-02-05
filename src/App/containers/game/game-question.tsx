import { ReactElement, useEffect, useState } from 'react';
import { QUAnswerItem } from '../../components/qu-answer-item/qu-answer-item';
import { QUButton } from '../../components/qu-button/qu-button';
import { RootState, useAppSelector } from '../../redux/store';
import QRequest from '../../services/QRequest';
import { GameAnswersWrapper, GameContainer, GameDescriptionLabel, GameQuestion, GameQuestionWrapper, GamesAnswersNextBtnWrapper } from './game.styles';
import Countdown from 'react-countdown';

export const GameQuestionScreen = ({ gameState }: { gameState: any }): ReactElement => {
	const { room, host, onlyDisplay, username } = useAppSelector((state: RootState) => state.game);
	const [loading, setLoading] = useState(false);
	const [answeredId, setAnsweredId] = useState(null);

	useEffect(() => {
		setAnsweredId(null);
	}, [gameState, host]);

	const next = async () => {
		if (host) {
			setLoading(true);
			await QRequest.get('/gamerun/proceed');
		}
	};

	const selectedAnswer = async (answerId) => {
		if (!onlyDisplay) {
			setAnsweredId(answerId);
			await QRequest.post('/gamerun/submit', { answer: answerId });
		}
	};

	const countdownRenderer = ({ minutes, seconds, completed }) => <span>{completed ? <span>Time's up!</span> : <span>{seconds < 10 ? `0${seconds}` : seconds} seconds</span>}</span>;

	return (
		<GameContainer>
			<GameQuestionWrapper>
				<div>
					<GameDescriptionLabel>
						{username} - {room}
					</GameDescriptionLabel>
					<GameDescriptionLabel>Question Number {gameState.questionNumber + 1}</GameDescriptionLabel>
					<GameQuestion host={host && onlyDisplay}>{gameState.question?.question}</GameQuestion>
					<GameDescriptionLabel>Answers</GameDescriptionLabel>
					<GameAnswersWrapper>
						{gameState.question?.answers.map((answer, index) => {
							return <QUAnswerItem AnswerIndex={index} content={answer.answer} onClick={() => selectedAnswer(answer.id)} checked={answeredId === answer.id} key={answer.id} />;
						})}
					</GameAnswersWrapper>
				</div>
				{gameState.timeEnds && <Countdown renderer={countdownRenderer} date={gameState.timeEnds} onComplete={next} />}
				<GamesAnswersNextBtnWrapper>
					{host && onlyDisplay && <QUButton disabled={loading} onClick={next} title={gameState.questionNumber < gameState.maxQuestions ? 'Next question' : 'Finish'} />}
				</GamesAnswersNextBtnWrapper>
			</GameQuestionWrapper>
		</GameContainer>
	);
};
