import { ReactElement, useEffect, useState } from 'react';
import { QUAnswerItem } from '../../components/qu-answer-item/qu-answer-item';
import { QUButton } from '../../components/qu-button/qu-button';
import { RootState, useAppSelector } from '../../redux/store';
import QRequest, { proceedGame } from '../../services/QRequest';
import { GameAnswersWrapper, GameContainer, GameDescriptionLabel, GameQuestion, GameQuestionWrapper, GamesAnswersNextBtnWrapper } from './game.styles';
import Countdown from 'react-countdown';
import { toast } from 'react-toastify';

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
			try {
				await proceedGame();
			} catch (err) {}
		}
	};

	const selectedAnswer = async (answerId) => {
		if (!onlyDisplay && !answeredId) {
			// Play audio
			const audio = new Audio('/assets/audio/mouse-click.mp3');
			audio.volume = 0.1;
			audio.play();
			setAnsweredId(answerId);
			try {
				await QRequest.post('/gamerun/submit', { answer: answerId });
			} catch (err) {
				setAnsweredId(null);
				console.error('Could not submit error: ', err);
				toast.error('Could not submit answer, please try again');
			}
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
							return (
								<QUAnswerItem
									AnswerIndex={index}
									content={answer.answer}
									onClick={() => selectedAnswer(answer.id)}
									checked={answeredId === answer.id}
									key={answer.id}
									disabled={!!answeredId}
								/>
							);
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
