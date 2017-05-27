var pug = require('pug');
var tcRender = require('ng-templatecache');
var fs = require('fs');
var glob = require('glob');
var path = require('path');

var templates = glob.sync('**/*.pug', {
    cwd: 'client'
});

const tcEntries = templates.map(tplPath => ({
  content: pug.compileFile(`client/${tplPath}`)(), 
  path: tplPath.replace(/pug$/, 'html')
}));

const tc = tcRender({
    entries: tcEntries,
    prefix: 'src/',
    standalone: true
});

const IIFEtpl = `(function() {
  ${tc}
})();`;

fs.writeFileSync(path.join('client', 'templates.module.js'), IIFEtpl, 'utf-8');