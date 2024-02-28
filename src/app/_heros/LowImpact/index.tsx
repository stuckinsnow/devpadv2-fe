import React from 'react'

import { Page } from '../../../pl-types'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

export const LowImpactHero: React.FC<Page['hero']> = ({ richText }) => {
  return (
    <div className={classes.lowImpactHero}>
      <div className={classes.content}>
        <div>
          <RichText className={classes.richText} content={richText} />
        </div>
      </div>
    </div>
  )
}
