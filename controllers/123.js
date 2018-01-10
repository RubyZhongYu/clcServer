{
	"_args": [
	[
		{
			"raw": "oracledb",
			"scope": null,
			"escapedName": "oracledb",
			"name": "oracledb",
			"rawSpec": "",
			"spec": "latest",
			"type": "tag"
		},
		"D:\\clccloud"
	]
],
	"_from": "oracledb@latest",
	"_id": "oracledb@1.13.1",
	"_inCache": true,
	"_location": "/oracledb",
	"_nodeVersion": "7.8.0",
	"_npmOperationalInternal": {
	"host": "packages-18-east.internal.npmjs.com",
		"tmp": "tmp/oracledb-1.13.1.tgz_1491961015124_0.5156279720831662"
},
	"_npmUser": {
	"name": "cjbj",
		"email": "christopher.jones@oracle.com"
},
	"_npmVersion": "4.2.0",
	"_phantomChildren": {},
	"_requested": {
	"raw": "oracledb",
		"scope": null,
		"escapedName": "oracledb",
		"name": "oracledb",
		"rawSpec": "",
		"spec": "latest",
		"type": "tag"
},
	"_requiredBy": [
	"#USER"
],
	"_resolved": "https://registry.npmjs.org/oracledb/-/oracledb-1.13.1.tgz",
	"_shasum": "923164b5c192ceda01590e35268bb7017e24ad89",
	"_shrinkwrap": null,
	"_spec": "oracledb",
	"_where": "D:\\clccloud",
	"bugs": {
	"url": "https://github.com/oracle/node-oracledb/issues"
},
	"dependencies": {
	"nan": "~2.5.0"
},
	"description": "Oracle Database driver by Oracle Corp.",
	"devDependencies": {
	"async": "^1.5.0",
		"mocha": "^2.4.5",
		"should": "^8.3.1"
},
	"directories": {},
	"dist": {
	"shasum": "923164b5c192ceda01590e35268bb7017e24ad89",
		"tarball": "https://registry.npmjs.org/oracledb/-/oracledb-1.13.1.tgz"
},
	"engines": {
	"node": ">=0.10.28"
},
	"gypfile": true,
	"homepage": "http://www.oracle.com/technetwork/database/database-technologies/scripting-languages/node_js/",
	"keywords": [
	"Oracle",
	"Database",
	"official",
	"DB",
	"SQL",
	"JSON",
	"PL/SQL",
	"OCI",
	"API",
	"client",
	"library",
	"driver",
	"add-on",
	"extension",
	"binding",
	"interface",
	"adapter",
	"module"
],
	"license": "Apache-2.0",
	"main": "./index.js",
	"maintainers": [
	{
		"name": "cjbj",
		"email": "christopher.jones@oracle.com"
	},
	{
		"name": "krismohan",
		"email": "krishna.mohan@oracle.com"
	}
],
	"name": "oracledb",
	"optionalDependencies": {},
	"readme": "ERROR: No README data found!",
	"repository": {
	"type": "git",
		"url": "git://github.com/oracle/node-oracledb.git"
},
	"scripts": {
	"install": "node-gyp rebuild",
		"posttest": "node test/opts/versions.js",
		"test": "mocha --opts test/opts/mocha.opts",
		"testwindows": "mocha --opts test\\opts\\mocha.opts && npm run posttest"
},
	"version": "1.13.1"
}