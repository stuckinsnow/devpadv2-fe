import React from 'react'

import classes from './index.module.scss'
import { serializeLexical } from './serialize'

const RichText: React.FC<{ className?: string; content: any }> = ({ className, content }) => {
  if (!content) {
    return null
  }

  return (
    <div className={[classes.richText, className].filter(Boolean).join(' ')}>
      {
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  )

  // return (
  //   <div className={[classes.richText, className].filter(Boolean).join(' ')}>
  //     {content &&
  //       !Array.isArray(content) &&
  //       typeof content === 'object' &&
  //       'root' in content &&
  //       serializeLexical({ nodes: content?.root?.children })}
  //   </div>
  // )

}

export default RichText