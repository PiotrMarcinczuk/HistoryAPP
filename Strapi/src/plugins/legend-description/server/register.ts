export default ({ strapi }: { strapi: any }) => {
  strapi.customFields.register({
    name: 'legend-description',
    plugin: 'legend-description',
    type: 'string',
    inputSize: {
      // optional
      default: 4,
      isResizable: true,
    },
  });
};
