import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'legend-description',
    plugin: 'legend-description',
    type: 'string',
  });
};

export default register;
