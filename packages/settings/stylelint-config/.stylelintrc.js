module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    indentation: [
      2,
      {
        except: ['block'],
        message: 'Please use 2 spaces for indentation.',
        severity: 'warning',
      },
    ],
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-alphabetical-order': true,
  },
};
