import React from 'react'

import { storiesOf } from '@storybook/react'
import BaseDemo from './base'
import CustomizeClassname from './customize-classname'

storiesOf('示例', module)
  .add('基础示例', () => <BaseDemo />)
  .add('自定义类名', () => <CustomizeClassname />)
