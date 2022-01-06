'use strict';

const IPV4_REGEX = /^(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;

module.exports = class Util extends null {
  /**
   * Whether the specified string is a valid IP
   * @param {string} ip IP to check
   * @returns {boolean} Whether IP is valid or not
   */
  static isValidIP(ip) {
    if (!ip) throw new TypeError('IP should be given');
    const matched = ip.match(IPV4_REGEX);
    return !!(matched && matched[1]);
  }
};
