import React from 'react'
import MediaQuery from 'react-responsive'

const Query = {
  desktop: '(min-width: 1025px)',
  tablet: '(min-width: 768px) and (max-width: 1024px)',
  phone: '(max-width:767px)',
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)'
}

export const Desktop = ({ children }) => (
  <MediaQuery minWidth={1025} children={children} />
)
export const Tablet = ({ children }) => (
  <MediaQuery minWidth={768} maxWidth={1024} children={children} />
)
export const Phone = ({ children }) => (
  <MediaQuery maxWidth={767} children={children} />
)

export default Query
