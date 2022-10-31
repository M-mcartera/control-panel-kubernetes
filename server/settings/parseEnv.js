import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import isNaN from 'lodash/isNaN';
import isFinite from 'lodash/isFinite';
import envSettings from '../../config/env.json';

const parseString = value => (value || '').toString();

const parseBoolean = (value, defaultValue = null) => {
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
      return value.toLowerCase() === 'true';
    }
  }
  return typeof value === 'boolean' ? value : defaultValue;
};

const isNumber = value => !isNaN(parseFloat(value)) && isFinite(value);

const parseNumber = value => (isNumber(value) ? parseFloat(value) : null);

const converters = {
  string: value => parseString(value),
  boolean: value => parseBoolean(value, false),
  number: value => parseNumber(value)
};

const developerMode = converters.boolean(envSettings.DEVELOPER_MODE) || false;

export default (envKey, valueType = 'string', required = !developerMode) => {
  const envValue = envSettings[envKey];

  if (required && (isNull(envValue) || isUndefined(envValue))) {
    throw new Error(`Missing environment variable ${envKey}`);
  }

  const valueConverter = converters[valueType] || converters.string;

  const value = valueConverter(envValue);

  if (required && isNull(value)) {
    throw new Error(
      `Invalid value for environment variable ${envKey} : "${value}"`
    );
  }

  return value;
};
