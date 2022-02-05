import { ReactElement, useEffect, useState } from 'react';
import { QUAnswerItem } from '../../components/qu-answer-item/qu-answer-item';
import { QUButton } from '../../components/qu-button/qu-button';
import { RootState, useAppSelector } from '../../redux/store';
import QRequest from '../../services/QRequest';
import { GameAnswersWrapper, GameContainer, GameDescriptionLabel, GameQuestion, GameQuestionWrapper, GamesAnswersNextBtnWrapper } from './game.styles';

export const GameQuestionScreen = ({ gameState }: { gameState: any }): ReactElement => {
	const { room, host, username } = useAppSelector((state: RootState) => state.game);
	const [answered, setAnswered] = useState(false);
	const [answeredIndex, setAnsweredIndex] = useState(null);

	useEffect(() => {
		setAnswered(false);
	}, [gameState]);

	const next = async () => {
		if (host) {
			const { data } = await QRequest.get('/gamerun/proceed');
			console.log('data: ', data);
		}
	};

	const selectedAnswer = async (answerId, index) => {
		if (!host) {
			setAnswered(true);
			setAnsweredIndex(index);
			const { data } = await QRequest.post('/gamerun/submit', { answer: answerId });
			console.log('data: ', data);
		}
	};

	return (
		<GameContainer>
			<GameQuestionWrapper>
				<div>
					<GameDescriptionLabel>
						{host ? 'host' : username} - {room}
					</GameDescriptionLabel>
					<GameDescriptionLabel>Question Number {gameState.questionNumber + 1}</GameDescriptionLabel>
					<GameQuestion host={host}>{gameState.question[0]?.question}</GameQuestion>
					{answered ? (
						<>
							<GameDescriptionLabel>You answered</GameDescriptionLabel>
							<QUAnswerItem AnswerIndex={answeredIndex} content={gameState.question[0]?.answers[answeredIndex].answer} checked={true} />
						</>
					) : (
						<>
							<GameDescriptionLabel>Answers</GameDescriptionLabel>
							<GameAnswersWrapper>
								{gameState.question[0]?.answers.map((answer, index) => {
									return (
										<QUAnswerItem
											AnswerIndex={index}
											content={answer.answer}
											onClick={() => selectedAnswer(answer.id, index)}
											checked={selectedAnswer === answer.id}
											key={answer.id}
										/>
									);
								})}
							</GameAnswersWrapper>
						</>
					)}
				</div>
				<GamesAnswersNextBtnWrapper>{host && <QUButton onClick={next} title="Next question" />}</GamesAnswersNextBtnWrapper>
			</GameQuestionWrapper>
		</GameContainer>
	);
};
