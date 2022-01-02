import { ReactElement, useEffect, useState } from 'react';
import { RootState, useAppSelector } from '../../redux/store';
import QRequest from '../../services/QRequest';

export const GameQuestionScreen = ({ gameState }: { gameState: any }): ReactElement => {
	const { room, host, username } = useAppSelector((state: RootState) => state.game);
	const [answered, setAnswered] = useState(false);

	useEffect(() => {
		setAnswered(false);
	}, [gameState]);

	const next = async () => {
		if (host) {
			const { data } = await QRequest.get('/gamerun/proceed');
			console.log('data: ', data);
		}
	};

	const selectedAnswer = async (answerId) => {
		if (!host) {
			setAnswered(true);
			const { data } = await QRequest.post('/gamerun/submit', { answer: answerId });
			console.log('data: ', data);
		}
	};

	return (
		<div>
			<h5>Game Question Screen</h5>
			<div>Question Number {gameState.questionNumber + 1}</div>
			<div>{gameState.question[0]?.question}</div>
			{answered ? (
				<div>Already answered</div>
			) : (
				<div>
					Answers
					<div>
						{gameState.question[0]?.answers.map((answer) => (
							<div key={answer.id} onClick={() => selectedAnswer(answer.id)}>
								{answer.answer}
							</div>
						))}
					</div>
				</div>
			)}

			{host && (
				<div>
					<button onClick={next}>Next question</button>
				</div>
			)}
			<div>
				{host ? 'host' : username} {room}
			</div>
		</div>
	);
};
