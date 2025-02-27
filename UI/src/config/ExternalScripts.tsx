import React from 'react'
import Script from 'next/script'
import { GoogleTagManager } from '@next/third-parties/google'

const ExternalScripts: React.FC = () => (
  <>
    <Script
      strategy='afterInteractive'
      src='https://static.cloudflareinsights.com/beacon.min.js'
      data-cf-beacon='{"token": "11d17913667f4364a2890c9bbb6b3665"}'
      defer
    />
    <GoogleTagManager gtmId='GTM-MWWFJBPW' />
  </>
)

export default ExternalScripts
