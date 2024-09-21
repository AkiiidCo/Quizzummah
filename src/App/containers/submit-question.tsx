import { ReactElement, useState } from 'react';
import { HomeContainer } from './home/home.styles';
import { QUButton } from '../components/qu-button/qu-button';
import { toast } from 'react-toastify';

export const SubmitQuestion = (): ReactElement => {
	const [questionObj, setQuestionObj] = useState({
		question: '',
		difficulty: 'beginner',
		category: 'quran',
		type: 'simple',
		proof: '',
	});
	const [answer1, setAnswer1] = useState('');
	const [answer2, setAnswer2] = useState('');
	const [answer3, setAnswer3] = useState('');
	const [answer4, setAnswer4] = useState('');
	const [trueAnswerIdx, setTrueAnswerIdx] = useState(0);
	const [submitted, setSubmitted] = useState(false);

	const handleSubmitQuestion = async () => {
		const answers = [{ answer: answer1 }, { answer: answer2 }, { answer: answer3 }, { answer: answer4 }];
		answers[trueAnswerIdx].correct = true;
		const fullQuestionObj = {
			...questionObj,
			answers,
		};
		try {
			// await QRequest.post('/community/question?password=quizzummah4life', fullQuestionObj);
		} catch (err) {
			console.error('Could not submit error: ', err);
			toast.error('Could not submit answer, please try again');
		}
	};
	return (
		<HomeContainer className="p-4">
			<h1 className="text-5xl text-center mt-4 mb-8 font-bold">Submit a question</h1>
			<div className="flex flex-col gap-1">
				<label className="text-darkBlue/50">Enter question</label>
				<input autoFocus placeholder="Enter Question" value={questionObj.question} onChange={(e) => setQuestionObj({ ...questionObj, question: e.target.value })} />
			</div>
			<div className="flex flex-col gap-1">
				<label className="text-darkBlue/50">Category</label>
				<select value={questionObj.category} onChange={(e) => setQuestionObj({ ...questionObj, category: e.target.value })} className="capitalize">
					<option value="quran">quran</option>
					<option value="sunnah">sunnah</option>
				</select>
			</div>
			<div className="flex flex-col gap-1">
				<label className="text-darkBlue/50">Difficulty</label>
				<div className="flex items-center gap-2 flex-wrap">
					<input
						className="hidden"
						type="radio"
						name="difficulty"
						id="beginner"
						checked={questionObj.difficulty === 'beginner'}
						onChange={() => setQuestionObj({ ...questionObj, difficulty: 'beginner' })}
					/>
					<label
						className={`flex items-center justify-center p-4 min-w-[150px] ${questionObj.difficulty === 'beginner' ? 'bg-darkBlue border-[transparent] text-white' : 'border-darkBlue text-darkBlue'} border border-solid cursor-pointer hover:opacity-70 duration-300 rounded-2xl`}
						htmlFor="beginner"
					>
						Beginner
					</label>
					<input
						className="hidden"
						type="radio"
						name="difficulty"
						id="medium"
						checked={questionObj.difficulty === 'medium'}
						onChange={() => setQuestionObj({ ...questionObj, difficulty: 'medium' })}
					/>
					<label
						className={`flex items-center justify-center p-4 min-w-[150px] ${questionObj.difficulty === 'medium' ? 'bg-darkBlue border-[transparent] text-white' : 'border-darkBlue text-darkBlue'} border border-solid cursor-pointer hover:opacity-70 duration-300 rounded-2xl`}
						htmlFor="medium"
					>
						Medium
					</label>
					<input
						className="hidden"
						type="radio"
						name="difficulty"
						id="hard"
						checked={questionObj.difficulty === 'hard'}
						onChange={() => setQuestionObj({ ...questionObj, difficulty: 'hard' })}
					/>
					<label
						className={`flex items-center justify-center p-4 min-w-[150px] ${questionObj.difficulty === 'hard' ? 'bg-darkBlue border-[transparent] text-white' : 'border-darkBlue text-darkBlue'} border border-solid cursor-pointer hover:opacity-70 duration-300 rounded-2xl`}
						htmlFor="hard"
					>
						Hard
					</label>
				</div>
			</div>
			<div className="flex flex-col gap-2 mb-10">
				<h2 className="text-xl font-bold">Multiple Answers</h2>
				<div className="flex flex-col gap-1">
					<label className="text-darkBlue/50">1 First Answer</label>
					<div className="flex items-center gap-2 flex-wrap">
						<input className="flex-1" placeholder="Enter the answer number 1" value={answer1} onChange={(e) => setAnswer1(e.target.value)} />
						<input
							className="hidden"
							type="radio"
							name="Answer"
							id="Answer1"
							checked={trueAnswerIdx === 0}
							onChange={(e) => {
								if (e.target.checked) {
									setTrueAnswerIdx(0);
								}
							}}
						/>
						{trueAnswerIdx === 0 ? (
							<label
								htmlFor="Answer1"
								className="min-w-[150px] text-center bg-variationGreen p-4 border-[transparent] border-solid border rounded-2xl hover:opacity-70 duration-300 cursor-pointer"
							>
								True answer
							</label>
						) : (
							<label htmlFor="Answer1" className="min-w-[150px] text-center border-variationGreen border-solid border p-4 rounded-2xl hover:opacity-70 duration-300 cursor-pointer">
								Set as true answer
							</label>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-darkBlue/50">2 Second Answer</label>
					<div className="flex items-center gap-2 flex-wrap">
						<input className="flex-1" placeholder="Enter the answer number 2" value={answer2} onChange={(e) => setAnswer2(e.target.value)} />
						<input
							className="hidden"
							type="radio"
							name="Answer"
							id="Answer2"
							checked={trueAnswerIdx === 1}
							onChange={(e) => {
								if (e.target.checked) {
									setTrueAnswerIdx(1);
								}
							}}
						/>
						{trueAnswerIdx === 1 ? (
							<label
								htmlFor="Answer2"
								className="min-w-[150px] text-center bg-variationGreen p-4 border-[transparent] border-solid border rounded-2xl hover:opacity-70 duration-300 cursor-pointer"
							>
								True answer
							</label>
						) : (
							<label htmlFor="Answer2" className="min-w-[150px] text-center border-variationGreen border-solid border p-4 rounded-2xl hover:opacity-70 duration-300 cursor-pointer">
								Set as true answer
							</label>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-darkBlue/50">3 Third Answer</label>
					<div className="flex items-center gap-2 flex-wrap">
						<input className="flex-1" placeholder="Enter the answer number 3" value={answer3} onChange={(e) => setAnswer3(e.target.value)} />
						<input
							className="hidden"
							type="radio"
							name="Answer"
							id="Answer3"
							checked={trueAnswerIdx === 2}
							onChange={(e) => {
								if (e.target.checked) {
									setTrueAnswerIdx(2);
								}
							}}
						/>
						{trueAnswerIdx === 2 ? (
							<label
								htmlFor="Answer3"
								className="min-w-[150px] text-center bg-variationGreen p-4 border-[transparent] border-solid border rounded-2xl hover:opacity-70 duration-300 cursor-pointer"
							>
								True answer
							</label>
						) : (
							<label htmlFor="Answer3" className="min-w-[150px] text-center border-variationGreen border-solid border p-4 rounded-2xl hover:opacity-70 duration-300 cursor-pointer">
								Set as true answer
							</label>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-darkBlue/50">4 Fourth Answer</label>
					<div className="flex items-center gap-2 flex-wrap">
						<input className="flex-1" placeholder="Enter the answer number 4" value={answer4} onChange={(e) => setAnswer4(e.target.value)} />
						<input
							className="hidden"
							type="radio"
							name="Answer"
							id="Answer4"
							checked={trueAnswerIdx === 3}
							onChange={(e) => {
								if (e.target.checked) {
									setTrueAnswerIdx(3);
								}
							}}
						/>
						{trueAnswerIdx === 3 ? (
							<label
								htmlFor="Answer4"
								className="min-w-[150px] text-center bg-variationGreen p-4 border-[transparent] border-solid border rounded-2xl hover:opacity-70 duration-300 cursor-pointer"
							>
								True answer
							</label>
						) : (
							<label htmlFor="Answer4" className="min-w-[150px] text-center border-variationGreen border-solid border p-4 rounded-2xl hover:opacity-70 duration-300 cursor-pointer">
								Set as true answer
							</label>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<h2 className="text-xl font-bold">Proof about the correct answer</h2>
					<label className="text-darkBlue/50">Proof</label>
					<input placeholder="Enter Proof" value={questionObj.proof} onChange={(e) => setQuestionObj({ ...questionObj, proof: e.target.value })} />
				</div>
				<QUButton
					disabled={!questionObj.question || !questionObj.category || !questionObj.difficulty || !answer1 || !answer2 || !answer3 || !answer4}
					title="Submit question"
					onClick={handleSubmitQuestion}
				/>
			</div>
		</HomeContainer>
	);
};
