module.exports = {
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production' ? '/2019/' : '/'
    // pluginOptions: {
	// 	prerenderSpa: {
	// 		registry: undefined,
	// 		renderRoutes: [
    //             '/',
    //             '/1/',
    //             '/2/',
    //             '/3/',
    //             '/4/',
    //             '/5/',
    //             '/6/',
    //             '/7/',
	// 		],
	// 		useRenderEvent: true,
	// 		headless: true,
	// 		onlyProduction: true,
	// 		customRendererConfig: {
	// 			defaultViewport: {
	// 				width: 1,
	// 				height: 1,
	// 			},
	// 		}
	// 	}
	// }
}
