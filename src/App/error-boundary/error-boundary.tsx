import React from 'react';
import { EBBackground, EBTitle, EBDescription, EBAnchour, EBIllustrations, EBProblem, EBReloadBtn } from './error-boundary.styles';

import { withTranslation } from 'react-i18next';

class ErrorBoundary extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	async componentDidCatch(error, info) {
		console.error('error, info: ', error, info);
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return (
				<>
					<EBBackground>
						<EBIllustrations />
						<EBTitle>Something went wrong</EBTitle>
					</EBBackground>
				</>
			);
		}
		return this.props.children;
	}
}

export default withTranslation()(ErrorBoundary);
