// main module
'use strict';

module.exports = function april1_main (main_params) {
	var T = {};
	var params = {
		buffer_params   : {
			encoding       : main_params.encoding,
			initialSize    : main_params.min_buffer_size,
			incrementAmount: main_params.buffer_increment
		},
		extend          : T,
		list_module     : T,
		templates_module: T,
		xml_module      : T
	};
	require ('../js/linked_list') (params);
	require ('../js/parameters') (params);
	require ('../js/templates') (params);
	require ('../js/xml_templates') (params);
	require ('../js/html_templates') (params);

	return T;
};

