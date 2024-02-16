import { ReactElement, useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { Timer } from '../../Images';
import { QUAnswerItem } from '../../components/qu-answer-item/qu-answer-item';
import { QUButton } from '../../components/qu-button/qu-button';
import { RootState, useAppSelector } from '../../redux/store';
import QRequest from '../../services/QRequest';
import { GameContainer, GameQuestion, GamesAnswersNextBtnWrapper } from './game.styles';

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
		if (!onlyDisplay && !answeredId) {
			// Play audio
			const audio = new Audio('/assets/audio/mouse-click.mp3');
			audio.volume = 0.1;
			audio.play();
			setAnsweredId(answerId);
			await QRequest.post('/gamerun/submit', { answer: answerId });
		}
	};

	const countdownRenderer = ({ minutes, seconds, completed }) => (
		<div className="relative flex w-[150px] h-[150px] items-center justify-center ml-auto mr-auto mt-4">
			<img className="absolute w-full h-full z-10 inset-0" src={Timer} />
			<div className="relative z-20 mt-8 text-white1 text-lg">{completed ? <span>Time's up!</span> : <span>{seconds < 10 ? `0${seconds}` : seconds}</span>}</div>
		</div>
	);
	return (
		<GameContainer>
			<div className="flex flex-col gap-4">
				<div>
					<div className="text-sm">
						username: <span className="font-bold">{username}</span> - Room code: <span className="font-bold">{room}</span>
					</div>
					<div className="text-xl font-thin mt-2">Question Number {gameState.questionNumber + 1}</div>
					<GameQuestion host={host && onlyDisplay}>{gameState.question?.question}</GameQuestion>
					<div className="text-xl font-thin mt-2">Answers</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
					</div>
				</div>
			</div>
			{gameState.timeEnds && <Countdown renderer={countdownRenderer} date={gameState.timeEnds} onComplete={next} />}
			<GamesAnswersNextBtnWrapper>
				{host && onlyDisplay && <QUButton disabled={loading} onClick={next} title={gameState.questionNumber < gameState.maxQuestions ? 'Next question' : 'Finish'} />}
			</GamesAnswersNextBtnWrapper>
		</GameContainer>
	);
};
