import React from 'react'

// Components
import Typography from '@/basicComponents/Typography'

// Style

// Variables / Functions

export const propTypes = {}

function NoEventNameText(props) {
  return (
    <Typography.Text level='h5' lineHeight={1} color='gray-dark'>
      此活動已不存在
    </Typography.Text>
  )
}

NoEventNameText.propTypes = propTypes

export default NoEventNameText
