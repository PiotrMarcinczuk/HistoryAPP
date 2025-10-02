import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import Input from './components/Input';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: async () => {
        const { App } = await import('./pages/App');

        return App;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });

    app.customFields.register({
      name: 'color',
      pluginId: 'legend-description', // the custom field is created by a legend-description plugin
      type: 'string', // the color will be stored as a string
      intlLabel: {
        id: 'legend-description.color.label',
        defaultMessage: 'Color',
      },
      intlDescription: {
        id: 'legend-description.color.description',
        defaultMessage: 'Select any color',
      },
      icon: PluginIcon, // don't forget to create/import your icon component

      components: {
        Input: async () =>
          import('./components/Input').then((module) => {
            console.log('Input loaded');
            return { default: module.Input };
          }),
      },
      options: {
        base: [
          /*
          Declare settings to be added to the "Base settings" section
          of the field in the Content-Type Builder
        */
          {
            sectionTitle: {
              // Add a "Format" settings section
              id: 'legend-description.color.section.format',
              defaultMessage: 'Format',
            },
            items: [
              // Add settings items to the section
              {
                /*
                Add a "Color format" dropdown
                to choose between 2 different format options
                for the color value: hexadecimal or RGBA
              */
                intlLabel: {
                  id: 'legend-description.color.format.label',
                  defaultMessage: 'Color format',
                },
                name: 'options.format',
                type: 'select',
                value: 'hex', // option selected by default
                options: [
                  // List all available "Color format" options
                  {
                    key: 'hex',
                    defaultValue: 'hex',
                    value: 'hex',
                    metadatas: {
                      intlLabel: {
                        id: 'legend-description.color.format.hex',
                        defaultMessage: 'Hexadecimal',
                      },
                    },
                  },
                  {
                    key: 'rgba',
                    value: 'rgba',
                    metadatas: {
                      intlLabel: {
                        id: 'legend-description.color.format.rgba',
                        defaultMessage: 'RGBA',
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
        advanced: [
          /*
          Declare settings to be added to the "Advanced settings" section
          of the field in the Content-Type Builder
        */
        ],
        validator: (args) => ({
          format: yup.string().required({
            id: 'options.legend-description.format.error',
            defaultMessage: 'The color format is required',
          }),
        }),
      },
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
