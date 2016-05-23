/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import Main from './main/main.resource'
angular.module('testRest', ['ngResource', 'ui.router', 'toastr'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .config(function ($httpProvider) {
    "ngInject";
    $httpProvider.interceptors.push(function () {
      return {
        'request': function (config) {
          if (config.method == 'POST') {
            config.url += '/';
          }

          return config;
        }

      }
    });
  })
  .run(runBlock)
  .factory('Main',Main)
  .controller('MainController', MainController);