import type { StorybookConfig } from '@storybook/react-vite'
import type { AddonOptionsWebpack } from '@storybook/addon-coverage'

const coverageConfig: AddonOptionsWebpack = {
  istanbul: {
    include: ['src/**'],
    exclude: ['**/exampleDirectoryToBeExcluded/**'],
    nycrcPath: '.nycrc',
  },
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-actions/register',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    {
      name: '@storybook/addon-coverage',
      options: coverageConfig,
    },
    '@storybook/addon-mdx-gfm',
    '@chromatic-com/storybook',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },

  staticDirs: ['../public'],

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}
export default config
