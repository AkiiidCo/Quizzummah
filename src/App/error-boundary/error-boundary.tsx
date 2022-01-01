import React from 'react';
import { EBBackground, EBTitle, EBDescription, EBAnchour, EBIllustrations, EBProblem, EBReloadBtn } from './error-boundary.styles';

import { withTranslation } from 'react-i18next';

class ErrorBoundary extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	async componentDidCatch(error, info) {
		console.log('error, info: ', error, info);
		this.setState({ hasError: true });
	}

	render() {
		const { t } = this.props;
		if (this.state.hasError) {
			return (
				<>
					<EBBackground>
						<EBIllustrations />
						<EBTitle>{t('something-went-wrong.title')}</EBTitle>
						<EBDescription>{t('something-went-wrong.description')}</EBDescription>
						<EBReloadBtn>{t('something-went-wrong.reload-app')}</EBReloadBtn>

						<EBProblem>
							{t('something-went-wrong.support-message')}
							<EBAnchour href="https://discord.com/invite/R8rCaKb">{t('quzzummah.discord')}</EBAnchour>
						</EBProblem>
					</EBBackground>
				</>
			);
		}
		return this.props.children;
	}
}

export default withTranslation()(ErrorBoundary);
