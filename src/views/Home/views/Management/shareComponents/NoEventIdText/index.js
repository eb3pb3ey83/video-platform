import React from 'react'

// Components
import Typography from '@/basicComponents/Typography'

// Style

// Variables / Functions

export const propTypes = {}

function NoEventIdText(props) {
  return (
    <Typography.Text level='h5' lineHeight={1} color='gray-dark'>
      ---
    </Typography.Text>
  )
}

NoEventIdText.propTypes = propTypes

export default NoEventIdText
