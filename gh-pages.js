var ghpages = require('gh-pages');
ghpages.publish('dist', {
    branch: 'gh-pages',
    repo: 'https://github.com/wizount/primevue-designer.git'
}, function (err) {
    console.info(err)
});