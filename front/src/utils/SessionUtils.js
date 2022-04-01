
export const handleSession = (router) => {
  return router.query.error !== undefined ? 'ERROR' : null
}
