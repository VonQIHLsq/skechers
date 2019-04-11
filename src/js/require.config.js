require.config({
	baseUrl: "/",
	paths : {
		"jquery" : "libs/jquery/jquery-3.2.1",
		"header" : "js/module/header",
		"footer" : "js/module/footer",
		"backtop" : "js/module/backtop",
		"template" : "libs/art-template/template-web",
		"Swiper" : "libs/swiper/js/swiper",
		"zoom" : "libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",
		"fly" : "libs/jquery-plugins/jquery.fly.min"
	},
	shim : {
		"zoom" : {
			deps: ["jquery"]
		},
		"fly" : {
			deps : ["jquery"]
		}
	}
})