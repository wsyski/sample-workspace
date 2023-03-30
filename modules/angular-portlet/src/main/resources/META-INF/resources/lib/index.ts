import './polyfills';

declare var Liferay: any;

export default function(rootId: string) {
	Liferay.Loader.require(
		'angular-portlet@1.0.0/lib/bootstrap',
		(bootstrap: any) => {
			bootstrap.default(rootId);
		},
	);
}
