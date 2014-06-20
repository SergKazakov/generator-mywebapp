'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var MywebappGenerator = yeoman.generators.Base.extend({
    init: function() {
        this.pkg = require('../package.json');

        this.on('end', function() {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function() {
        var done = this.async();

        this.log(yosay('Welcome to the marvelous Mywebapp generator!'));

        var prompts = [
        {
            type: 'input',
            name: 'webappName',
            message: 'What do you wanna call your webapp?'
        },
        {
            type: 'confirm',
            name: 'response',
            message: 'Would you like to include <meta> tag viewport?'
        },
        {
            type: 'checkbox',
            name: 'features',
            message: 'What more would you like?',
                choices: [{
                  name: 'RespondJS',
                  value: 'includeRespondJS',
                  checked: true
                }, {
                  name: 'PlaceholderJS',
                  value: 'includePlaceholderJS',
                  checked: true
                }, {
                  name: 'BackgroundSizeJS',
                  value: 'includeBackgroundSizeJS',
                  checked: true
                }, {
                  name: 'SelectivizrJS',
                  value: 'includeSelectivizrJS',
                  checked: true
                }, {
                  name: 'Modernizr',
                  value: 'includeModernizr',
                  checked: true
                }]
        }
        ];

        this.prompt(prompts, function(props) {
            this.webappName = props.webappName;
            this.response=props.response;

            var hasFeature = function (feat) {
                  return props.features.indexOf(feat) !== -1;
            };

            this.includeRespondJS           = hasFeature('includeRespondJS');
            this.includePlaceholderJS       = hasFeature('includePlaceholderJS');
            this.includeBackgroundSizeJS    = hasFeature('includeBackgroundSizeJS');
            this.includeSelectivizrJS       = hasFeature('includeSelectivizrJS');
            this.includeModernizr           = hasFeature('includeModernizr');

            done();
        }.bind(this));
    },

    app: function() {
        this.mkdir('app');
        this.mkdir('app/css');
        this.mkdir('app/sass/vendor');
        this.mkdir('app/js');
        this.mkdir('app/fonts');
        this.mkdir('app/img');
    },

    h5bp: function() {
        this.template('index.html',         'app/index.html');
        this.copy('favicon.ico',            'app/favicon.ico');
    },

    sass: function() {
        this.copy('sass/_base.scss',        'app/sass/core/_base.scss');
        this.copy('sass/_settings.scss',    'app/sass/core/_settings.scss');
        this.copy('sass/_helpers.scss',     'app/sass/core/_helpers.scss');
        this.copy('sass/_media.scss',       'app/sass/core/_media.scss');
        this.copy('sass/_reset.scss',       'app/sass/core/_reset.scss');
        this.copy('sass/_sprite.scss',      'app/sass/core/_sprite.scss');
        this.copy('sass/main.scss',         'app/sass/main.scss');
    },

    js: function() {
        this.write('app/js/main.js',        '$(function (){\n\t\'use strict\';\n});');
    },

    packageJSON: function() {
        this.template('_package.json',      'package.json');
    },

    bower: function() {
        this.template('_bower.json',        'bower.json');
        this.copy('.bowerrc',               '.bowerrc');
    },

    git: function() {
        this.copy('gitignore',              '.gitignore');
    },

    gulpfile: function() {
        this.template('gulpfile.js',        'gulpfile.js');
    },

    projectfiles: function() {
        this.copy('editorconfig',           '.editorconfig');
        this.copy('jshintrc',               '.jshintrc');
    }
});

module.exports = MywebappGenerator;