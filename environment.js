/**
 * @file 环境判断
 * @module environment
 * @author luke
 */

const environment = process.env
const isDevMode = Object.is(environment.NODE_ENV, 'development')
const isProdMode = Object.is(environment.NODE_ENV, 'production')


export {
  isDevMode,
  isProdMode,
  environment,
}
