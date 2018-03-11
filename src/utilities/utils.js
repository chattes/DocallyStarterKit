const Config = () => {
  // console.log(process.env.NODE_ENV)
  if (process.env.REACT_APP_SERVER === 'local') {
    return {
      host: 'test'
    }
  } else {
    return {
      // host: `192.168.31.144`,
      // port: `3000`
      // // Test Cloud
      host: `http://li1447-217.members.linode.com`,
      port: null,
      playVersion: '1.5.0'

      // // Production
      // host: `https://api.docally.com`,
      // port: null
    }
  }
}

export default Config
